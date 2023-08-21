<script lang="ts">
	type ProjectData = {
		title?: string;
		description?: string;
		link?: string;
		order?: number;
	};

	const projects_data = import.meta.glob<{ default: ProjectData } & ProjectData>(
		'$lib/projects/**/index.json',
		{
			eager: true
		}
	);
	const imgs = import.meta.glob<{ default: string }>('$lib/projects/**/img.png', {
		eager: true
	});

	type Project = {
		img: string;
	} & ProjectData;

	const projects = Object.entries(projects_data)
		.reduce<Project[]>((prev, [folder, module]) => {
			// remove unneeded default
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { default: _, ...data } = module;
			const matches = folder.match(/^(?<folder>.*)index.json$/);
			let img = '';
			if (matches?.groups?.folder) {
				const img_import = imgs[`${matches.groups.folder}img.png`];
				if (img_import && typeof img_import === 'object' && 'default' in img_import) {
					img = img_import.default;
				}
			}
			prev.push({ ...data, img });
			return prev;
		}, [])
		.sort((projectA, projectB) => (projectA.order ?? 0) - (projectB.order ?? 0));
</script>

<h1>projects</h1>

Here's a small list of projects i worked on and that i'm proud of enough to share them with you (for
the unfiltered list just go check my&nbsp;<a href="https://github.com/paoloricciuti">GitHub</a> at
your own risk)

<ul class="list-none p-0">
	{#each projects as project}
		{@const title = project.title}
		<li class="rounded-lg bg-brand-200/25 p-4 dark:bg-zinc-950/60">
			<a aria-labelledby="{title} description" href={project.link}>
				<strong>{title}</strong>
				{#if project.img}
					<img class="m-0 mt-2" src={project.img} alt="{project.title} preview" />
				{/if}
			</a>
			{#if project.description}
				<p id="{title} description">{project.description}</p>
			{/if}
		</li>
	{/each}
</ul>
