import Swiper from 'swiper/swiper-bundle';
import fixObjectFit from '../../utils/fixObjectFit';

export default class Slider {
	constructor(props) {
		this.init = props.init;
		this.wrap = props.wrap;
		this.slider = props.slider;
		this.prev = props.prev;
		this.next = props.next;
		this.count = props.count;
		this.disabledClass = props.disabledClass || 'disabled';
		this.options = props.options;
		this.events = props.events;
		this.paginationSelector = props.paginationSelector;

		this.render();
	}

	render() {
		if (!this.init) {
			return;
		}
		const wraps = document.querySelectorAll(this.wrap);

		for (let i = 0; i < wraps.length; i += 1) {
			const wrap = wraps[i];
			const sliderSelector = wrap.querySelector(this.slider);

			if (!sliderSelector) return;

			const prev = wrap.querySelector(this.prev);
			const next = wrap.querySelector(this.next);

			if (prev && next) {
				this.options.navigation = {
					prevEl: prev,
					nextEl: next,
					disabledClass: this.disabledClass,
				};
			} else {
				this.options.navigation = {
					prevEl: null,
					nextEl: null,
				};
			}

			if (this.paginationSelector) {
				if (this.options.pagination) {
					this.options.pagination.el = wrap.querySelector(
						this.paginationSelector
					);
				}
			}

			if (this.options.lazy) {
				this.options.on = this.options.on || {};

				this.options.on.lazyImageReady = (swiper, slideEl, imageEl) => {
					fixObjectFit(imageEl);
				};
			}

			this.swiper = new Swiper(sliderSelector, this.options);
		}
	}

	update() {
		this.swiper.update();
	}
}
