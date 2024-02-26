<script lang="ts">
	export let data: any;
	let pageSize = 10;
	let total = data.total;
	let totalPages = Math.ceil(total / pageSize);
	console.log(totalPages);
</script>

<div class="pagination">
	{#each Array(totalPages) as _, index}
		<a
			href={`?page=${index + 1}`}
			class={`ml-6 ${index >= 5 && index < totalPages - 5 ? 'hidden' : ''}`}
		>
			{index >= 5 && index < totalPages - 5 ? '...' : index + 1}
		</a>
	{/each}
</div>
