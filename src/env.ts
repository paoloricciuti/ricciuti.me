import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

export const variables = defineEnvVars({
	ATPROTO_PASSWORD: {
		description: 'The password for the AT Protocol account',
		schema: v.string(),
		static: true,
		public: false,
	},
	ATPROTO_IDENTIFIER: {
		description: 'The identifier for the AT Protocol account',
		schema: v.string(),
		static: true,
		public: false,
	},
	ATPROTO_SERVICE: {
		description: 'The service for the AT Protocol account',
		schema: v.string(),
		static: true,
		public: false,
	},
});
