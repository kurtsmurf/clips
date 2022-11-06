import { createSignal, createEffect } from "https://cdn.skypack.dev/solid-js";
import h from "https://cdn.skypack.dev/solid-js/h";
import { AudioInput } from "./audioInput";

const [buffers, setBuffers] = createSignal([]);

createEffect(() => {
  console.log("buffers", buffers());
});

export const App = () =>
  h("div", {}, h(AudioInput, { onChange: setBuffers }), () =>
    buffers().map((buffer) => h("div", {}, buffer.length))
  );
