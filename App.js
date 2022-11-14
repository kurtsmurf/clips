import {
  createEffect,
  createSignal,
  For,
} from "https://cdn.skypack.dev/solid-js";
import h from "https://cdn.skypack.dev/solid-js/h";
import { AudioInput } from "./AudioInput";
import { Tile } from "./Tile";

export const App = () => [
  h(AudioInput, { onChange: setBuffers }),
  () => h(For, { each: buffers() }, Tile),
];

const [buffers, setBuffers] = createSignal([]);

createEffect(() => console.log(buffers()));

