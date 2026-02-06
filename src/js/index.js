import './polyfills';

import libs from './libs';

import Sliders from './components/sliders';
import Animation from './components/animation';


import {devices} from './utils/breakpoints';


window.breakpoints = devices;
__webpack_public_path__ = window.__webpack_public_path__ || '';

window.$ = $;
window.jQuery = $;
window.breakpoints = devices;


document.addEventListener('DOMContentLoaded', () => {
	libs.init();
	Animation.init();

	document.body.classList.add('content-loaded');

	const setVH = () => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	};
	
	window.addEventListener('resize', setVH, { passive: true });
	setVH();
});

document.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('init.sliders', () => {
		Sliders.init();
	});

	window.dispatchEvent(new CustomEvent('init.sliders'));
});