<script lang="ts">
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
</script>

<main class="h-screen w-full bg-teal-600 flex flex-col items-center justify-center">
	<div
		class="flex flex-col items-center justify-center w-6/12 text-center mb-12"
		in:fade={{
			duration: 500
		}}
	>
		<p class="text-4xl text-white font-bold mb-2">TeachFast</p>
		<p class="text-xl text-white font-semibold">
			The first community-driven, open-source student management system for tution/coaching
			services.
		</p>
	</div>

	<div class="flex items-center justify-center w-1/2">
		<button
			type="button"
			class="px-4 py-2 border-4 border-white rounded-lg font-semibold text-lg text-white transition-all hover:bg-white hover:text-teal-600"
			on:click={() => goto('/login')}>Go To Dashboard</button
		>
	</div>
</main>
