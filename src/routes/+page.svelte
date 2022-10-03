<script lang="ts">
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
</script>

<div
	class="h-full w-full flex flex-col items-center justify-center"
	in:fade={{
		duration: 300
	}}
>
	<div class="flex flex-col items-center justify-center w-6/12 text-center mb-12">
		<p class="text-4xl text-teal-500 font-bold mb-2">TeachFast</p>
		<p class="text-xl text-white font-semibold">
			The first community-driven, open-source student management system for tuition/coaching
			services.
		</p>
	</div>

	<div class="flex items-center justify-center w-1/2">
		<button
			type="button"
			class="px-4 py-2 border-4 border-white rounded-lg font-semibold text-lg text-white transition-all hover:bg-white hover:text-neutral-800"
			on:click={() => {
				if (browser) {
					goto('/login');
				}
			}}>Go To Dashboard</button
		>
	</div>
</div>
