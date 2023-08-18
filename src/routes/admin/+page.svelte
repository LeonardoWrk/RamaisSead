<ul class="bg-[#242424]">
	<button
		class=" place-self-start bg-[#85a7ad] p-2 m-2 hover:bg-theme-soft rounded-md active:scale-90 duration-100"
		><li><a href="/">voltar</a></li>
	</button>
</ul>
<div class="container-p">
	<h1 class="text-center text-white text-xl/[125px]">Pagina Do Administrador</h1>
	<ul class="flex mr-6">
	</ul>
	<div class="form">
		<form action="?/createRamais" method="POST">
			<div>
				<label for="org">Adicionar Orgao</label>
				<input class="uppercase text-black" type="text" name="org" />
			</div>
			<div>
				<label for="unidade">Adicionar Unidade</label>
				<input class="uppercase text-black" required type="text" name="unidade" />
			</div>
			<div>
				<label for="setor">Adicionar Setor</label>
				<input class="uppercase text-black" required type="text" name="setor" />
			</div>
			<div>
				<label for="user">Adicionar Usuario</label>
				<input class="uppercase text-black" required type="text" name="user" />
			</div>
			<div>
				<label for="ramal">Adicionar Ramal</label>
				<input class="uppercase text-black" required type="text" name="ramal" />
			</div>
			<button type="submit">adicionar</button>
		</form>
	</div>
</div>

<style>
	.container-p {
		height: 100vh;
		width: 100vw;
		margin: 0;
		background-color: #242424;
		color: #fff;
		display: flex;
		flex-direction: column;

		align-items: center;
	}

	form {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.form {
		width: 70%;
		height: 5em;
		margin-left: 4em;
		margin-right: 4em;
		padding: 0.5em;
		background-color: #5b615f;
		border: 2px solid #fff;
	}

	label {
		display: block;
	}
</style>
