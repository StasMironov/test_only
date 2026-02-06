export default function getAjaxHtml(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => {
				if (!res.ok) {
					if (res.status === 404) {
						throw new Error('Not Found');
					} else {
						throw new Error('Some error');
					}
				}
				resolve(res.text());
			})
			.catch((err) => {
				reject(err);
			});
	});
}
