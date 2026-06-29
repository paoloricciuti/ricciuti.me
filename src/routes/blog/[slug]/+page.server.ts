import { rkeyFromUrl } from '@mastrojs/atproto';

export function load({ params }) {
	return {
		at_url: `at://did:plc:ezyrzvz3yoglekd4j2szmiys/site.standard.document/${rkeyFromUrl(
			new URL(params.slug, 'https://ricciuti.me/blog/'),
		)}`,
	};
}
