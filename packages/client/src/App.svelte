<script>
	const onClick = async () => {
		const response = await fetch("https://dog.ceo/api/breeds/image/random")
		const dogs = await response.json()

		const container = document.querySelector(".dogs")
		const img = document.createElement("img")
		img.src = dogs.message

		container.appendChild(
			img
		)
	}
</script>

<header>
	<button on:click={onClick}>Click me</button>
	<div class="dogs"></div>
</header>

<style>
	header {
		position: relative;
		width: 100vw;
		height: 750px;
		background: red;
	}

	button {
		position: absolute;
		top: 100%;
		left: 50%;
		background: green;
		padding: 1rem;
		transform: translateX(-50%) translateY(-50%);
	}
</style>
