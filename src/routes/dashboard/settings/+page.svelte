<script lang="ts">
	import { currentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FaIcon from '$lib/FaIcon.svelte';
	import { fade, fly } from 'svelte/transition';

	const createAdminAccount = async () => {
		const password = prompt('Enter a password for your admin account');

		if (password) {
			const res = await fetch('/api/users/createAdmin', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					password
				})
			});

			if (res.ok) {
				alert('Admin account created');

				goto('/login');
			} else {
				alert('Error creating admin account');
			}
		} else {
			alert('You need to enter a password! Try again.');
		}
	};
</script>

<section
	class="h-screen w-10/12 flex flex-col px-12 pt-12 overflow-y-auto overflow-x-hidden"
	in:fade={{
		duration: 120
	}}
>
	<p class="text-white font-bold text-4xl mb-12">Settings</p>

	<!-- {#if showInfo}
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
	{/if} -->

	<div class="bg-neutral-800 w-5/12 h-80 rounded-lg p-8">
		<p class="text-white font-bold text-xl mb-4">Account Info</p>

		{#if !$page.data.exists}
			<div class="flex">
				<p class="text-white text-lg font-medium mr-2">You don't have an account yet.</p>

				<button
					type="button"
					class="text-teal-600 font-bold text-lg"
					on:click={() => {
						createAdminAccount();
					}}>Create Admin Account</button
				>
			</div>
		{:else}
			<p class="text-white font-medium">
				Username: <span class="font-normal">{$currentUser.username}</span>
			</p>
		{/if}
	</div>
</section>
