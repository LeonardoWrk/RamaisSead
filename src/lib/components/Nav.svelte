<script lang="ts">
	export let pesquisa = '';
</script>

<div class="flex justify-center">
	<nav class=" bg-[#1a1c26] font-bold text-white p-3 drop-shadow-lg w-3/6 rounded-lg">
		<div class="flex justify-center items-center">
			<div class="text-4xl">Ramais</div>

			<slot />

			<input
				class="bg-theme-soft rounded-lg w-1/2 h-[63px]"
				placeholder="    e.g: buscar ramais"
				type="text"
				bind:value={pesquisa}
			/>
		</div>
	</nav>
</div>
