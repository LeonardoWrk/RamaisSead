<script lang="ts">
	import { goto } from '$app/navigation';

	let secret = generateSecret();

	let usuario = '';
	let senha = '';

	function generateSecret() {
		// Gere um valor único (você pode usar bibliotecas para isso)
		return Math.random().toString(36).substr(2, 8); // Exemplo simples de geração de valor único
	}

	async function handlelogin() {
		if (usuario === 'ramaisadm' && senha === '123') {
			localStorage.setItem('adminSecret', secret); // Armazena o novo secret no armazenamento local
			goto(`/admin?secret=${secret}`);
		} else {
			alert('senha ou usuario errados, tente novamente');
		}
	}
</script>

<div class="w-full flex justify-center mt-40 text-black drop-shadow-lg">
	<form
		on:submit|preventDefault={handlelogin}
		class="bg-[white] flex flex-col w-1/5 rounded-t-lg shadow-lg shadow-[#002776] opacity-75"
		action=""
	>
		<h2 class="text-black text-center bg-gray-300 h-[%80] rounded-t-lg p-2 text-xl">login</h2>
		<div class="flex flex-col mt-10 items-center">
			<div class="w-[80%] flex flex-col">
				<label class="text-black mb-2" for="username">Usuario</label>
				<input
					class=" h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a] text-2xl"
					id="user"
					bind:value={usuario}
					type="text"
				/>
			</div>

			<div class="w-[80%] flex flex-col mt-10">
				<label class="text-black mb-2" for="username">Senha</label>
				<input
					class=" h-8 rounded-lg bg-theme-secondaryBase text-white border border-[#27293a] text-2xl"
					id="pass"
					bind:value={senha}
					type="password"
				/>
			</div>
			<button
				type="submit"
				class=" p-2 m-10 w-2/5 bg-gray-300 rounded-md active:scale-90 duration-100"
			>
				Logar
			</button>
		</div>
	</form>
</div>
