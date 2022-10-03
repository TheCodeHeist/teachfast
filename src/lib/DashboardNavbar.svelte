<script lang="ts">
	import { currentUser } from '$lib/stores/auth';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import FaIcon from './FaIcon.svelte';

	export let current: string;

	const logout = async () => {
		try {
			const res = await fetch('/api/logout', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
				if (browser) {
					goto('/login');
				}
			}
		} catch (err) {
			console.error(err);
		}
	};
</script>

<nav
	class="h-full w-2/12 bg-neutral-800 flex flex-col items-center justify-center border-r border-neutral-700"
>
	<div class="w-full h-1/6 flex flex-col items-center justify-center">
		<p class="text-3xl text-teal-500 font-bold mb-2">TeachFast</p>

		<p class="text-lg text-white">
			<span class="font-semibold">Logged in as: </span>{!$currentUser
				? 'Non-entity'
				: $currentUser.username === 'admin'
				? 'Admin'
				: $currentUser.username}
		</p>
	</div>

	<div class="w-full h-4/6 border-y border-neutral-700">
		<button
			type="button"
			class={current === 'overview'
				? 'w-full h-20 font-medium text-teal-500 text-lg transition-all'
				: 'w-full h-20 font-medium text-white text-lg transition-all hover:bg-neutral-600'}
			on:click={() => goto('/dashboard/overview')}
		>
			<FaIcon icon="satellite-dish" />&nbsp;&nbsp;&nbsp;&nbsp;Overview
		</button>

		<button
			type="button"
			class={current === 'plan'
				? 'w-full h-20 font-medium text-teal-500 text-lg transition-all'
				: 'w-full h-20 font-medium text-white text-lg transition-all hover:bg-neutral-600'}
			on:click={() => goto('/dashboard/plan')}
		>
			<FaIcon icon="person-chalkboard" />&nbsp;&nbsp;&nbsp;&nbsp;Lesson Plan
		</button>

		<button
			type="button"
			class="w-full h-20 font-medium text-white text-lg transition-all hover:bg-neutral-600"
		>
			<FaIcon icon="users" />&nbsp;&nbsp;&nbsp;&nbsp;Students
		</button>

		<button
			type="button"
			class="w-full h-20 font-medium text-white text-lg transition-all hover:bg-neutral-600"
		>
			<FaIcon icon="circle-user" />&nbsp;&nbsp;&nbsp;&nbsp;Roles
		</button>

		<button
			type="button"
			class="w-full h-20 font-medium text-white text-lg transition-all hover:bg-neutral-600"
		>
			<FaIcon icon="credit-card" />&nbsp;&nbsp;&nbsp;&nbsp;Payment
		</button>
	</div>

	<div class="w-full h-1/6 flex items-center justify-center">
		<button
			type="button"
			class="w-1/2 py-2 border-2 border-rose-600 rounded-lg font-semibold text-lg text-rose-600 transition-all hover:bg-rose-600 hover:text-neutral-700"
			on:click={() => logout()}
		>
			<FaIcon icon="power-off" />&nbsp;&nbsp;Logout
		</button>

		<button
			type="button"
			class={current === 'settings'
				? 'w-10 h-10 text-teal-500 flex items-center justify-center ml-4 transition-all'
				: 'w-10 h-10 text-white flex items-center justify-center ml-4 transition-all hover:text-teal-500'}
			on:click={() => goto('/dashboard/settings')}
		>
			<FaIcon icon="gear" className="text-lg transition-transform" />&nbsp;
			<FaIcon icon="caret-right" />
		</button>
	</div>
</nav>
