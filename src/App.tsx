import { createSignal, For } from "solid-js";
import { audioContext } from "./audioContext";
import { AudioInput } from "./AudioInput";
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
      {(clip) => <Tile clip={clip} />}
    </For>
  </div>
);

const [clips, setClips] = createSignal<Clip[]>([]);

const addClips = (newClips: Clip[]) => setClips(deduplicate(newClips));

const isNew = (clip: Clip) =>
  !clips().find((oldClip) =>
    oldClip.name === clip.name &&
    oldClip.buffer.length === clip.buffer.length
  );

const deduplicate = (newClips: Clip[]) => {
  return [...clips(), ...newClips.filter(isNew)];
};

// load sample audio stored in s3

[
  "https://clips-audio.s3.amazonaws.com/büm.mp3",
  "https://clips-audio.s3.amazonaws.com/baf.mp3",
  "https://clips-audio.s3.amazonaws.com/suns.mp3",
  "https://clips-audio.s3.amazonaws.com/pew.mp3",
]
  .forEach((url) =>
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => ({ name: url.substring(url.lastIndexOf("/") + 1), buffer: audioBuffer }))
      .then(clip => addClips([clip]))
  );
