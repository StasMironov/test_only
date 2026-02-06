const sliderInit = (data) => {
	if (data.$el.attr('data-fade-slides') !== null) {
		const count = data.$el.attr('data-visible-count') || data.slides.length;

		let start = false;
		let delay = 0;
		let index = 0;
		for (let i = 0; i < data.slides.length; i++) {
			const slide = data.slides[i];
			if (!slide.classList.contains('swiper-slide-prev') && !start)
				continue;
			if (slide.classList.contains('swiper-slide-prev') && !start) {
				start = true;
			}
			if (start) {
				if (index++ >= count) break;
				slide.setAttribute('data-fade-in-up', '');
				slide.setAttribute('data-animate', '');
				slide.setAttribute('data-delay', delay);
				delay += 0.2;
			}
		}
		window.dispatchEvent(new CustomEvent('animate:fade'));
	}
};

export default sliderInit;
