import gsap from 'gsap';
import Swiper from 'swiper/bundle';
import counter from '../../libs/counter';

interface EventItem {
  year: string;
  text: string;
}

export default {
  init() {
    if (!document.querySelector('[data-slider-history-wrap]') || !document.querySelector('[data-slider-events-wrap]')) return;
    
    const slidersWrapNode = document.querySelectorAll<HTMLElement>('[data-slider-history-wrap]');

    slidersWrapNode.forEach((slider) => {
      let sliderWrap = slider.querySelector<HTMLElement>('[data-slider-history]');
      let sliderEventWrap = slider.querySelector<HTMLElement>('[data-slider-events-wrap]');

      if (!sliderEventWrap) return;

      let sliderPag = slider.querySelector<HTMLElement>('[data-pag]');
      let sliderEvents = slider.querySelector<HTMLElement>('[data-slider-events]');

      let prev = slider.querySelector<HTMLElement>('[data-nav-arrow-prev]');
      let next = slider.querySelector<HTMLElement>('[data-nav-arrow-next]');
      let fraction = slider.querySelector<HTMLElement>('[data-slider-history-fraction]');

      let prevEv = sliderEventWrap.querySelector<HTMLElement>('[data-nav-arrow-prev]');
      let nextEv = sliderEventWrap.querySelector<HTMLElement>('[data-nav-arrow-next]');
      let fractionEv = sliderEventWrap.querySelector<HTMLElement>('[data-slider-events-fraction]');
    
      const containerEl = slider.querySelector<HTMLElement>('[data-pag]');
      const itemSize = 6;
      let thumbsRotation = 0;

      gsap.set(sliderEventWrap, { opacity: 1 });

      if (!sliderEvents || !sliderPag || !sliderWrap || !fraction || 
        !prev || !next || !prevEv || !nextEv || !fractionEv || !containerEl) {
        return;
      }

      const getContainerSize = (): number => containerEl.offsetWidth;

      const updateCircleRadius = () => {
        if (!pagSlide) return;

        const total = pagSlide.slides.length;
        const containerSize = getContainerSize();

        const baseRadius = (containerSize / 2) - (itemSize / 2);
        const adjustedRadius = Math.min(baseRadius, baseRadius * (10 / total));
        pagSlide.el.style.setProperty('--radius', `${adjustedRadius}px`);
      };

      const setCounterStartsFromPrevSlide = (swiper: Swiper) => {
        const activeSlideEl = swiper.slides[swiper.activeIndex];
        if (!activeSlideEl) return;

        const prevSlideEl = swiper.previousIndex != null ? swiper.slides[swiper.previousIndex] : null;

        const activeCounters = activeSlideEl.querySelectorAll('[data-counter]');
        if (!activeCounters.length) return;

        const prevCounters = prevSlideEl ? prevSlideEl.querySelectorAll('[data-counter]') : null;

        activeCounters.forEach((el, idx) => {
          const prevValRaw = prevCounters && prevCounters[idx] ? (prevCounters[idx].getAttribute('data-counter') || prevCounters[idx].textContent) : null;

          const prevVal = prevValRaw != null ? String(prevValRaw).replace(/\s+/g, '').replace(',', '.') : null;

          if (prevVal != null && prevVal !== '') {
            el.setAttribute('data-counter-start', prevVal);
          } else {
            const curRaw = el.getAttribute('data-counter') || el.textContent;
            const curVal = String(curRaw).replace(/\s+/g, '').replace(',', '.');
            el.setAttribute('data-counter-start', curVal);
          }
        });
      };

      const rotateThumbsToActive = (mainSwiper: any) => {
        const thumbs = pagSlide;
        if (!thumbs || !thumbs.el) return;

        const total = thumbs.slides.length;
        if (total < 2) return;

        const anglePerItem = 360 / total;
        let targetRotation = -60 - (anglePerItem * mainSwiper.realIndex);

        let delta = targetRotation - thumbsRotation;
        delta = ((delta + 180) % 360) - 180;

        if (mainSwiper.swipeDirection === 'next') {
          if (delta > 0) targetRotation -= 360;
        } else if (mainSwiper.swipeDirection === 'prev') {
          if (delta < 0) targetRotation += 360;
        }

        gsap.to(thumbs.el, {
          rotation: targetRotation,
          '--container-rotation': `${targetRotation}deg`,
          duration: 1.2,
          ease: 'power2.inOut',
        });

        thumbsRotation = targetRotation;
      };

      let eventsSlider = new Swiper(sliderEvents, {
          slidesPerView: 1.6,
          spaceBetween: 25,
          speed: 500,
          observer: true,
          observeParents: true,
          centeredSlides: false,
          navigation: {
            nextEl: nextEv,
            prevEl: prevEv,
          },
            breakpoints: {
              640: {
                  slidesPerView: 2.5,
                  spaceBetween: 30
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: 80
              }
          },
           pagination: {
            el: fractionEv,
            clickable: true,
            type: 'bullets'
          }
      });

      const pagSlide = new Swiper(sliderPag, {
        slidesPerView: 'auto',
        spaceBetween: 0,
        touchRatio: 0,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        allowTouchMove: false,
        slideToClickedSlide: true,
        on: {
          init(this: Swiper) {
            const containerSize = getContainerSize();
            const container = this.el;
            const total = this.slides.length;
            container.style.setProperty('--total', total.toString());

            const baseRadius = (containerSize / 2) - (itemSize / 2);
            const adjustedRadius = Math.min(baseRadius, baseRadius * (10 / total));
            container.style.setProperty('--radius', `${adjustedRadius}px`);

            this.slides.forEach((slide, i) => {
              (slide as HTMLElement).style.setProperty('--i', `${i}`);
            });
            gsap.set(container, { rotation: 0 });
            thumbsRotation = 0;
          },
          resize() {
            updateCircleRadius();
          },
        },
      });

      const sliderHistory = new Swiper(sliderWrap, {
        allowTouchMove: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        fadeEffect: { crossFade: true },
        effect: 'fade',
        observer: true,
        observeParents: true,
        pagination: {
          el: fraction,
          type: 'custom',
          renderCustom: function (swiper, current: number, total: number): string {
            const currentFormatted = String(current).padStart(2, '0');
            const totalFormatted = String(total).padStart(2, '0');
            return currentFormatted + ' / ' + totalFormatted;
          }
        },
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        thumbs: {
          swiper: pagSlide,
        },
        on: {
          init(this: Swiper) {
            rotateThumbsToActive(this);
          },
          slideChangeTransitionStart(this: Swiper) {
            gsap.to(sliderEventWrap, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            rotateThumbsToActive(this);
            setCounterStartsFromPrevSlide(this);
            const activeSlideEl = this.slides[this.activeIndex];
            if (activeSlideEl) counter.init(activeSlideEl as any);
          },
          slideChangeTransitionEnd() {
            updateEventsSlider().then(() => {
              gsap.to(sliderEventWrap, {
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: 'power2.inOut'
              });
            });
          },
          resize() {
            updateCircleRadius();
          },
        },
      });

      function updateEventsSlider(): Promise<void> {
        return new Promise((resolve) => {
          const activeSlide = sliderHistory.slides[sliderHistory.activeIndex] as HTMLElement;

          if (!activeSlide || !sliderEventWrap || !sliderEvents || !eventsSlider) {
            resolve();
            return;
          }

          let events: EventItem[] = [];

          try {
            const category = activeSlide.dataset.category;
            if (category && category !== 'undefined') {
              const categoryWrap = sliderEventWrap.querySelector('[data-slider-category]');
              if (categoryWrap) {
                categoryWrap.innerHTML = category;
              }
            }
          }
          catch(err) {
            console.log("Ошибка парсинга", err);
            resolve();
            return;
          }

          try {
            const data = activeSlide.dataset.events;
          
            if (data && data !== 'null' && data !== 'undefined') {
              events = JSON.parse(data);
            }
          } catch(err) {
            console.log("Ошибка парсинга", err);
            resolve();
            return;
          }
         
          if(!events || events.length == 0) {
            const wrapper = sliderEvents.querySelector('.swiper-wrapper');
            if(wrapper) wrapper.innerHTML = '';
            eventsSlider.update();
            resolve();
            return;
          }

          const wrapper = sliderEvents.querySelector('.swiper-wrapper');
          if(!wrapper) {
            resolve();
            return;
          }

          const slidesHTML = events.map(ev => `
            <div class="swiper-slide">
              <div class="card-event">
                <span class="card-event__year">${ev.year}</span>
                <span class="card-event__text">${ev.text}</span>
              </div>
            </div>
          `).join('');

          wrapper.innerHTML = slidesHTML;
          
          eventsSlider.update();
          eventsSlider.slideTo(0);
          resolve()
        });
      }

      sliderHistory.update();
      pagSlide.update();
      updateEventsSlider();
      

      window.addEventListener('resize', () => {
        updateEventsSlider();
      });
    });
  },
};