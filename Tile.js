import h from "https://cdn.skypack.dev/solid-js/h";

export const Tile = (buffer) => h("section",
    {},
    h("figure", {}, buffer.length)
  )
