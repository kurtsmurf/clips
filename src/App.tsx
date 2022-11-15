import { createEffect, createSignal, For } from "solid-js";
import { AudioInput } from "./AudioInput";
import { Clip } from "./Clip";
import { Tile } from "./Tile";

export const App = () => {
  return (
    <>
      <AudioInput onChange={setClips} />
      <For each={clips()}>
        {(clip) => <Tile buffer={clip.buffer} name={clip.name} />}
      </For>
    </>
  );
};

const [clips, setClips] = createSignal<Clip[]>([]);

createEffect(() => console.log(clips()));
