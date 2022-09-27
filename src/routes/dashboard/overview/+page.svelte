<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<section
	class="h-screen w-10/12 flex flex-col px-12 pt-8"
	in:fade={{
		duration: 120
	}}
>
	<p class="text-white font-bold text-4xl">Overview</p>
</section>
