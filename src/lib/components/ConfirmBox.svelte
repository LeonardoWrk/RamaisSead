<script lang="ts">
	export let auth;
</script>

<div
	class="font-bold items-center flex justify-center fixed top-0 bottom-0 left-0 right-0 h-full w-full z-50 bg-black bg-opacity-40"
>
	<div
		class="text-white mb-24 bg-[#1a1c26] w-[20%] h-[20%] flex flex-col items-end text-center justify-center rounded-lg z-50"
	>
		<h2 class=" w-full text-xl">tem certeza?</h2>
		<div class=" mt-10 w-full flex justify-evenly">
			<button class="w-[30%] bg-theme-soft p-4 rounded-lg" type="submit">Sim</button>
			<button
				on:click={() => {
					auth = true;
				}}
				class="w-[30%] bg-theme-soft p-4 rounded-lg">Nao</button
			>
		</div>
	</div>
</div>
