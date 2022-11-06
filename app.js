import { createSignal, createEffect } from "https://cdn.skypack.dev/solid-js";
import h from "https://cdn.skypack.dev/solid-js/h";
import { AudioInput } from "./audioInput";

export const App = () =>
  h(
    "div",
    {},
    h(AudioInput, { onChange: setBuffers }),
    () => buffers().map((buffer) => h("div", {}, buffer.length)),
  );

const [buffers, setBuffers] = createSignal([]);

createEffect(() => console.log(buffers()))
