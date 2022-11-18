import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";
import { createSignal } from "solid-js";
import { pathOfFloat32Array } from "./path";
import { FFT_SIZE } from "./FFT_SIZE";

const DEFAULT_PATH = "m 0 0 h 2";
type Props = { clip: Clip };

export const Tile = (props: Props) => {
  const analyser = audioContext.createAnalyser();
  const samples = new Float32Array(FFT_SIZE);
  let animationFrame: number;

  const [node, setNode] = createSignal<AudioBufferSourceNode | undefined>(
    undefined,
  );
  const [d, setD] = createSignal(DEFAULT_PATH);
  const [rms, setRms] = createSignal(0);

  const play = () => {
    if (node()) return;
    const newNode = audioContext.createBufferSource();
    newNode.buffer = props.clip.buffer;
    newNode.connect(out);
    newNode.start();
    newNode.connect(analyser);
    setNode(newNode);
    const tick = () => {
      analyser.getFloatTimeDomainData(samples);
      setD(pathOfFloat32Array(samples));
      setRms(
        samples.reduce((acc, cur) => acc + Math.abs(cur), 0) / samples.length,
      );
      animationFrame = requestAnimationFrame(tick);
    };
    tick();
  };

  const stop = () => {
    try {
      node()?.stop();
    } catch {}
    setNode(undefined);
    cancelAnimationFrame(animationFrame);
    setD(DEFAULT_PATH);
  };

  return (
    <figure
      style={`--rms: ${rms()}`}
      class={node() ? "active" : undefined}
      onMouseDown={play}
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
      </figcaption>
    </figure>
  );
};
