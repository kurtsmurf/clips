import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";
import { createSignal } from "solid-js";


type Props = { clip: Clip };

const defaultPath = "m 0 1 h 2";

export const Tile = (props: Props) => {
  const [node, setNode] = createSignal<AudioBufferSourceNode | undefined>(
    undefined,
  );
  const [d, setD] = createSignal(defaultPath)

  let animationFrame: number;

  let x = 0;

  const stopAnimation = () => {
    cancelAnimationFrame(animationFrame)
    setD(defaultPath)
    x = 0;
  }

  const startAnimation = () => {
    const tick = () => {
      console.log("tick")
      x += .01;

      setD(`m ${x} 1 h 2`)

      animationFrame = requestAnimationFrame(tick)
    }
    tick()
  }

  const play = () => {
    if (node()) return;

    const newNode = audioContext.createBufferSource();
    newNode.buffer = props.clip.buffer;
    newNode.connect(out);
    newNode.start();
    setNode(newNode);

    startAnimation()
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
      <svg viewBox="0 0 2 2">
        <path d={d()} stroke="black" stroke-width=".1" />
      </svg>
      <figcaption>
        <p>{props.clip.name}</p>
        <p>{props.clip.buffer.duration.toFixed(2)}s</p>
      </figcaption>
    </figure>
  );
};
