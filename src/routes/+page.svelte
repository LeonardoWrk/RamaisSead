<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let pesquisa = '';

	$: ({ ramais } = data);
</script>

<div class="w-full h-[10vh]">
	<div class="flex justify-center">
		<nav class=" bg-[#1a1c26] font-bold text-white p-3 drop-shadow-lg w-3/6 rounded-lg">
			<div class="flex justify-center items-center">
				<div class="text-4xl">Ramais</div>
				<a
					href="/login"
					class="mr-auto bg-theme-soft p-4 m-2 w-[15%] hover:bg-theme-soft text-center flex justify-center rounded-md active:scale-90 duration-100"
					>ADM</a
				>
				<input
					class="bg-theme-soft rounded-lg w-1/2 h-[63px]"
					placeholder="    e.g: buscar ramais"
					type="text"
					bind:value={pesquisa}
				/>
			</div>
		</nav>
	</div>

	<div class=" drop-shadow-lg rounded-lg flex flex-col h-[90vh] mt-20 items-center text-white">
		<div class="flex flex-col w-9/12 mt-10 bg-theme-soft">
			<div class="flex w-full">
				<span
					class="border border-[#27293a] h-full flex justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>org</span
				>
				<span
					class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>unidade</span
				>
				<span
					class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>setor</span
				>
				<span
					class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>user</span
				>
				<span
					class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-4 font-bold uppercase text-xl"
					>ramal</span
				>
			</div>

			<div class="flex flex-col w-full bg-theme-base">
				{#each ramais as ramal}
					{#if ramal.org.toLowerCase().includes(pesquisa.toLowerCase()) || ramal.unidade
							.toLowerCase()
							.includes(pesquisa.toLowerCase())}
						<div class="flex w-full">
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.org}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.unidade}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.setor}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.user}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.ramal}</span
							>
						</div>
					{:else if !pesquisa}
						<div class="flex border-[#27293a] w-full">
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.org}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.unidade}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.setor}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.user}</span
							>
							<span
								class="border h-full flex border-[#27293a] justify-center items-center w-1/5 p-2"
								>{ramal.ramal}</span
							>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
