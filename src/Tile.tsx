import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";
import { createEffect, createSignal } from "solid-js";
import { pathOfFloat32Array } from "./path";
import { FFT_SIZE } from "./FFT_SIZE";

const TOUCH_ENABLED = "ontouchstart" in window;

type Props = { clip: Clip };

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
    player()?.gain.setValueAtTime(gain(), audioContext.currentTime);
  });

  const [d, setD] = createSignal("");
  const [rms, setRms] = createSignal(0);

  const tick = () => {
    analyser.getFloatTimeDomainData(samples);
    setD(pathOfFloat32Array(samples));
    setRms(rmsOfSamples(samples));
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
    setRms(0);
  };

  return (
    <article>
      <figure
        style={`--rms: ${rms()}`}
        class={player() ? "active" : undefined}
        onTouchStart={play}
        onTouchEnd={() => !hold() && stop()}
        onMouseEnter={!TOUCH_ENABLED ? (e) => e.buttons && play() : undefined}
        onMouseDown={!TOUCH_ENABLED ? play : undefined}
        onMouseUp={!TOUCH_ENABLED ? () => !hold() && stop() : undefined}
        onMouseLeave={!TOUCH_ENABLED ? () => !hold() && stop() : undefined}
      >
        <svg viewBox="0 -1 2 2">
          <path d={d()} stroke="black" stroke-width=".03" fill="none" />
        </svg>
        <figcaption>
          <p>{props.clip.name}</p>
          <p>{props.clip.buffer.duration.toFixed(2)}s</p>
          <p>{props.clip.buffer.numberOfChannels} channel</p>
        </figcaption>
      </figure>
      <div class="controls">
        <label>
          <span>Speed</span>
          <input
            ref={speed}
            type="range"
            name="speed"
            min="0.5"
            max="2"
            step="0.001"
            value="1"
            onInput={(e) => setSpeed(parseFloat(e.currentTarget.value))}
          />
        </label>
        <label>
          <span>Gain</span>
          <input
            ref={gain}
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
        </label>
        <label>
          <span>Loop</span>
          <input
            ref={loop}
            type="checkbox"
            name="loop"
            onInput={(e) => setLoop(e.currentTarget.checked)}
          />
        </label>
        <label>
          <span>Hold</span>
          <input
            type="checkbox"
            name="hold"
            checked={hold()}
            onInput={(e) => setHold(e.currentTarget.checked)}
          />
        </label>
      </div>
    </article>
  );
};

const rmsOfSamples = (samples: Float32Array) =>
  samples.reduce((acc, cur) => acc + Math.abs(cur), 0) / samples.length;

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
    this.gainNode.gain.value = this.gainNode.gain.value; // set starting value for linear ramp
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.currentTime + this.release,
    );
    this.bufferSourceNode.stop(audioContext.currentTime + this.release);
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

  get gain() {
    return this.gainNode.gain;
  }

  get onended() {
    return this.bufferSourceNode.onended;
  }

  set onended(fn) {
    this.bufferSourceNode.onended = fn;
  }
}
