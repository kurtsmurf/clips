import { createEffect, createSignal, For } from "solid-js";
import { AudioInput } from "./AudioInput";
import { Tile } from "./Tile";

export const App = () => (
  <>
    <AudioInput onChange={setBuffers} />
    <For each={buffers()}>{Tile}</For>
  </>
);

const [buffers, setBuffers] = createSignal([]);

createEffect(() => console.log(buffers()));
