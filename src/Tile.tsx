import { audioContext, out } from "./audioContext";
import { Clip } from "./clip";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { pathOfFloat32Array } from "./path";
import { FFT_SIZE } from "./FFT_SIZE";

// use pointer events?
// doing feature detection because ran into trouble trying pointer
// double clicking caused zoom on ios in a distracting way
// using touch events didn't have that problem
const TOUCH_ENABLED = "ontouchstart" in window;

type Props = { clip: Clip, onDelete: () => void };
 
export const Tile = (props: Props) => {
  const analyser = audioContext.createAnalyser();
  const samples = new Float32Array(FFT_SIZE);

  let animationFrame: number;

  // settings
  const [gain, setGain] = createSignal(1);
  const [speed, setSpeed] = createSignal(1);
  const [loop, setLoop] = createSignal(false);
  const [hold, setHold] = createSignal(false);

  // audio player
  const [player, setPlayer] = createSignal<Player | undefined>(
    undefined,
  );

  // synchronize audio player properties with settings
  createEffect(() => {
    player()?.playbackRate.setValueAtTime(speed(), audioContext.currentTime);
  });
  createEffect(() => {
    // when synchronizing gain, use linear ramp instead
    // of setting value instantly to prevent unpleasant
    // popping noises
    const p = player();
    p?.gain.cancelScheduledValues(audioContext.currentTime);
    p?.gain.setValueAtTime(p.gain.value, audioContext.currentTime);
    p?.gain.linearRampToValueAtTime(gain(), audioContext.currentTime + 0.1);
  });

  // the squiggly line path definition
  const [d, setD] = createSignal("");

  const tick = () => {
    analyser.getFloatTimeDomainData(samples);
    setD(pathOfFloat32Array(samples));
    animationFrame = requestAnimationFrame(tick);
  };

  const play = () => {
    if (player()) return stop();

    const newPlayer = new Player(props.clip.buffer);
    newPlayer.playbackRate.value = speed();
    newPlayer.gain.value = gain();
    newPlayer.loop = loop();
    newPlayer.onended = () => player() === newPlayer && stop();
    newPlayer.connect(analyser);
    newPlayer.connect(out);
    newPlayer.start();

    setPlayer(newPlayer);
    animationFrame = requestAnimationFrame(tick);
  };

  const stop = () => {
    player()?.stop();
    setPlayer(undefined);
    cancelAnimationFrame(animationFrame);
    setD("");
  };

  onCleanup(stop)

  return (
    <article>
      {/*
        bad news alert pt. 2
        see below we use TOUCH_ENABLED to dictate which event
        handlers to attach.
        what happens on a hybrid device like a tablet with a mouse?
        in that case ["ontouchstart" in window] would prob be true
        which would disable the mouse
        not great
      */}
      <button class="delete" onClick={props.onDelete}>
      <svg viewBox="0 0 2 2" width="20" style="transform: rotate(45deg);">
        <path
          d="M 1 0 v 2 M 0 1 h 2"
          stroke="black"
          fill="none"
          stroke-width="0.25"
        />
      </svg>
      </button>
      <figure
        class={player() ? "active" : undefined}
        onTouchStart={play}
        onTouchEnd={() => !hold() && stop()}
        onMouseEnter={!TOUCH_ENABLED ? (e) => e.buttons && play() : undefined}
        onMouseDown={!TOUCH_ENABLED ? play : undefined}
        onMouseUp={!TOUCH_ENABLED ? () => !hold() && stop() : undefined}
        onMouseLeave={!TOUCH_ENABLED ? () => !hold() && stop() : undefined}
        onKeyDown={(e) => {
          if (e.key !== " ") return
          if (hold()) {
            if (player()) {
              stop();
            } else {
              play();
            }
          } else {
            if (!player()) {
              play()
            }
          }
          e.preventDefault();
        }}
        onKeyUp={(e) => {
          e.key === " " && !hold() && stop();
          e.key === " " && e.preventDefault();
        }}
        tabIndex="0"
      >
        <svg viewBox="0 -1 2 2">
          {/* waveform */}
          <path d={d()} stroke="black" stroke-width=".025" fill="none" />
        </svg>
        <figcaption>
          <p>{props.clip.name}</p>
          <p>{props.clip.buffer.duration.toFixed(2)}s</p>
          <p>{props.clip.buffer.numberOfChannels} channel</p>
        </figcaption>
      </figure>
      <div class="controls">
        <div class="range-input">
          <label>
            <span>Speed</span>
          </label>
            <input
              type="range"
              name="speed"
              min="0.5"
              max="2"
              step="0.001"
              value="1"
              onInput={(e) => setSpeed(parseFloat(e.currentTarget.value))}
            />
        </div>
        <div class="range-input">
          <label>
            <span>Volume</span>
          </label>
            <input
              type="range"
              name="gain"
              min="0"
              max="1"
              step="0.01"
              value="1"
              onInput={(e) => {
                setGain(parseFloat(e.currentTarget.value));
              }}
            />
        </div>
        <div class="checkboxes">
          <label>
            <input
              type="checkbox"
              name="loop"
              onInput={(e) => setLoop(e.currentTarget.checked)}
            />
            <span>Loop</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="hold"
              checked={hold()}
              onInput={(e) => setHold(e.currentTarget.checked)}
            />
            <span>Hold</span>
          </label>
        </div>
      </div>
    </article>
  );
};

class Player {
  private gainNode = audioContext.createGain();
  private bufferSourceNode = audioContext.createBufferSource();
  private release = 0.1;

  constructor(buffer: AudioBuffer) {
    this.bufferSourceNode.buffer = buffer;
    this.bufferSourceNode.connect(this.gainNode);
  }

  connect(destinationNode: AudioNode) {
    this.gainNode.connect(destinationNode);
  }

  start() {
    this.bufferSourceNode.start();
  }

  stop() {
    const end = audioContext.currentTime + this.release;
    // set starting value for linear ramp
    this.gainNode.gain.value = this.gainNode.gain.value;
    this.gainNode.gain.linearRampToValueAtTime(0, end);
    this.bufferSourceNode.stop(end);
  }

  get playbackRate() {
    return this.bufferSourceNode.playbackRate;
  }

  get loop() {
    return this.bufferSourceNode.loop;
  }

  set loop(val) {
    this.bufferSourceNode.loop = val;
  }

  get onended() {
    return this.bufferSourceNode.onended;
  }

  set onended(fn) {
    this.bufferSourceNode.onended = fn;
  }

  get gain() {
    return this.gainNode.gain;
  }
}
 