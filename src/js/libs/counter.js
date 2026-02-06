import { CountUp } from 'countup.js';

export default {
  init(root = document) {
    const elements = root.querySelectorAll('[data-counter]');
    if (!elements.length) return;

    elements.forEach((element) => {
      const initValue = element.getAttribute('data-counter') || element.textContent;
      const endValue = Number(String(initValue).replace(/\s+/g, '').replace(',', '.'));
      const startAttr = element.getAttribute('data-counter-start');
      const startVal = startAttr != null ? Number(startAttr) : 0;

      this.setMinWidth(element);

      const options = {
        startVal,
        separator: element.hasAttribute('data-counter-nospace') ? '' : '',
        decimal: '.',
        decimalPlaces: 0,
        duration: 1.2,
      };

      const count = new CountUp(element, endValue, options);
      count.start();
    });
  },

  setMinWidth(el) {
    const width = el.scrollWidth;
    const fz = parseInt(
      window.getComputedStyle(document.documentElement).getPropertyValue('font-size'),
      10
    );
    el.style.minWidth = `${(width / fz).toFixed(1)}rem`;
  },
};
