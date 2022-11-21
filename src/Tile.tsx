import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";
import { createSignal } from "solid-js";
import { pathOfFloat32Array } from "./path";
import { FFT_SIZE } from "./FFT_SIZE";

type Props = { clip: Clip };

export const Tile = (props: Props) => {
  let range: HTMLInputElement;
  const analyser = audioContext.createAnalyser();
  const samples = new Float32Array(FFT_SIZE);
  let animationFrame: number;

  const [node, setNode] = createSignal<AudioBufferSourceNode | undefined>(
    undefined,
  );
  const [d, setD] = createSignal("");
  const [rms, setRms] = createSignal(0);

  const createNode = () => {
    const node = audioContext.createBufferSource();
    node.buffer = props.clip.buffer;
    node.playbackRate.value = parseFloat(range.value);
    node.loop = true;
    node.connect(out);
    node.start();
    node.connect(analyser);
    return node;
  };

  const tick = () => {
    analyser.getFloatTimeDomainData(samples);
    setD(pathOfFloat32Array(samples));
    setRms(rmsOfSamples(samples));
    animationFrame = requestAnimationFrame(tick);
  };

  const play = () => {
    if (node()) return;
    setNode(createNode());
    animationFrame = requestAnimationFrame(tick);
  };

  const stop = () => {
    try {
      node()?.stop();
    } catch {}
    setNode(undefined);
    cancelAnimationFrame(animationFrame);
    setD("");
    setRms(0);
  };

  return (
    <figure
      style={`--rms: ${rms()}`}
      class={node() ? "active" : undefined}
      onMouseDown={play}
      onMouseEnter={(e) => e.buttons && play()}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={play}
      onTouchEnd={stop}
      onTouchCancel={stop}
    >
      <svg viewBox="0 -1 2 2">
        <path d={d()} stroke="black" stroke-width=".03" fill="none" />
      </svg>
      <figcaption>
        <p>{props.clip.name}</p>
        <p>{props.clip.buffer.duration.toFixed(2)}s</p>
        <p>{props.clip.buffer.numberOfChannels} channel</p>
      </figcaption>
      <input
        ref={range}
        type="range"
        name="speed"
        min="0.5"
        max="2"
        step="0.001"
        value="1"
        onInput={(e) =>
          setNode((node) => {
            if (!node) return;
            node.playbackRate.value = parseFloat(e.currentTarget.value);
            return node;
          })}
      />
    </figure>
  );
};

const rmsOfSamples = (samples: Float32Array) =>
  samples.reduce((acc, cur) => acc + Math.abs(cur), 0) / samples.length;
