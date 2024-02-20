<script lang="ts">
	export let data: any;
	let pageSize = 10;
	$: total = data.total;
	$: totalPages = Math.ceil(total / pageSize);
</script>

<div class="pagination">
	{#each Array(totalPages) as _, index}
		<a
			href={`?page=${totalPages}`}
			class={`ml-6 ${index >= 5 && index < data.total - 5 ? 'hidden' : ''}`}
		>
			{index >= 5 && index < data.total - 5 ? '...' : totalPages}
		</a>
	{/each}
</div>
