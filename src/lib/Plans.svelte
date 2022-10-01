<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type PlanInterface from './interfaces/Plan';
	import { formatRelative } from 'date-fns';
	import FaIcon from './FaIcon.svelte';

	export let plans: PlanInterface[];
	export let completePlan: (id: string) => void;
	export let incompletePlan: (id: string) => void;
	export let renamePlan: (id: string, content: string) => void;
	export let deletePlan: (id: string) => void;
</script>

{#each plans as plan (plan.id)}
	<div
		class={plan.is_done
			? 'flex items-center justify-between w-full px-8 py-6 bg-teal-700 mb-8 rounded-lg shadow-lg transition-all grayscale'
			: 'flex items-center justify-between w-full px-8 py-6 bg-teal-700 mb-8 rounded-lg shadow-lg transition-all'}
		id={plan.id}
		transition:scale|local={{
			duration: 1000
		}}
		animate:flip
	>
		<div class="h-full flex flex-col justify-center">
			<p class="text-white font-medium text-2xl h-full flex items-center">{plan.content}</p>

			<p class="text-white font-medium text-sm h-full flex items-center mt-2">
				{formatRelative(new Date(plan.timestamp), new Date())
					.substring(0, 1)
					.toUpperCase()}{formatRelative(new Date(plan.timestamp), new Date()).substring(
					1
				)}&nbsp;&nbsp;•&nbsp;&nbsp;{plan.is_done ? 'Completed' : 'Not Completed'}
			</p>
		</div>

		<div class="h-full flex items-center">
			{#if plan.is_done}
				<button
					type="button"
					class="text-white h-8 w-8 rounded-md mr-2 text-xl transition-all hover:bg-teal-800"
					on:click={() => {
						incompletePlan(plan.id);
					}}
				>
					<FaIcon icon="times" />
				</button>
			{:else}
				<button
					type="button"
					class="text-white h-8 w-8 rounded-md mr-2 transition-all hover:bg-teal-800"
					on:click={() => {
						completePlan(plan.id);
					}}
				>
					<FaIcon icon="check" />
				</button>
			{/if}

			<button
				type="button"
				class="text-white h-8 w-8 rounded-md mr-2 transition-all hover:bg-teal-800"
				on:click={() => {
					const newContent = prompt('Enter new content', plan.content);

					if (newContent) {
						renamePlan(plan.id, newContent);
					}
				}}
			>
				<FaIcon icon="pencil" />
			</button>

			<button
				type="button"
				class="text-white h-8 w-8 rounded-md transition-all hover:bg-teal-800"
				on:click={() => {
					deletePlan(plan.id);
				}}
			>
				<FaIcon icon="trash" />
			</button>
		</div>
	</div>
{/each}
