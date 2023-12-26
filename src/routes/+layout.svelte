<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
</script>

<Header />

<div class="app bg-[#0d1117] text-white">
	<main>
		<slot />
	</main>
</div>
