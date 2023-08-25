import fg from 'fast-glob';
import { execSync } from 'node:child_process';
import { writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from 'dotenv';

config();

function path_only(glob_entry: string) {
	const splitted = glob_entry.split('/');
	if (splitted.at(0) === '.') {
		splitted.shift();
	}
	splitted.pop();
	return splitted.join('/');
}
const modified_git = execSync('git diff --name-only HEAD~1').toString().split('\n');
const article_entries = (await fg.glob('./src/lib/articles/**/index.svx')).map(path_only);
const embedding_entries = (await fg.glob('./src/lib/articles/**/embedding.json')).map(path_only);

const to_request = article_entries.filter((article) => {
	return !(embedding_entries.includes(article) && !modified_git.includes(`${article}/index.svx`));
});

if (to_request.length < 0) {
	process.exit();
}

const open_api_key = process.env.OPEN_API_KEY;

if (!open_api_key) {
	console.error("Can't load embeddings without an open api key in your .env");
	process.exit();
}

const requests: Promise<{ path: string; json: unknown }>[] = [];
for (const request of to_request) {
	requests.push(
		Promise.resolve().then(async () => {
			const content = await readFile(resolve(process.cwd(), `${request}/index.svx`), {
				encoding: 'utf-8',
			});
			return await fetch('https://api.openai.com/v1/embeddings', {
				method: 'POST',
				headers: {
					authorization: `Bearer ${open_api_key}`,
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					input: content,
					model: 'text-embedding-ada-002',
				}),
			})
				.then((res) => res.json())
				.then((json) => ({ json, path: request }));
		}),
	);
}

const embeddings = await Promise.allSettled(requests);

const writing_promises: Promise<unknown>[] = [];
for (const embedding of embeddings) {
	if (embedding.status === 'fulfilled') {
		writing_promises.push(
			writeFile(`${embedding.value.path}/embedding.json`, JSON.stringify(embedding.value.json)),
		);
	}
}

await Promise.allSettled(writing_promises);

execSync('git add .');
