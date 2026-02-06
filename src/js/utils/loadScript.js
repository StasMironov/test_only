export default async (src) =>
	new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.setAttribute('src', src);
		document.body.appendChild(script);

		script.onload = resolve;
		script.onerror = reject;
	});
