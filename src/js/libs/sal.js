import sal from 'sal.js';

export default {
	init() {
		window.sal = sal;

		const animation = sal({
			threshold: 0.05,
			once: true,
			selector: '[data-animate], [data-counter], [data-animate-custom]',
			animateClassName: 'animate',
			disabledClassName: 'animate-disabled',
			rootMargin: '50px',
		});

		let fadeInUpRepeat = sal({
			threshold: 0.05,
			animateClassName: 'animate',
			once: false,
			selector: '[data-fade-in-up-repeat]',
			rootMargin: '0px',
		});

		let fadeInUp = sal({
			threshold: 0.05,
			once: true,
			animateClassName: 'animate',
			selector: '[data-fade-in-up]',
			rootMargin: '0px',
		});
		

		document.documentElement.classList.remove('animate-disabled');
		document.documentElement.classList.add('sal-init');

		window.addEventListener('animate:fade', () => {
			fadeInUp = sal({
				threshold: 0.05,
				once: true,
				selector: '[data-fade-in-up]',
				rootMargin: '0px',
			});
		});
	},
};
