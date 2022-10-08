<script lang="ts">
	import { currentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FaIcon from '$lib/FaIcon.svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let changePasswordForm = false;
	let oldPassword = '';
	let newPassword = '';

	const createAdminAccount = async () => {
		const password = prompt('Enter a password for your admin account...');

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
				alert('Admin account created!');

				goto('/login');
			} else {
				alert('Error creating admin account!');
			}
		} else {
			alert('You need to enter a password! Try again.');
		}
	};

	const changePassword = async () => {
		if (oldPassword && newPassword) {
			const res = await fetch('/api/users/changePassword', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: $currentUser.username,
					oldPassword,
					newPassword
				})
			});

			if (res.ok) {
				alert('Password changed!');
			} else {
				alert('Error changing password!');
			}
		} else {
			alert('You need to enter both passwords! Try again.');
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
					class="text-teal-500 font-bold text-lg transition-all hover:text-teal-600"
					on:click={() => {
						createAdminAccount();
					}}>Create Admin Account</button
				>
			</div>
		{:else}
			<p class="text-white font-medium">
				Username: <span class="font-normal">{$currentUser.username}</span>
			</p>

			<p class="text-white font-medium">
				Password: <span class="font-normal">@#$%^&*()</span>&nbsp;
				<span
					class="text-teal-500 font-bold cursor-pointer transition-all hover:text-teal-600"
					on:click={() => {
						changePasswordForm = !changePasswordForm;
					}}
				>
					<FaIcon icon="edit" />
				</span>
			</p>

			{#if changePasswordForm}
				<div
					class="flex flex-col mt-4"
					transition:slide|local={{
						duration: 300
					}}
				>
					<div class="flex items-center gap-4">
						<input
							type="password"
							class="bg-neutral-700 text-white rounded-md px-4 py-2 w-1/2 transition-all outline-none border border-neutral-800 focus:border-teal-400"
							placeholder="Old Password"
							bind:value={oldPassword}
						/>
						<input
							type="password"
							class="bg-neutral-700 text-white rounded-md px-4 py-2 w-1/2 transition-all outline-none border border-neutral-800 focus:border-teal-400"
							placeholder="New Password"
							bind:value={newPassword}
						/>
					</div>

					<button
						type="button"
						class="bg-teal-500 text-white rounded-md px-4 py-2 mt-4 transition-all hover:bg-teal-600"
						on:click={() => {
							changePassword();
						}}
					>
						<FaIcon icon="save" className="mr-2" />
						Change Password
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section>
