<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Pesquisa from '$lib/components/Pesquisa.svelte';

	import type { PageData } from './$types';

	export let pesquisa = '';
	export let data: PageData;
	$: ({ ramais } = data);
</script>

<div class="w-full h-[10vh]">
	<Nav bind:pesquisa>
		<a
			href="/login"
			class="mr-auto bg-theme-soft p-4 m-2 w-[15%] hover:bg-theme-soft text-center flex justify-center rounded-md active:scale-90 duration-100"
			>ADM</a
		></Nav
	>
	<div class=" drop-shadow-lg rounded-lg flex flex-col h-[90vh] mt-20 items-center text-white">
		<div class="flex flex-col w-9/12 bg-theme-soft">
			<Head width="w-1/5" />
			<Pesquisa bind:data bind:pesquisa width="w-1/5" />
		</div>
	</div>
</div>
