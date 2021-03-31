<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ page }) => {
    return { props: {} };
  };
</script>

<script lang="ts">
  import EditClip from '$lib/EditClip.svelte';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { downloadAll, getImageUrl, loadState, saveState } from '../utils';
  import { nanoid } from 'nanoid';
  import type { Clip } from '../types';

  let url: string | undefined;
  let clips: Clip[];
  let selectedClip: Clip | undefined;
  let initialStateLoaded = false;

  onMount(() => {
    const initialState = loadState();
    url = initialState.url;
    clips = initialState.clips || [];
    selectedClip = clips[0];
    initialStateLoaded = true;
  });

  let shouldShowPreview: boolean = false;

  const addClip = () => {
    const clip: Clip = { id: nanoid() };
    clips = [...clips, clip];
    selectedClip = clip;
  };

  const selectClip = (id: string | number) => {
    selectedClip = typeof id === 'number' ? clips[id] : clips.find((d) => d.id === id);
    shouldShowPreview = false;
  };

  const removeClip = (id: string) => {
    const index = clips.findIndex((d) => d.id === id);

    if (index > -1 && selectedClip) {
      if (index === clips.indexOf(selectedClip)) {
        selectClip(index > 0 ? index - 1 : index + 1);
      }
      clips = [...clips.slice(0, index), ...clips.slice(index + 1)];
    }
  };

  // This is a farily ugly hack to make the clips list update when the selected clip is.
  $: if (selectedClip) clips = clips;

  $: if (browser && initialStateLoaded) saveState({ url, clips });
</script>

<div class="header">
  <div class="page">
    <div class="row">
      <div class="column">
        <svg
          width="40"
          height="40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="1 1 22 22"
          ><path
            d="M5 3H3v2h2V3zm2 0h2v2H7V3zm6 0h-2v2h2V3zm2 0h2v2h-2V3zm4 0h2v2h-2V3zM3 7h2v2H3V7zm2 4H3v2h2v-2zm-2 4h2v2H3v-2zm2 4H3v2h2v-2zm2 0h2v2H7v-2zm6 0h-2v2h2v-2zm6-8h2v2h-2v-2zm2-4h-2v2h2V7zm-6 10v-2h6v2h-2v2h-2v2h-2v-4zm4 2v2h2v-2h-2z"
            fill="currentColor"
          /></svg
        >
        <p>
          Take clippings from a website by specifying CSS selectors for the areas you want to clip.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="column wide-10">
        <input
          class="urlInput"
          bind:value={url}
          placeholder="https://www.example.com/page-to-clip"
          type="text"
        />
      </div>
      <div class="column">
        <button
          on:click={(e) => {
            e.preventDefault();
            downloadAll(url, clips);
          }}
        >
          Save all
        </button>
      </div>
    </div>
  </div>
</div>

<div>
  <div class="page">
    {#if clips?.length > 0}
      <div class="row">
        <div class="column wide-2">
          <h2>Clips</h2>
          <ul class="clipList">
            {#each clips as clip, i (clip.id)}
              <li
                class="clipListItem"
                class:clipIsSelected={clip === selectedClip}
                on:click={() => selectClip(clip.id)}
              >
                {clip?.name?.length ? clip.name : `Clip ${i + 1}`}
              </li>
            {/each}
          </ul>
          <button on:click={addClip}>Add clip</button>
        </div>

        <div class="column wide-7">
          <h2>Clip settings</h2>
          {#if selectedClip}
            <EditClip bind:clip={selectedClip} />
            <button on:click={() => (shouldShowPreview = !shouldShowPreview)}>
              {shouldShowPreview ? 'Hide' : 'Show'} Clip Preview
            </button>
            <button on:click={() => selectedClip && removeClip(selectedClip.id)}> Delete </button>
          {:else}
            <p>Select a clip to edit.</p>
          {/if}
          {#if shouldShowPreview}
            <h2>Clip preview</h2>
            {#if selectedClip?.selector && url}
              <img
                src={getImageUrl(url, selectedClip.selector, {
                  width: selectedClip.browserWidth
                })}
                alt="A preview showing what would be clipped from the website with these clip settings"
                style="max-width: 100%"
              />
            {:else}
              <p>
                You must provide a selector for your clip and the URL of the page to take it from.
              </p>
            {/if}
          {/if}
        </div>
      </div>
    {:else}
      <div class="row">
        <p>To get started, create a clip.</p>
        <button on:click={addClip}>Create a clip</button>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  :global(:root) {
    --text: #2f323a;
    --background: #f7f7f2;
    --highlight: #1481ba;
    --divider: #c3c4c0;
  }

  :global(html, body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    color: var(--text);
    background-color: var(--background);
    font-size: 16px;
    line-height: 1.1;
    :global(*) {
      box-sizing: border-box;
    }
  }

  .page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
  }

  .column {
    padding: 0 1rem;
  }

  $widths: (10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%);

  @for $i from 1 through 10 {
    .wide-#{$i} {
      width: nth($widths, $i);
    }
  }

  h2 {
    font-weight: normal;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: #888;
    margin: 1.5rem 0;
  }

  .clipList {
    margin: 0 0 2rem 0;
    padding: 0;
  }

  .clipListItem {
    border-radius: 3px;
    list-style-type: none;
    margin: 0.5rem 0;
    padding: 2px;
    cursor: pointer;

    &:hover,
    &.clipIsSelected {
      color: var(--highlight, #1481ba);
    }
  }

  .header {
    border-bottom: 1px solid var(--divider);
  }

  .urlInput {
    font-size: 1.2rem;
    border: 1px solid var(--divider);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0.3rem;
    width: 100%;
  }

  button {
    border: 1px solid var(--background);
    border-radius: 0;
    font-size: 0.9rem;
    padding: 0.3em;
    background-color: var(--text);
    color: var(--background);
    position: relative;
    text-transform: uppercase;
    font-weight: bold;
    box-shadow: var(--text) 3px 3px 0px 0px;
    box-sizing: border-box;
    white-space: nowrap;
    &:active {
      left: 3px;
      top: 3px;
      box-shadow: none;
    }

    &.large {
      font-size: 1.1rem;
    }

    &.small {
      font-size: 0.7rem;
    }
  }
</style>
