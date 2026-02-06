import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

window._disableScroll = () => {
	const scrollY = window.pageYOffset;
	const { body } = document;
	body.classList.add('js-locked');
	body.style.position = 'fixed';
	body.style.top = `-${scrollY}px`;
	body.style.width = '100%';
};

window._enableScroll = () => {
	const { body } = document;
	const scrollY = body.style.top;
	body.style.position = '';
	body.style.top = '';
	body.classList.remove('js-locked');
	window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
};
