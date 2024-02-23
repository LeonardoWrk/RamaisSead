<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Pesquisa from '$lib/components/Pesquisa.svelte';

	import type { PageData } from './$types';

	export let pesquisa = '';
	export let data: PageData;
	$: ({ ramais } = data);
</script>

<a
	href="/login"
	class="hover:bg-[#808080] text-center flex justify-center active:scale-90 duration-100 bg-[white] font-bold text-black p-4 drop-shadow-lg shadow-[#002776] w-20 rounded-lg absolute"
	>ADM</a
>
<div class="w-full h-[10vh]">
	<Nav bind:pesquisa />

	<div class=" rounded-lg flex flex-col h-[90vh] mt-20 items-center text-black">
		<div class="flex flex-col w-9/12 bg-white shadow-lg shadow-[#002776] opacity-75">
			<div class="flex w-full border">
				<span
					class="border h-full flex justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>org</span
				>
				<span
					class="border h-full flex justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>unidade</span
				>
				<span
					class="border h-full flex justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>setor</span
				>
				<span
					class="border h-full flex justify-center items-center w-[40.1%] p-4 font-bold uppercase text-xl"
					>user</span
				>
				<span
					class="border h-full flex justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>ramal</span
				>
				<span
					class="border h-full flex justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>servico</span
				>
			</div>
			<Pesquisa bind:data bind:pesquisa width="w-1/4" width2="w-1/2" />
		</div>
	</div>
</div>
