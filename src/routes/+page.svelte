<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	/** @type {string} */
	let url = '';

	/** @type {string} */
	let name = '';
	/** @type {string} */
	let selector = '';
	/** @type {number} */
	let width = 500;

	/** @type {number|null} */
	let preview = null;

	/** @type {HTMLDialogElement}*/
	let previewModal;

	/**
	 * Get a URL for a screenshot image
	 * @param {string} url The page URL
	 * @param {string} selector The CSS selector
	 * @param {number} width Viewport width
	 */
	const getImageUrl = (url, selector, width) => {
		return `/api?url=${url}&selector=${selector}&width=${width}`;
	};

	/**
	 * Fetch an image from the server
	 * @param {string} url
	 * @param {string} selector
	 * @param {number} width
	 */
	const fetchImageBlob = (url, selector, width) => {
		return fetch(getImageUrl(url, selector, width)).then((res) => {
			if (!res.ok) throw new Error('Could not generate screenshot');
			return res.blob();
		});
	};

	const addItem = () => {
		items = [
			...items,
			{
				url,
				name,
				selector,
				width,
				file: fetchImageBlob(url, selector, width)
			}
		];
		preview = items.length - 1;
		name = '';
		selector = '';

		localStorage.setItem('items', JSON.stringify(items));
		localStorage.setItem('preview', String(preview));
		localStorage.setItem('name', String(name));
		localStorage.setItem('selector', String(selector));
		localStorage.setItem('width', String(width));
	};

	$: if (browser && url.length) localStorage.setItem('url', url);

	/** @type {{url: string;name: string;selector: string; width: number, file: Promise<Blob>}[]}*/
	let items = [];

	onMount(() => {
		url = localStorage.getItem('url') || url;
		name = localStorage.getItem('name') || name;
		selector = localStorage.getItem('selector') || selector;
		if (localStorage.getItem('width')) width = +(localStorage.getItem('width') || width);
		const maybePreview = localStorage.getItem('preview');
		if (maybePreview) preview = parseInt(maybePreview, 10) || null;
		try {
			const maybeItems = localStorage.getItem('items');
			if (maybeItems) {
				items = JSON.parse(maybeItems);
				items.forEach((d) => (d.file = fetchImageBlob(d.url, d.selector, d.width)));
			}
		} catch (e) {
			localStorage.removeItem('items');
		}
	});
</script>

<div class="u-grid">
	<form
		on:submit={(e) => {
			addItem();
		}}
		class="u-grid"
	>
		<label for="source"
			>Source page <input required bind:value={url} id="source" type="url" /></label
		>

		<label for="item-name">Filename <input required bind:value={name} id={`item-name`} /></label>

		<label for="item-selector"
			>CSS selector <input required bind:value={selector} id={`item-selector`} /></label
		>

		<label for="item-width"
			>Viewport width <input
				required
				bind:value={width}
				id={`item-width`}
				type="number"
				min="300"
				step="10"
				max="1900"
			/></label
		>
		<div>
			<button type="submit">Add</button>
		</div>
	</form>
	<table>
		<thead>
			<tr>
				<th>URL</th>
				<th>File name</th>
				<th>Selector</th>
				<th>Width</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each items as { url, name, selector, width }, i}
				<tr>
					<th>{url}</th>
					<td>{name}</td>
					<td>{selector}</td>
					<td>{width}</td>
					<td class="actions">
						<button on:click={() => (items = items.filter((d, idx) => i !== idx))}>Remove</button>
						<button
							on:click={() => {
								preview = i;
								previewModal.showModal();
							}}>Preview</button
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dialog bind:this={previewModal}>
	{#if preview !== null}
		<header>
			<div>
				<h2>Preview: {items[preview].name}</h2>
				<pre>{items[preview].selector}</pre>
			</div>
			<button on:click={() => previewModal.close()}>Close</button>
		</header>
		{#await items[preview].file}
			<p>Loading ...</p>
		{:then blob}
			<img
				src={URL.createObjectURL(blob)}
				alt="Screenshot of
  element {items[preview].selector} on {url}"
			/>
		{:catch}
			<p>Error creating screenshot</p>
		{/await}
	{/if}
</dialog>

<style>
	form {
		grid-template-columns: 1fr 1fr;
		max-width: 800px;
		margin: 0 auto;
	}

	input {
		font-size: var(--step-2);
		border-radius: 5px;
		border: 1px solid #ccc;
		display: block;
		margin-top: var(--space-2xs);
	}

	table {
		border-collapse: collapse;
	}

	th {
		text-align: left;
		font-size: var(--step--1);
		padding: var(--space-s) 0;
	}

	td {
		padding: var(--space-s) 0;
	}

	thead {
		border: 1px solid #ccc;
		border-left: 0;
		border-right: 0;
	}

	button {
		border: none;
		border-radius: 999em;
		background: #555;
		color: white;
		font-weight: bold;
		font-size: var(--step-0);
		padding: var(--space-2xs) var(--space-s);
	}

	td.actions button {
		font-size: var(--step--1);
	}

	.actions {
		white-space: nowrap;
	}

	dialog {
		width: 100dvw;
		height: 100dvh;
		max-height: 90dvh;
		max-width: 90dvw;
		position: relative;
		padding: 0;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #efefef;
	}

	dialog header {
		position: sticky;
		top: 0;
		background-color: #ccc;
		padding: var(--space-s);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	dialog header h2 {
		font-size: var(--step-0);
		margin: 0;
	}

	dialog header pre {
		font-size: var(--step--2);
		margin-bottom: 0;
	}

	dialog img {
		display: block;
		margin: var(--space-s) auto;
	}
</style>
