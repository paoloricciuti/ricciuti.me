import { createServer } from 'vite';

const vite = await createServer({
	server: { middlewareMode: true },
	appType: 'custom',
});

try {
	await vite.ssrLoadModule('/scripts/publish-to-atmosphere.ts');
} finally {
	await vite.close();
}
