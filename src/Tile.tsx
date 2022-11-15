export const Tile = (props: { buffer: AudioBuffer }) => (
  <figure>
    <p>{props.buffer.duration.toFixed(2)}s</p>
  </figure>
);
