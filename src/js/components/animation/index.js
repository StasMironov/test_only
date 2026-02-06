import gsap from 'gsap';
import { isDesktop, isTablet } from '../../utils/breakpoints';

const Animate = {
	fadeInUp() {
		const items = document.querySelectorAll('[data-fade-in-up]');
		if (!items.length) return;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.classList.contains('animate')) continue;
			const delay = item.getAttribute('data-delay') || 0.1;
			const offset = item.getAttribute('data-offset') || 40;
			const duration = item.getAttribute('data-duration') || 1;
			const delayInnerItems = item.querySelectorAll('[style*= "--"]');

			const timeline = gsap.timeline({
				paused: true,
			});

			timeline.fromTo(
				item,
				{
					translateY: offset,
					opacity: 0,
				},
				{
					translateY: 0,
					opacity: 1,
					duration,
					ease: 'power4.out',
					delay,
					onComplete: () => {
						if (delayInnerItems && delayInnerItems.length > 0) {
							delayInnerItems.forEach((item) => {
								item.style.transitionDelay = '0s';
								item.style.transitionDuration = '0.5s';
							});
						}
					},
				}
			);

			item.addEventListener('sal:in', () => {
				timeline.play();
			});
		}
	},

	init() {
		this.fadeInUp();
	},
};

window.addEventListener('animate:fade', () => {
	Animate.fadeInUp();
});

export default Animate;
