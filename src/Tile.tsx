type Props = { buffer: AudioBuffer }
export const Tile = (props: Props) => (
  <figure>
    <p>{props.buffer.duration.toFixed(2)}s</p>
  </figure>
);
