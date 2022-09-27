<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<main class="h-screen w-full bg-teal-600 flex flex-col items-center justify-center">
	<div
		class="flex flex-col items-center justify-center w-4/12 h-3/6 bg-teal-500 rounded-lg shadow-lg"
		in:fade={{
			duration: 500
		}}
	>
		<div class="flex flex-col items-center justify-center w-6/12 text-center mb-12">
			<p class="text-4xl text-white font-bold mb-2">Login</p>
			<p class="text-xl text-white font-semibold">Login to your dashboard</p>
		</div>

		<div class="w-4/6 flex flex-col mb-12">
			<label for="password" class="mb-2 text-white font-semibold">Password:</label>
			<input
				type="password"
				id="password"
				class="px-4 border-2 rounded-lg bg-teal-500 w-full h-12 text-white outline-none transition-all focus:shadow-[0px_0px_5px_2px_#ffffffde]"
			/>
		</div>

		<div class="w-4/6 flex items-center justify-center">
			<button
				type="button"
				class="py-2 w-1/2 border-2 border-white rounded-lg font-semibold text-lg text-white transition-all hover:bg-white hover:text-teal-600"
				>Login</button
			>
		</div>
	</div>
</main>
