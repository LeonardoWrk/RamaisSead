<script lang="ts">
	export let width = '';
	export let opedit: boolean;
	export let opedit2: boolean;
	$: w = width;
</script>

<div class="flex w-full border border-[#002776]">
	<span
		class="border border-[#002776] h-full flex justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>org</span
	>

	<button
		type="button"
		on:click={() => {
			opedit = true;
		}}
		class="border h-full flex border-[#002776] justify-center items-center {w} p-4 font-bold uppercase text-xl"
	>
		<svg
			class="h-[1em]"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
			/></svg
		>
		unidade
	</button>

	<button
		type="button"
		on:click={() => {
			opedit2 = true;
		}}
		class="border h-full flex border-[#002776] justify-center items-center {w} p-4 font-bold uppercase text-xl"
	>
		<svg
			class="h-[1em]"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
			/></svg
		>
		setor
	</button>
	<span
		class="border h-full flex border-[#002776] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>user</span
	>
	<span
		class="border h-full flex border-[#002776] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>ramal</span
	>
	<span
		class="border h-full flex border-[#002776] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>servico</span
	>
	<slot />
</div>
