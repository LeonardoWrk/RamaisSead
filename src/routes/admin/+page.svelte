<script lang="ts">
	import { onMount } from 'svelte';
	
	let auth = true;
	
  	let authorized = false;
	let adminSecret: string | null = null;// Variável para armazenar o "secret" da página de login


  	// Define um bloco de código que será executado após o componente montar
  	onMount(() => {
    // Cria uma instância de URLSearchParams a partir da string de consulta na URL
    const params = new URLSearchParams(window.location.search);
    // Obtém o valor do parâmetro 'secret' da URL
    adminSecret = params.get('secret');
    
    const expectedSecret = localStorage.getItem('adminSecret'); // Obtém o "secret" do armazenamento local

    // Verifica se o valor do parâmetro 'secret' é igual ao "secret" esperado
    authorized = adminSecret !== null && adminSecret === expectedSecret;
  });



	function open() {
		auth = false;
	}

	export let data: any;
	export let pesquisa = '';

	$: ({ ramais } = data);
</script>

{#if authorized}
<div class="flex justify-center">
	<nav class=" bg-[#1a1c26] font-bold text-white p-3 drop-shadow-lg w-3/6 rounded-lg">
		<div class="flex justify-center items-center">
			<div class="text-4xl">Ramais</div>
			<a
				href="/"
				class="mr-auto bg-theme-soft p-4 m-2 w-[15%] hover:bg-theme-soft text-center flex justify-center rounded-md active:scale-90 duration-100"
				>NORMAL</a
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

<div class="bg-theme-base text-white h-full w-full m-0 mt-20 flex flex-col items-center">
	<div class=" w-[70%] h-[5em] ml-4 mr-4 p-0.5">
		<form action="?/createRamais" method="POST">
			{#if !auth}
				<div
					class="font-bold items-center flex justify-center fixed top-0 bottom-0 left-0 right-0 h-full w-full z-50 bg-black w-full bg-opacity-40"
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
			{/if}
			<div class=" drop-shadow-lg rounded-lg flex flex-col h-[90vh] items-center text-white">
				<div class="flex flex-col w-full mt-10 bg-theme-soft">
					<div class="flex w-full">
						<span
							class="border border-[#27293a] h-full flex justify-center items-center w-1/6 p-4 font-bold uppercase text-xl"
							>org</span
						>
						<span
							class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-4 font-bold uppercase text-xl"
							>unidade</span
						>
						<span
							class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-4 font-bold uppercase text-xl"
							>setor</span
						>
						<span
							class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-4 font-bold uppercase text-xl"
							>user</span
						>
						<span
							class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-4 font-bold uppercase text-xl"
							>ramal</span
						>
						<span
							class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-4 font-bold uppercase text-xl"
						/>
					</div>
					<div class="flex justify-around bg-theme-base">
						<div class="flex w-full h-full text-black">
							<div class="flex justify-center items-center w-1/6 p-4 border border-[#27293a]">
								<input class="uppercase w-[85%] h-8 justify-center" type="text" name="org" />
							</div>

							<div class="flex justify-center items-center w-1/6 p-4 border border-[#27293a]">
								<input
									class="uppercase w-[85%] h-8 text-black"
									required
									type="text"
									name="unidade"
								/>
							</div>
							<div class="flex justify-center items-center w-1/6 p-4 border border-[#27293a]">
								<input class="uppercase w-[85%] h-8 text-black" required type="text" name="setor" />
							</div>
							<div class="flex justify-center items-center w-1/6 p-4 border border-[#27293a]">
								<input class="uppercase w-[85%] h-8 text-black" required type="text" name="user" />
							</div>
							<div class="flex justify-center items-center w-1/6 p-4 border border-[#27293a]">
								<input class="uppercase w-[85%] h-8 text-black" required type="text" name="ramal" />
							</div>

							<div
								class="flex justify-center w-1/6 items-center text-black border border-[#27293a]"
							>
								<div class="flex justify-evenly items-center w-1/2 rounded-md p-2 bg-green-300">
									<svg
										class="h-[1.3em]"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
											d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
										/></svg
									>
									<button type="button" on:click={open}>Adicionar</button>
								</div>
							</div>
						</div>
					</div>

					<div class="flex flex-col w-full bg-theme-base max-h-[600px] overflow-y-auto">
						{#each ramais as ramal}
							{#if ramal.org.toLowerCase().includes(pesquisa.toLowerCase()) || ramal.unidade
									.toLowerCase()
									.includes(pesquisa.toLowerCase())}
								<div class="flex w-full">
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.org}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.unidade}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.setor}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.user}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.ramal}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-evenly items-center w-1/6 p-2"
									>
										<button>
											<svg
												class="h-[1.2em] text-red-300"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentCOlor"
												viewBox="0 0 448 512"
												><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
													d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
												/></svg
											>
										</button>

										<button>
											<svg
												class="h-[1.2em] text-blue-300"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentCOlor"
												viewBox="0 0 512 512"
												><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
													d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
												/></svg
											>
										</button>
									</span>
								</div>
							{:else if !pesquisa}
								<div class="flex border-[#27293a] w-full">
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.org}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.unidade}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.setor}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.user}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-center items-center w-1/6 p-2"
										>{ramal.ramal}</span
									>
									<span
										class="border h-full flex border-[#27293a] justify-evenly items-center w-1/6 p-2"
									>
										<button>
											<svg
												class="h-[1.2em] text-red-300"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentCOlor"
												viewBox="0 0 448 512"
												><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
													d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
												/></svg
											>
										</button>

										<button>
											<svg
												class="h-[1.2em] text-blue-300"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentCOlor"
												viewBox="0 0 512 512"
												><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
													d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
												/></svg
											>
										</button>
									</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
{:else}
<div class="text-white h-[80%] flex justify-center items-center font-bold text-2xl">
	<h2> você não está autorizado a acessar esta página. </h2> 						
</div>
{/if}

