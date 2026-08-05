import { ATPROTO_IDENTIFIER, ATPROTO_PASSWORD, ATPROTO_SERVICE } from '$app/env/private';
import { prerender } from '$app/server';
import { PasswordSession } from '@atproto/lex-password-session';
import * as id from '../../lexicons/id';
import { Client } from '@atproto/lex';

let session: PasswordSession | undefined;

let client: Client | undefined;

export const get_talks = prerender(async () => {
	if (!session) {
		session = await PasswordSession.login({
			service: ATPROTO_SERVICE,
			identifier: ATPROTO_IDENTIFIER,
			password: ATPROTO_PASSWORD,
		});
	}
	if (!client) {
		client = new Client(session);
	}
	const [talks, deliveries] = await Promise.all([
		client.list(id.sifa.profile.presentation),
		client.list(id.sifa.profile.presentationDelivery),
	]);
	const refined_talks = talks.records
		.map((talk) => {
			return {
				title: talk.value.title,
				description: talk.value.description,
				events: deliveries.records
					.filter(
						(delivery_record) =>
							(delivery_record.value.presentationRef as id.sifa.defs.ExternalRecordRef)?.uri ===
							talk.uri,
					)
					.map((delivery_record) => {
						return {
							event: delivery_record.value.eventName,
							date: delivery_record.value.date
								? new Date(delivery_record.value.date?.toString())
								: undefined,
							watch:
								(delivery_record.value.links as id.sifa.defs.PresentationLink[])?.find(
									(link) => link.type === 'id.sifa.defs#linkRecording',
								)?.uri ??
								(talk.value.links as id.sifa.defs.PresentationLink[])?.find(
									(link) => link.type === 'id.sifa.defs#linkRecording',
								)?.uri,
							slides:
								(delivery_record.value.links as id.sifa.defs.PresentationLink[])?.find(
									(link) => link.type === 'id.sifa.defs#linkSlides',
								)?.uri ??
								(talk.value.links as id.sifa.defs.PresentationLink[])?.find(
									(link) => link.type === 'id.sifa.defs#linkSlides',
								)?.uri,
						};
					})
					.toSorted((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)),
			};
		})
		.toSorted((a, b) => {
			const events_a = a.events[0]?.date ?? new Date(8640000000000000);
			const events_b = b.events[0]?.date ?? new Date(8640000000000000);
			return (events_b.getTime() ?? 0) - (events_a.getTime() ?? 0);
		});
	return refined_talks;
});
