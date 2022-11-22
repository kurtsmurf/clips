import { createSignal, For } from "solid-js";
import { AudioInput } from "./AudioInput";
import { Clip } from "./Clip";
import { Tile } from "./Tile";

export const App = () => (
  <>
    <AudioInput onChange={addClips} />
    <Tiles />
  </>
);

const Tiles = () => (
  <div class="clips">
    <For each={clips()}>
      {(clip) => <Tile clip={clip} />}
    </For>
  </div>
);

const [clips, setClips] = createSignal<Clip[]>([]);

const addClips = (newClips: Clip[]) => setClips(deduplicate(clips(), newClips));

const deduplicate = (oldClips: Clip[], newClips: Clip[]) => {
  const isNew = (clip: Clip) =>
    !oldClips.find((oldClip) =>
      oldClip.name === clip.name &&
      oldClip.buffer.length === clip.buffer.length
    );
  return [...oldClips, ...newClips.filter(isNew)];
};
