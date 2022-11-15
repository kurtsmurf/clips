import { createEffect, createSignal, For } from "solid-js";
import { AudioInput } from "./AudioInput";
import { Tile } from "./Tile";

export const App = () => {
  return (
    <>
      <AudioInput onChange={setBuffers} />
      <For each={buffers()}>
        {(buffer) => <Tile buffer={buffer} />}
      </For>
    </>
  );
};

const [buffers, setBuffers] = createSignal<AudioBuffer[]>([]);

createEffect(() => console.log(buffers()));
