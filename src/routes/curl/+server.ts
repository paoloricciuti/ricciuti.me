import { get_articles } from '$lib/articles/utils';

export const prerender = true;

// ANSI escape codes
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const UNDERLINE = '\x1b[4m';

// colors matching the website brand palette
const ORANGE = '\x1b[38;2;255;62;0m'; // #ff3e00 (brand-600)
const LIGHT_ORANGE = '\x1b[38;2;255;125;50m'; // #ff7d32 (brand-400)
const WARM = '\x1b[38;2;255;172;109m'; // #ffac6d (brand-300)
const ZINC_DIM = '\x1b[38;2;161;161;170m'; // zinc-400
const WHITE = '\x1b[38;2;244;244;245m'; // zinc-100
const LINK = '\x1b[38;2;255;89;10m'; // brand-500

function get_logo() {
	const WHITE = '\x1b[37m\x1b[47m  \x1b[0m ';
	const BLACK = '\x1b[37m\x1b[48;2;80;80;80m  \x1b[0m ';

	const line_1 = '\x1b[37m╭─────────────────────────╮\x1b[0m';
	const line_2 =
		'| ' +
		WHITE +
		WHITE +
		BLACK +
		BLACK +
		BLACK +
		BLACK +
		BLACK +
		WHITE.substring(0, WHITE.length - 1) +
		'\x1b[0m |';

	const line_3 =
		'| ' +
		WHITE +
		WHITE +
		BLACK +
		BLACK +
		BLACK +
		WHITE +
		BLACK +
		WHITE.substring(0, WHITE.length - 1) +
		'\x1b[0m |';
	const line_4 = '\x1b[37m╰─────────────────────────╯\x1b[0m';

	return [
		line_1,
		line_2,
		'|' + ' '.repeat('─────────────────────────'.length) + '|',
		line_3,
		line_4,
	];
}

function link(url: string, text?: string) {
	// OSC 8 hyperlink: \e]8;;URL\e\\TEXT\e]8;;\e\\
	return `\x1b]8;;${url}\x1b\\${UNDERLINE}${LINK}${text ?? url}${RESET}\x1b]8;;\x1b\\`;
}

function hr(width = 60) {
	return `${DIM}${ORANGE}${'─'.repeat(width)}${RESET}`;
}

function section_header(title: string) {
	return `${BOLD}${ORANGE}  ${title}${RESET}`;
}

function get_talks() {
	const talks_import = import.meta.glob('$lib/talks/*.json', {
		eager: true,
	}) as Record<
		string,
		{
			title: string;
			description: string;
			events: { event: string; date: string; watch?: string; slides?: string }[];
		}
	>;

	return Object.entries(talks_import)
		.map(([filename, value]) => {
			const slug = filename.match(/\/src\/lib\/talks\/(?<slug>.+)\.json/)?.groups?.slug ?? '';
			const events = value.events
				.map((event) => ({ ...event, date: new Date(event.date) }))
				.sort((a, b) => b.date.getTime() - a.date.getTime());
			return {
				...value,
				events,
				date: events[0]?.date ?? new Date(8640000000000000),
				slug,
			};
		})
		.sort((a, b) => b.date.getTime() - a.date.getTime());
}

const date_formatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
});

export async function GET({ request }) {
	const articles = await get_articles();
	const talks = get_talks();

	const latest_articles = articles.slice(0, 5);
	const latest_talks = talks.slice(0, 5);

	const lines: string[] = [];

	// blank line for breathing room
	lines.push('');

	// header
	lines.push(`${BOLD}${WHITE}ricciuti.me${RESET}`);
	lines.push(`${DIM}${ZINC_DIM}tech blog and personal website of a mad scientist${RESET}`);
	lines.push('');

	// logo
	for (const logo_line of get_logo()) {
		lines.push(logo_line);
	}
	lines.push('');

	// about
	lines.push(section_header('about'));
	lines.push('');
	lines.push(
		`${WHITE}  hi, fellow internet surfer! I'm ${BOLD}Paolo Ricciuti${RESET}${WHITE}, a fullstack${RESET}`,
	);
	lines.push(
		`${WHITE}  senior software engineer at ${BOLD}Mainmatter${RESET}${WHITE} from Italy.${RESET}`,
	);
	lines.push(
		`${WHITE}  I love ${ORANGE}Svelte${RESET}${WHITE} 🧡 — I'm a Svelte Ambassador and a core team${RESET}`,
	);
	lines.push(`${WHITE}  maintainer since September 2024.${RESET}`);
	lines.push('');

	lines.push(hr());
	lines.push('');

	// blog posts
	lines.push(section_header('latest blog posts'));
	lines.push('');

	for (const article of latest_articles) {
		const date = date_formatter.format(new Date(article.published));
		const url = `https://ricciuti.me/blog/${article.slug}`;
		lines.push(`${WARM}  ▸ ${RESET}${BOLD}${WHITE}${article.title}${RESET}`);
		lines.push(`${DIM}${ZINC_DIM}    ${date}${RESET}`);
		lines.push(`    ${link(url)}`);
		lines.push('');
	}

	lines.push(hr());
	lines.push('');

	// speaking
	lines.push(section_header('recent talks'));
	lines.push('');

	for (const talk of latest_talks) {
		const latest_event = talk.events[0];
		const date = latest_event ? date_formatter.format(latest_event.date) : '';
		const event_name = latest_event?.event ?? '';

		lines.push(`${WARM}  ▸ ${RESET}${BOLD}${WHITE}${talk.title}${RESET}`);
		if (event_name) {
			lines.push(`${DIM}${ZINC_DIM}    ${event_name}${date ? ` — ${date}` : ''}${RESET}`);
		}

		const links: string[] = [];
		if (latest_event?.watch) {
			links.push(`${LIGHT_ORANGE}watch:${RESET} ${link(latest_event.watch)}`);
		}
		if (latest_event?.slides) {
			links.push(`${LIGHT_ORANGE}slides:${RESET} ${link(latest_event.slides)}`);
		}
		if (links.length > 0) {
			lines.push(`    ${links.join('  ')}`);
		}
		lines.push('');
	}

	lines.push(hr());
	lines.push('');

	// links / socials
	lines.push(section_header('links'));
	lines.push('');
	lines.push(`${WARM}  ▸ ${RESET}${LIGHT_ORANGE}web      ${RESET}${link('https://ricciuti.me')}`);
	lines.push(
		`${WARM}  ▸ ${RESET}${LIGHT_ORANGE}github   ${RESET}${link('https://github.com/paoloricciuti')}`,
	);
	lines.push(
		`${WARM}  ▸ ${RESET}${LIGHT_ORANGE}bluesky  ${RESET}${link('https://bsky.app/profile/ricciuti.me')}`,
	);
	lines.push('');

	lines.push(hr());
	lines.push('');
	lines.push(`${DIM}${ZINC_DIM}  want to read more awesome stuff? see my blog circle at${RESET}`);
	lines.push(`  ${link('https://ricciuti.me/blog-circle')}`);
	lines.push('');

	const body = lines.join('\n');

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	});
}
