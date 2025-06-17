<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<main
	class="flex h-full flex-col items-center border-8 border-[#ff3e0077] bg-zinc-900 p-8 text-zinc-100"
>
	<p class="text-4xl">ricciuti.me</p>
	<p class="text-lg opacity-50">tech blog and personal website of a mad scientist</p>
	<p class="mt-16 text-center text-8xl">{title}</p>
</main>
