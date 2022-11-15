import { Clip } from "./Clip";

export const Tile = (props: Clip) => (
  <figure>
    <svg viewBox="0 0 2 2">
      <path d="m 0 1 h 2" stroke="black" stroke-width=".1" />
    </svg>
    <figcaption>{props.name} {props.buffer.duration.toFixed(2)}s</figcaption>
  </figure>
);
