<script lang="ts">
	import { goto } from '$app/navigation';

	let usuario = '';
	let senha = '';

	async function handlelogin() {
		if (usuario === 'ramaisadm' && senha === '123') {
			goto('/admin');
		} else {
			alert('senha ou usuario errados, tente novamente');
		}
	}
</script>

<div class="w-full flex justify-center mt-40 text-white drop-shadow-lg">
	<form
		on:submit|preventDefault={handlelogin}
		class="bg-[#1a1c26] flex flex-col w-1/5 rounded-t-lg drop-shadow-lg"
		action=""
	>
		<h2 class="text-white text-center bg-theme-soft h-[%80] rounded-t-lg p-2 text-xl">login</h2>
		<div class="flex flex-col mt-10 items-center">
			<div class="w-[80%] flex flex-col">
				<label class="text-white mb-2" for="username">Usuario</label>
				<input class="rounded-md text-black text-2xl" id="user" bind:value={usuario} type="text" />
			</div>

			<div class="w-[80%] flex flex-col mt-10">
				<label class="text-white mb-2" for="username">Senha</label>
				<input class="rounded-md text-black text-2xl" id="pass" bind:value={senha} type="text" />
			</div>

			<button
				type="submit"
				class=" p-2 m-10 w-2/5 bg-theme-soft rounded-md active:scale-90 duration-100"
			>
				Logar
			</button>
		</div>
	</form>
</div>
