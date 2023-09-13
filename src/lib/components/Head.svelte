<script lang="ts">
	export let width = '';
	export let opedit;
	$: w = width;
</script>

<div class="flex w-full border border-[#27293a]">
	<span
		class="border border-[#27293a] h-full flex justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>org</span
	>

	<button
		type="button"
		on:click={() => {
			opedit = false;
		}}
		class="border h-full flex border-[#27293a] justify-center items-center {w} p-4 font-bold uppercase text-xl"
	>
		unidade
	</button>

	<span
		class="border h-full flex border-[#27293a] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>setor</span
	>
	<span
		class="border h-full flex border-[#27293a] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>user</span
	>
	<span
		class="border h-full flex border-[#27293a] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>ramal</span
	>
	<span
		class="border h-full flex border-[#27293a] justify-center items-center {w} p-4 font-bold uppercase text-xl"
		>servico</span
	>
	<slot />
</div>
