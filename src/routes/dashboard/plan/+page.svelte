<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import FaIcon from '$lib/FaIcon.svelte';
	import { invalidateAll } from '$app/navigation';
	import Plans from '$lib/Plans.svelte';

	let modalOpen = false;

	let planContent = '';

	const addPlan = async () => {
		if (planContent.trim().length > 0) {
			try {
				const res = await fetch('/api/plans', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						content: planContent
					})
				});

				await invalidateAll();
			} catch (e) {
				console.log(e);
			}

			planContent = '';
			modalOpen = false;
		} else {
			alert('Please enter a plan!');
		}
	};

	const completePlan = async (id: string) => {
		try {
			const res = await fetch(`/api/plans/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					is_done: true
				})
			});

			await invalidateAll();
		} catch (e) {
			console.log(e);
		}
	};

	const incompletePlan = async (id: string) => {
		try {
			const res = await fetch(`/api/plans/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					is_done: false
				})
			});

			await invalidateAll();
		} catch (e) {
			console.log(e);
		}
	};

	const deletePlan = async (id: string) => {
		try {
			const res = await fetch(`/api/plans/${id}`, {
				method: 'DELETE'
			});

			await invalidateAll();
		} catch (e) {
			console.log(e);
		}
	};

	const renamePlan = async (id: string, content: string) => {
		try {
			const res = await fetch(`/api/plans/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					content
				})
			});

			await invalidateAll();
		} catch (e) {
			console.log(e);
		}
	};
</script>

{#if modalOpen}
	<div class="fixed h-screen w-full bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
		<div
			class="relative flex flex-col items-center justify-center w-4/12 h-3/6 bg-teal-600 rounded-lg shadow-lg"
			transition:scale={{
				duration: 300
			}}
		>
			<button
				type="button"
				class="absolute top-10 right-10 h-12 w-12 text-white transition-all text-xl hover:text-gray-300"
				on:click={() => {
					modalOpen = false;
				}}
			>
				<FaIcon icon="times" />
			</button>

			<p class="text-2xl text-white font-bold mb-12">New Entry</p>

			<div class="w-4/6 flex flex-col mb-12">
				<label for="title" class="mb-2 text-white font-semibold">Title:</label>
				<input
					type="text"
					id="title"
					placeholder="Algebra, etc."
					class="px-4 border-2 rounded-md bg-teal-500 w-full h-12 text-white outline-none transition-all placeholder:text-teal-100 focus:shadow-[0px_0px_5px_2px_#ffffffde]"
					bind:value={planContent}
				/>
			</div>

			<div class="w-4/6 flex items-center justify-center">
				<button
					type="button"
					class="py-2 w-1/2 border-2 border-white rounded-lg font-semibold text-lg text-white transition-all hover:bg-white hover:text-teal-600"
					on:click={addPlan}
				>
					Add New Entry
				</button>
			</div>
		</div>
	</div>
{/if}

<section
	class="relative h-screen w-10/12 flex flex-col px-12 pt-12 overflow-auto"
	in:fade={{
		duration: 120
	}}
>
	<button
		type="button"
		class="fixed top-10 right-12 bg-teal-500 h-12 w-12 rounded-full shadow-lg transition-all hover:bg-teal-600"
		on:click={() => {
			modalOpen = true;
		}}
	>
		<FaIcon icon="plus" className="text-white" />
	</button>

	<p class="text-white font-bold text-4xl mb-12">Lesson Plan</p>

	<div class="flex flex-col items-center w-full">
		{#if $page.data.plans.length > 0}
			<Plans plans={$page.data.plans} {completePlan} {incompletePlan} {deletePlan} {renamePlan} />
		{:else}
			<p class="text-neutral-700 font-medium text-2xl select-none">
				No plans yet! You should add one!
			</p>
		{/if}
	</div>
</section>
