<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { currentUser } from '$lib/stores/auth';

	$: currentUser.set($page.data.currentUser);
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/923fc2e44a.js"></script>
</svelte:head>

<main class="bg-neutral-800 h-screen w-full">
	<slot />
</main>
