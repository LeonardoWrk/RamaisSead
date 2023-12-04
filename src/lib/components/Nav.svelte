<script lang="ts">
	export let pesquisa = '';
</script>

<div class="flex justify-center">
	<nav class=" bg-white font-bold text-black p-3 shadow-lg shadow-[#002776] opacity-75 w-3/6">
		<div class="flex items-center justify-evenly">
			<div class="text-4xl">Ramais</div>

			<slot />

			<input
				class="bg-white rounded-lg w-[70%] h-[63px] border border-[#002776]"
				placeholder="    e.g: buscar ramais"
				type="text"
				bind:value={pesquisa}
			/>
		</div>
	</nav>
</div>
