import { redirect } from '@sveltejs/kit';
import { getAccessToken, getUserSub } from '../../shared/access_token/access.token.helper';
import type { PageLoad } from './$types';
import { MAIN } from '../../shared/routes';
import { PUBLIC_USER_ACTION_BASE_URL } from '$env/static/public';
import type { Client } from '../../shared/access_token/types';

export const load = (async ({ fetch }): Promise<Client> => {
	const accessToken = getAccessToken();

	if (!accessToken) {
		throw redirect(303, MAIN);
	}

	const sub = getUserSub(accessToken);

	const response = await fetch(`${PUBLIC_USER_ACTION_BASE_URL}employees/${sub}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return await response.json();
}) satisfies PageLoad;
