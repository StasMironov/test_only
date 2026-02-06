const documentOn = (eventName, selector, handler) => {
	document.addEventListener(
		eventName,
		(e) => {
			const clickTarget = e.target;
			if (
				clickTarget.matches(selector) ||
				clickTarget.closest(selector)
			) {
				handler(e);
			}
		},
		false
	);
	return handler;
};

export default documentOn;
