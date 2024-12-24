export default class DoubleSlider {
  element;
  isDragging = false;
  startX = 0;
  currentX = 0;


  constructor({
    min = 0,
    max = 100,
    formatValue = value => '$' + value,
    selected: {
      from = min,
      to = max
    } = {}
  } = {}) {
    this.min = min;
    this.max = max;
    this.from = from;
    this.to = to;
    this.formatValue = formatValue;
    this.element = this.createElement(this.createTemplate());
    this.initEventListeners();
    this.render();
    this.leftBoundary = this.element.querySelector('span[data-element="from"]');
    this.rightBoundary = this.element.querySelector('span[data-element="to"]');
  }

  render() {
    if (!document.body.contains(this.element)) {
      document.body.append(this.element);
    }

    const rangeSlider = document.querySelector('.range-slider');
    rangeSlider.style.width = `${this.from + this.to}px`;
  }

  createElement(template) {
    const element = document.createElement("div");
    element.classList.add("range-slider");
    element.innerHTML = template;

    return element;
  }


  initEventListeners() {
    const thumb = this.element.querySelector('.range-slider__thumb-left');

    thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));
    thumb.addEventListener('pointermove', this.onPointerMove.bind(this));
    thumb.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  onPointerDown(event) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onPointerMove(event) {
    if (!this.isDragging) {
      return;
    }

    const deltaX = event.clientX - this.startX;

    this.currentX += deltaX;
    this.startX = event.clientX;

    if (this.element) {
      const boundingRect = this.element.getBoundingClientRect();

      const thumb = this.element.querySelector('.range-slider__thumb-left');
      const thumbWidth = thumb.offsetWidth;

      this.currentX = Math.max(0, Math.min(this.currentX, boundingRect.width - thumbWidth));

      thumb.style.transform = `translateX(${this.currentX}px)`;
      thumb.style.zIndex = '9999';
      console.log(event.clientX);

      const rangeSelectEvent = new CustomEvent('range-select', {
        detail: {
          clientX: this.currentX
        },
        bubbles: true
      });

      this.element.dispatchEvent(rangeSelectEvent);

      this.updateFrom();

      // this.leftBoundary.textContent = this.formatValue(Math.round(this.from + this.currentX));
    }
  }

  updateFrom() {
    const rangeWidth = this.element.querySelector('.range-slider__thumb-left').offsetWidth;
    this.from = Math.round(this.min + (this.currentX / rangeWidth) * (this.max - this.min));
    this.updateBoundary();
  }

  updateBoundary() {
    if (this.leftBoundary) {
      this.leftBoundary.textContent = this.formatValue(this.from);
    }
  }

  onPointerUp() {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
  }


  createTemplate() {
    return `
       <span data-element="from">${this.formatValue(this.from)}</span>
        <div class="range-slider__inner">
          <span class="range-slider__progress"></span>
          <span class="range-slider__thumb-left"></span>
          <span class="range-slider__thumb-right"></span>
        </div>
       <span data-element="to">${this.formatValue(this.to)}</span>
    `;
  }

  destroy() {
    if (document.body.contains(this.element)) {
      this.element.remove();
    }
  }
}
