<script lang="ts">
	import DashboardNavbar from '$lib/DashboardNavbar.svelte';
	import { page } from '$app/stores';
</script>

<main class="h-screen w-full bg-neutral-900 flex items-center">
	<DashboardNavbar current={$page.url.pathname.split('/')[2]} />

	<slot />
</main>
