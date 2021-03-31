<script lang="ts">
  import type { Clip } from '../types';
  export let clip: Clip;
</script>

<div class="root">
  <div class="field">
    <label for="name" class="label"> Clip name </label>
    <input type="text" placeholder={clip.id} bind:value={clip.name} />
  </div>
  <div class="field">
    <label for="name" class="label"> CSS selector </label>
    <input type="text" placeholder="#clip-this" bind:value={clip.selector} />
  </div>
  <div class="field">
    <label for="name" class="label"> Browser width </label>
    <input type="number" placeholder="500" bind:value={clip.browserWidth} />
  </div>
</div>

<style lang="scss">
  .root {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .label {
    display: block;

    font-size: 0.8rem;
    margin-top: 1rem;
  }

  .field {
    min-width: 10rem;
    width: 45%;
    margin-right: 1rem;
  }

  input[type='text'],
  input[type='number'] {
    margin: 0.2rem 0 0.8rem;
    font-size: 1rem;
    padding: 0.2rem;
    border-radius: 3px;
    border: 1px solid var(--divider);
    width: 100%;
  }
</style>
