import { audioContext, out } from "./audioContext";
import { Clip } from "./Clip";

type Props = { clip: Clip };

export const Tile = (props: Props) => {
  let node: AudioBufferSourceNode | undefined;

  const play = () => {
    if (node) return;
    node = audioContext.createBufferSource();
    node.buffer = props.clip.buffer;
    node.connect(out);
    node.start();
  };

  const stop = () => {
    try { node?.stop(); } catch {}
    node = undefined;
  };

  return (
    <figure onMouseDown={play} onMouseUp={stop} onMouseLeave={stop} onTouchStart={play} onTouchEnd={stop} onTouchCancel={stop}>
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
