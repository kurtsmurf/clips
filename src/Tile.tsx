import { Clip } from "./Clip";

type Props = { clip: Clip; }

export const Tile = (props: Props) => (
  <figure>
    <svg viewBox="0 0 2 2">
      <path d="m 0 1 h 2" stroke="black" stroke-width=".1" />
    </svg>
    <figcaption>
      <p>{props.clip.name}</p>
      <p>{props.clip.buffer.duration.toFixed(2)}s</p>
    </figcaption>
  </figure>
);
