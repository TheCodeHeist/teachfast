<script lang="ts">
	import { page } from '$app/stores';
	import FaIcon from '$lib/FaIcon.svelte';
	import { fade, fly } from 'svelte/transition';

	let showInfo = false;
	let info = '';

	if (!$page.data.exists) {
		info =
			"You didn't set a password yet. You should go to Settings and set one as soon as possible, if you care about your privacy.";
		showInfo = true;
	}
</script>

<section
	class="h-screen w-10/12 flex flex-col px-12 pt-12 overflow-y-auto overflow-x-hidden"
	in:fade={{
		duration: 120
	}}
>
	<p class="text-white font-bold text-4xl mb-12">Overview</p>

	{#if showInfo}
		<div
			class="flex items-start bg-cyan-600 px-6 py-4 w-full rounded-lg select-none mb-12"
			in:fly={{
				x: 100,
				duration: 300,
				delay: 200
			}}
		>
			<FaIcon icon="info-circle" className="text-white mr-4 text-2xl" />
			<p class="text-white text-lg font-medium flex-1">{info}</p>
		</div>
	{/if}
</section>
