<script lang="ts">
	import ConfirmBox from '$lib/components/ConfirmBox.svelte';
	import Head from '$lib/components/Head.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Pesquisa from '$lib/components/Pesquisa.svelte';
	import { onMount } from 'svelte';
	import { slide, fly, fade } from 'svelte/transition';

	let expectedSecret: any;
	let auth = true;
	let edit = true;
	let ramalEdit: Ramal;

	let authorized = false;
	let adminSecret: string | null = null; // Variável para armazenar o "secret" da página de login

	// Define um bloco de código que será executado após o componente montar
	onMount(() => {
		// Cria uma instância de URLSearchParams a partir da string de consulta na URL
		const params = new URLSearchParams(window.location.search);
		// Obtém o valor do parâmetro 'secret' da URL
		adminSecret = params.get('secret');

		// Obtém o "secret" do armazenamento local
		expectedSecret = localStorage.getItem('adminSecret');
		// Verifica se o valor do parâmetro 'secret' é igual ao "secret" esperado
		authorized = adminSecret !== null && adminSecret === expectedSecret;
	});

	function open() {
		auth = false;
	}

	export let data: any;
	export let pesquisa = '';
</script>

{#if authorized}
	{#if !edit}
		<div
			transition:slide={{ axis: 'x' }}
			class=" absolute right-0 transform translate-y-[15%] z-50 bg-[#1a1c26] drop-shadow-lg rounded-lg border border-[#27293a]"
		>
			<div class="flex w-full items-center rounded-md p-2">
				<button
					type="button"
					on:click={() => {
						edit = true;
					}}
				>
					<svg
						class="text-white"
						xmlns="http://www.w3.org/2000/svg"
						height="1.5em"
						fill="currentColor"
						viewBox="0 0 384 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						/></svg
					>
				</button>
				<div class="ml-10 text-white text-xl font-extrabold">Atualizar</div>
			</div>
			<div class="w-full flex justify-around bg-theme-base">
				<form
					class="w-full"
					action="?/updateramais&id={ramalEdit.id}&secret={expectedSecret}"
					method="POST"
				>
					<div class="flex-col flex w-full h-full text-black items-center font-extrabold">
						<div class="flex flex-col justify-center items-center p-4">
							<label class="text-white p-2" for="org">Org</label>
							<input
								class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
								type="text"
								name="org"
								placeholder={ramalEdit.org}
							/>
						</div>

						<div class="flex flex-col justify-center items-center p-4">
							<label class="text-white p-2" for="org">Unidade</label>
							<input
								class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
								type="text"
								name="unidade"
								placeholder={ramalEdit.unidade}
							/>
						</div>
						<div class="flex flex-col justify-center items-center p-4">
							<label class="text-white p-2" for="org">Setor</label>
							<input
								class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
								type="text"
								name="setor"
								placeholder={ramalEdit.setor}
							/>
						</div>
						<div class="flex flex-col justify-center items-center p-4">
							<label class="text-white p-2" for="org">User</label>
							<input
								class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
								type="text"
								name="user"
								placeholder={ramalEdit.user}
							/>
						</div>
						<div class="flex flex-col justify-center items-center p-4">
							<label class="text-white p-2" for="org">Ramal</label>
							<input
								class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
								type="text"
								pattern="[0-9/]*"
								name="ramal"
								placeholder={ramalEdit.ramal}
							/>
						</div>
						<div class="flex flex-col justify-center items-center p-4">
							<label class="text-white p-2" for="org">servico</label>
							<input
								class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
								type="text"
								name="servico"
								placeholder={ramalEdit.servico}
							/>
						</div>
						<div class="flex m-6 justify-center items-center border border-[#27293a]">
							<div class="flex justify-evenly items-center rounded-md p-2 bg-green-300">
								<button type="submit">Atualizar</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
	<Nav bind:pesquisa>
		<a
			href="/"
			class="mr-auto bg-theme-soft p-4 m-2 w-[15%] hover:bg-theme-soft text-center flex justify-center rounded-md active:scale-90 duration-100"
			>NORMAL</a
		></Nav
	>
	<div class="bg-theme-base text-white h-full w-full m-0 mt-20 flex flex-col items-center">
		<div class=" w-[70%] h-[5em] ml-4 mr-4 p-0.5">
			<form action="?/createRamais&secret={expectedSecret}" method="POST">
				{#if !auth}
					<ConfirmBox bind:auth />
				{/if}
				<div class=" drop-shadow-lg rounded-lg flex flex-col h-[90vh] items-center text-white">
					<div class="flex flex-col w-full bg-theme-soft">
						<Head width="w-[14%]">
							<span
								class="h-full flex justify-center items-center w-[14%] p-4 font-bold uppercase text-xl"
							/>
						</Head>
						<div class="flex justify-around bg-theme-base">
							<div class="flex w-full h-full text-black border border-[#27293a]">
								<div class="flex justify-center items-center w-[14%] p-4 border border-[#27293a]">
									<input
										class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
										type="text"
										name="org"
									/>
								</div>

								<div class="flex justify-center items-center w-[14%] p-4 border border-[#27293a]">
									<select
										class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
										name="unidade"
									>
										<option value="" />
										<option value="SUPAT">SUPAT</option>
										<option value="ASPOCT">ASPOCT</option>
										<option value="NÚCLEO DE GESTÃO">NÚCLEO DE GESTÃO</option>
										<option value="PERICIA">PERICIA</option>
										<option value="CEAC-TURISTA">CEAC-TURISTA</option>
										<option value="SGRH">SGRH</option>
										<option value="GABINETE">GABINETE</option>
										<option value="SGCC/COMPRAS">SGCC/COMPRAS</option>
										<option value="DAF">DAF</option>
										<option value="OUVIDORIA">OUVIDORIA</option>
									</select>
								</div>

								<div class="flex justify-center items-center w-[14%] p-4 border border-[#27293a]">
									<select
										class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
										name="setor"
									>
										<option value="" />
										<option value="SGRH">SGRH</option>
										<option value="DAF">DAF</option>
										<option value="ASCOM">ASCOM</option>
										<option value="CPSIAD">CPSIAD</option>
										<option value="ALMOXARIFADO">ALMOXARIFADO</option>
										<option value="GERPS">GERPS</option>
										<option value="GERFIN">GERFIN</option>
										<option value="GERATA">GERATA</option>
										<option value="SGCC">SGCC</option>
										<option value="OUVIDORIA">OUVIDORIA</option>
										<option value="PERICIA MEDICA">PERICIA MEDICA</option>
										<option value="SETRANS">SETRANS</option>
										<option value="DGSL">DGSL</option>
										<option value="GERMACO">GERMACO</option>
										<option value="GERSEP">GERSEP</option>
										<option value="GERMASE">GERMASE</option>
										<option value="GERAFOR">GERAFOR</option>
										<option value="GABINETE">GABINETE</option>
										<option value="RECEPÇÃO">RECEPÇÃO</option>
										<option value="GECIF">GECIF</option>
										<option value="CONCURSO">CONCURSO</option>
										<option value="INDENIZACAO">INDENIZACAO</option>
										<option value="GCSA">GCSA</option>
										<option value="DGP">DGP</option>
										<option value="GCDFF">GCDFF</option>
										<option value="INCORPORAÇÃO">INCORPORAÇÃO</option>
										<option value="GELOT">GELOT</option>
										<option value="ASPOCT">ASPOCT</option>
										<option value="DGPI">DGPI</option>
										<option value="SUPAT">SUPAT</option>
										<option value="DGPM">DGPM</option>
										<option value="GEMOVE">GEMOVE</option>
										<option value="DGP">DGP</option>
										<option value="CONTABILIDADE">CONTABILIDADE</option>
										<option value="NÚCLEO">NÚCLEO</option>
										<option value="GUARITA">GUARITA</option>
										<option value="SERVICO SOCIAL">SERVICO SOCIAL</option>
										<option value="SECLOG">SECLOG</option>
										<option value="DTIN">DTIN</option>
										<option value="ADESP">ADESP</option>
										<option value="DTI-TURISTA">DTI-TURISTA</option>
										<option value="ACUMULO DE CARGOS">ACUMULO DE CARGOS</option>
										<option value="PROTOCOLO">PROTOCOLO</option>
										<option value="ESCOLA">ESCOLA</option>
										<option value="GCLOG">GCLOG</option>
									</select>
								</div>
								<div class="flex justify-center items-center w-[14%] p-4 border border-[#27293a]">
									<input
										class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
										type="text"
										name="user"
									/>
								</div>
								<div class="flex justify-center items-center w-[14%] p-4 border border-[#27293a]">
									<input
										class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
										type="text"
										pattern="[0-9/]*"
										name="ramal"
									/>
								</div>
								<div class="flex justify-center items-center w-[14%] p-4 border border-[#27293a]">
									<input
										class="uppercase w-[85%] h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a]"
										type="text"
										name="servico"
									/>
								</div>

								<div class="flex justify-center p-4 w-[14%] items-center text-black">
									<div class="flex justify-evenly items-center w-1/1 rounded-md p-2 bg-green-300">
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

						<Pesquisa
							bind:data
							bind:pesquisa
							bind:edit
							bind:ramalEdit
							width="w-[14%]"
							isAdm={true}
							{expectedSecret}
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
{:else}
	<div />
{/if}
