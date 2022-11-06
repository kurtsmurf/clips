import {
  createEffect,
  createSignal,
  For,
} from "https://cdn.skypack.dev/solid-js";
import h from "https://cdn.skypack.dev/solid-js/h";
import { AudioInput } from "./audioInput";

export const App = () => [
  h(AudioInput, { onChange: setBuffers }),
  () => h(For, { each: buffers() }, Buffer),
];

const Buffer = (buffer) => h("p", {}, buffer.length);

const [buffers, setBuffers] = createSignal([]);

createEffect(() => console.log(buffers()));
