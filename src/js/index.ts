import './polyfills';
import libs from './libs';
import Sliders from './components/sliders';
import Animation from './components/animation';

document.addEventListener('DOMContentLoaded', () => {
	libs.init();
	Animation.init();

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