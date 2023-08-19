import configData from '../../../../config.json';

async function resolve(promise) {
	const resolved = {
		data: null,
		error: null,
	};

	try {
		resolved.data = await promise;
	} catch (e) {
		resolved.error = e;
	}
	return resolved;
}

export default function fetcher(url, data = undefined) {
	return resolve(
		fetch(`${configData.REACT_APP_SERVER_URL}${url}`, {
			method: data ? 'POST' : 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.status > 399 || res.status < 200) {
				throw new Error();
			}
			return res.json();
		})
	);
}
