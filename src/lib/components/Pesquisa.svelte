<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import ConfirmBox from './ConfirmBox.svelte';

	export let pesquisa = '';
	export let data: PageData;
	export let isAdm: boolean = false;
	export let expectedSecret: string = '';
	export let edit: boolean = false;
	export let ramalEdit: Ramal | undefined = undefined;

	function opne2(ramal: Ramal) {
		edit = true;
		ramalEdit = ramal;
		console.log(ramalEdit);
	}

	$: ({ ramais } = data);
	export let width = '';
	export let width2 = '';

	$: w = width;
	$: a = width2;
</script>

<div class="flex flex-col w-full bg-theme-base max-h-[600px] overflow-y-auto">
	{#each ramais as ramal}
		{#if ramal.org.toLowerCase().includes(pesquisa.toLowerCase()) || ramal.unidade
				.toLowerCase()
				.includes(pesquisa.toLowerCase()) || ramal.setor
				.toLowerCase()
				.includes(pesquisa.toLowerCase()) || ramal.user
				.toLowerCase()
				.includes(pesquisa.toLowerCase()) || ramal.ramal
				.toLowerCase()
				.includes(pesquisa.toLowerCase()) || ramal.servico
				.toLowerCase()
				.includes(pesquisa.toLowerCase())}
			<div class="flex w-full">
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.org}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.unidade}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.setor}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {a} p-2"
					>{ramal.user}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.ramal}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.servico}</span
				>

				{#if isAdm}
					<span class="border h-full flex justify-evenly items-center uppercase w-[16%] p-3">
						<button formaction="?/deleteRamais&id={ramal.id}&secret={expectedSecret}">
							<svg
								class="h-[1.2em] text-red-300"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentCOlor"
								viewBox="0 0 448 512"
								id="secondInput"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
								/></svg
							>
						</button>

						<button type="button" on:click={() => opne2(ramal)}>
							<svg
								class="h-[1.2em] text-blue-300"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentCOlor"
								viewBox="0 0 512 512"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
								/></svg
							>
						</button>
					</span>
				{/if}
			</div>
		{:else if !pesquisa}
			<div class="flex w-full">
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.org}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.unidade}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.setor}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {a} p-"
					>{ramal.user}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.ramal}</span
				>
				<span class="border h-full flex justify-center items-center uppercase {w} p-2"
					>{ramal.servico}</span
				>

				{#if isAdm}
					<span class="border h-full flex justify-evenly items-center uppercase w-[16%] p-3">
						<button formaction="?/deleteRamais&id={ramal.id}&secret={expectedSecret}">
							<svg
								class="h-[1.2em] text-red-300"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentCOlor"
								viewBox="0 0 448 512"
								id="secondInput"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
								/></svg
							>
						</button>

						<button type="button" on:click={() => opne2(ramal)}>
							<svg
								class="h-[1.2em] text-blue-300"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentCOlor"
								viewBox="0 0 512 512"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
								/></svg
							>
						</button>
					</span>
				{/if}
			</div>
		{/if}
	{/each}
</div>
