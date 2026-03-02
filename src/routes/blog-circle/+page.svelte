<script>
	import blog_circle from '$lib/blog-circle.json';
</script>

<svelte:head>
	<title>ricciuti.me - blog circle</title>
</svelte:head>

<h1>blog circle</h1>

<p>
	friends and people with blogs worth checking out. these are people i admire and learn from — go
	give them a read!
</p>

<div class="blog-circle-list">
	{#each blog_circle as blog (blog.name)}
		<article>
			<a href={blog.blog} target="_blank" rel="noopener noreferrer" class="name">
				{blog.name}
			</a>
			<p class="description">{blog.description}</p>
		</article>
	{/each}
</div>

<style>
	.blog-circle-list {
		display: grid;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	article {
		border-left: #ff3e00 0.5rem solid;
		padding: 0.75rem;
		background-color: rgb(127 127 127 / 0.2);
		border-radius: 0.5rem;
	}

	.name {
		font-weight: bold;
		font-size: 1.25rem;
		text-decoration: none;
		color: inherit;
	}

	.name:hover {
		color: #ff3e00;
	}

	.description {
		margin: 0.25rem 0 0;
		opacity: 0.8;
		font-size: 0.9rem;
	}
</style>
