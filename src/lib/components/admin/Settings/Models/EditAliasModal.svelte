<script>
	import { toast } from 'svelte-sonner';
	import i18n from '$lib/i18n';

	import Modal from '$lib/components/common/Modal.svelte';
	import { updateModelById } from '$lib/apis/models';

	export let show = false;
	export let model = null;
	export let onSave = () => {};

	let alias = '';
	let loading = false;

	$: if (show && model) {
		alias = model.alias || '';
	}

	const handleInput = (e) => {
		alias = e.target.value;
	};

	const submitHandler = async () => {
		loading = true;

		try {
			const updatedModel = {
				...model,
				alias: alias.trim() || null // If empty string, set to null
			};
			
			const res = await updateModelById(localStorage.token, model.id, updatedModel);
			
			if (res) {
				toast.success($i18n.t('Model alias updated successfully'));
				onSave(res);
				show = false;
			} else {
				toast.error($i18n.t('Failed to update model alias'));
			}
		} catch (error) {
			toast.error($i18n.t('Failed to update model alias'));
			console.error("Error updating model alias:", error);
		} finally {
			loading = false;
		}
	};
</script>

<Modal size="xs" bind:show>
	<div>
		<div class="flex justify-between dark:text-gray-100 px-5 pt-4 pb-2">
			<div class="text-lg font-medium self-center font-primary">
				{$i18n.t('Edit Model Alias')}
			</div>
			<button
				class="self-center"
				on:click={() => {
					show = false;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
					/>
				</svg>
			</button>
		</div>

		<div class="flex flex-col px-5 pb-4 dark:text-gray-200">
			<form
				class="flex flex-col w-full"
				on:submit|preventDefault={() => {
					submitHandler();
				}}
			>
				<div class="mb-1 text-xs text-gray-500">
					{$i18n.t('Original Model Name')}
				</div>
				<div class="mb-3 text-sm">{model?.name}</div>

				<div class="mb-1 text-xs text-gray-500">
					{$i18n.t('Alias (Display Name)')}
				</div>
				<input
					type="text"
					class="w-full mb-4 p-2 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent"
					value={alias}
					on:input={handleInput}
					placeholder={$i18n.t('Enter custom display name (leave empty to use original name)')}
				/>

				<div class="flex justify-end">
					<button
						type="button"
						class="px-3 py-1.5 mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
						on:click={() => {
							show = false;
						}}
						disabled={loading}
					>
						{$i18n.t('Cancel')}
					</button>
					<button
						type="submit"
						class="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg"
						disabled={loading}
					>
						{#if loading}
							<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
							{$i18n.t('Saving...')}
						{:else}
							{$i18n.t('Save')}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</Modal> 