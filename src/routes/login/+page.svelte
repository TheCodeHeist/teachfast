<script lang="ts">
	import { browser } from '$app/environment';
	import { currentUser } from '$lib/stores/auth';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import FaIcon from '$lib/FaIcon.svelte';
	import { enhance } from '$app/forms';

	if (!$page.data.exists || $currentUser) {
		if (browser) {
			goto('/dashboard/overview');
		}
	}

	let showPassword = false;

	let showError = false;
	let error = '';
</script>

<div
	class="h-screen w-full flex flex-col items-center justify-center relative"
	in:fade={{
		duration: 300
	}}
>
	<button
		type="button"
		class="fixed top-12 left-12 text-white text-lg transition-all hover:text-teal-400"
		on:click={() => {
			if (browser) {
				goto('/');
			}
		}}
	>
		<FaIcon icon="chevron-left" />
		<FaIcon icon="home" />
	</button>

	{#if showError}
		<div
			class="flex items-start bg-red-500 px-6 py-4 w-4/12 rounded-lg select-none mb-6"
			in:fly={{
				x: 100,
				duration: 300,
				delay: 200
			}}
		>
			<FaIcon icon="times" className="text-white mr-4 text-2xl" />
			<p class="text-white text-lg font-medium flex-1">{error}</p>
		</div>
	{/if}

	<div
		class="flex flex-col items-center justify-center w-4/12 h-3/6 bg-neutral-900 rounded-lg shadow-lg"
	>
		<div class="flex flex-col items-center justify-center w-6/12 text-center mb-12">
			<p class="text-4xl text-teal-500 font-bold mb-2">Login</p>
			<p class="text-xl text-white font-semibold">Login to your dashboard</p>
		</div>

		<form
			class="w-full flex flex-col items-center justify-center"
			method="POST"
			use:enhance={({ form, data, cancel }) => {
				return ({ result }) => {
					if (result.type === 'invalid') {
						error = result.data.message;
						showError = true;
					}

					if (result.type === 'redirect') {
						if (browser) {
							goto('/dashboard/overview');
						}
					}
				};
			}}
		>
			<div class="w-4/6 flex flex-col mb-12">
				<label for="password" class="mb-2 text-white font-semibold">Password:</label>
				<div class="w-full flex relative">
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						class="px-4 border-2 border-white rounded-lg bg-neutral-900 w-full h-12 text-white outline-none transition-all focus:border-teal-500 focus:shadow-[0px_0px_5px_2px_#14b8a6de]"
						name="password"
					/>

					<button
						type="button"
						class="absolute h-12 w-12 right-0 text-white ml-2 text-xl transition-all hover:text-teal-500"
						on:click={() => (showPassword = !showPassword)}
					>
						{#if showPassword}
							<FaIcon icon="eye-slash" />
						{:else}
							<FaIcon icon="eye" />
						{/if}
					</button>
				</div>
			</div>

			<div class="w-4/6 flex items-center justify-center">
				<button
					type="submit"
					class="py-2 w-1/2 border-2 border-white rounded-lg font-semibold text-lg text-white transition-all hover:bg-white hover:text-neutral-900"
					>Login</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	input::-ms-reveal {
		display: none;
	}
</style>
