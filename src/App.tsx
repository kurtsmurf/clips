import { For, Match, Show, Switch } from "solid-js";
import { AudioInput } from "./AudioInput";
import { addClips, clips, deleteClip, mode, setMode } from "./signals";
import { Tile } from "./Tile";

export const App = () => (
  <>
    <Header />
    <Tiles />
  </>
);

const Header = () => (
  <header>
    <Switch>
      <Match when={mode() === "REGULAR"}>
        <AudioInput onChange={addClips} />
        <Show when={clips().length > 0}>
          <button onClick={() => setMode("DELETING")}>
            delete clips
          </button>
        </Show>
      </Match>
      <Match when={mode() === "DELETING"}>
        <button onClick={() => setMode("REGULAR")}>
          done
        </button>
      </Match>
    </Switch>
  </header>
);

const Tiles = () => (
  <div class="tiles">
    <For each={clips()}>
      {(clip) => <Tile clip={clip} onDelete={() => deleteClip(clip.hash)} />}
    </For>
  </div>
);
