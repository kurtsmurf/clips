import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";
import { createSignal } from "solid-js";

type Props = { clip: Clip };

const defaultPath = "m 0 0 h 2";

const FFT_SIZE = 64;

export const Tile = (props: Props) => {
  const [node, setNode] = createSignal<AudioBufferSourceNode | undefined>(
    undefined,
  );
  const [d, setD] = createSignal(defaultPath);

  let animationFrame: number;

  const analyser = audioContext.createAnalyser();
  const samples = new Float32Array(FFT_SIZE);

  const refreshSamples = () => {
    analyser.getFloatTimeDomainData(samples);
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animationFrame);
    setD(defaultPath);
  };

  const startAnimation = () => {
    node()?.connect(analyser);
    const tick = () => {
      refreshSamples();
      setD(toPath(samples));
      animationFrame = requestAnimationFrame(tick);
    };
    tick();
  };

  const play = () => {
    if (node()) return;
    const newNode = audioContext.createBufferSource();
    newNode.buffer = props.clip.buffer;
    newNode.connect(out);
    newNode.start();
    setNode(newNode);
    startAnimation();
  };

  const stop = () => {
    try {
      node()?.stop();
    } catch {}
    setNode(undefined);
    stopAnimation();
  };

  return (
    <figure
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

type Point = { x: number; y: number };

const move = (path: string, { x, y }: Point) => `${path} M ${x}, ${y} `;
const lineTo = (path: string, { x, y }: Point) => `${path} L ${x}, ${y} `;
const toPath = (floats: Float32Array): string => {
  const [first, ...rest] = floats;
  return rest.reduce(
    (path, float, index) =>
      lineTo(
        path,
        {
          x: (index + 1) * (2 / (FFT_SIZE - 1)),
          y: float,
        },
      ),
    move("", { x: 0, y: first }),
  );
};
