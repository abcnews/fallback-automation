<script>
	import Worm from './Worm/Worm.svelte';
</script>

<div class="loading">
	<slot />
	<div class="worm">
		<Worm />
	</div>
</div>

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.worm {
		display: grid;
		animation: rotate 2s infinite linear;
		width: var(--space-2xl);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(90deg) scale(1.2);
		}
		100% {
			transform: rotate(180deg) scale(1);
		}
	}
</style>
