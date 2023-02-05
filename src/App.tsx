import { createSignal, For } from "solid-js";
import { audioContext } from "./audioContext";
import { AudioInput, hashOfArrayBuffer } from "./AudioInput";
import { Clip } from "./clip";
import { Tile } from "./Tile";

export const App = () => (
  <>
    <AudioInput onChange={addClips} />
    <Tiles />
  </>
);

const Tiles = () => (
  <div class="tiles">
    <For each={clips()}>
      {(clip) => <Tile clip={clip} onDelete={() => deleteClip(clip.hash)} />}
    </For>
  </div>
);

const [clips, setClips] = createSignal<Clip[]>([]);

const deleteClip = (hash: string) => {
  setClips((prev) => prev.filter((clip) => clip.hash !== hash));
};

const addClips = (newClips: Clip[]) => setClips(deduplicate(newClips));

const isNew = (clip: Clip) =>
  !clips().find((oldClip) => oldClip.hash === clip.hash);

const deduplicate = (newClips: Clip[]) => {
  return [...clips(), ...newClips.filter(isNew)];
};

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
