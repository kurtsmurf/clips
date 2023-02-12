import { For, Match, Show, Switch } from "solid-js";
import { AudioInput } from "./AudioInput";
import { addClips, clips, deleteClip, deleting, setDeleting } from "./signals";
import { Tile } from "./Tile";

export const App = () => (
  <>
    <Header />
    <Tiles />
  </>
);

const Header = () => (
  <header>
    <div class="hitbox">
      <Show when={!deleting()}>
      </Show>
      <Show
        when={deleting()}
        fallback={
          <>
            <AudioInput onChange={addClips} />
            <Show when={clips().length > 0}>
              <button onClick={() => setDeleting(true)}>
                delete clips
              </button>
            </Show>
          </>
        }
      >
        <button onClick={() => setDeleting(false)}>
          done
        </button>
      </Show>
    </div>
  </header>
);

const Tiles = () => (
  <div class="tiles">
    <For each={clips()}>
      {(clip) => <Tile clip={clip} onDelete={() => deleteClip(clip.hash)} />}
    </For>
  </div>
);
