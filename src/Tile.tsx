import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";
import { createSignal } from "solid-js";

type Props = { clip: Clip };

export const Tile = (props: Props) => {
  const [node, setNode] = createSignal<AudioBufferSourceNode | undefined>(
    undefined,
  );

  const play = () => {
    if (node()) return;
    const newNode = audioContext.createBufferSource();
    newNode.buffer = props.clip.buffer;
    newNode.connect(out);
    newNode.start();
    setNode(newNode);
  };

  const stop = () => {
    try {
      node()?.stop();
    } catch {}
    setNode(undefined);
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
        <path d="m 0 1 h 2" stroke="black" stroke-width=".1" />
      </svg>
      <figcaption>
        <p>{props.clip.name}</p>
        <p>{props.clip.buffer.duration.toFixed(2)}s</p>
      </figcaption>
    </figure>
  );
};
