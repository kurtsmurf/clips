import { render } from "solid-js/web";
import { App } from "./App";
import { audioContext } from "./audioContext";
import { hashOfArrayBuffer } from "./AudioInput";
import { addClips } from "./signals";

render(App, document.getElementById("root")!);

// load sample audio stored in s3
[
  "https://clips-audio.s3.amazonaws.com/büm.mp3",
  "https://clips-audio.s3.amazonaws.com/baf.mp3",
  "https://clips-audio.s3.amazonaws.com/suns.mp3",
  "https://clips-audio.s3.amazonaws.com/pew.mp3",
].forEach((url) =>
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then(async (arrayBuffer) => {
      return {
        name: url.substring(url.lastIndexOf("/") + 1),
        // order matters here:
        // must generate hash THEN decode audio data
        // decoding audio data mutates the arrayBuffer
        // see "transferable objects" in javascript
        hash: await hashOfArrayBuffer(arrayBuffer),
        buffer: await audioContext.decodeAudioData(arrayBuffer),
      };
    })
    .then((clip) => addClips([clip]))
);
