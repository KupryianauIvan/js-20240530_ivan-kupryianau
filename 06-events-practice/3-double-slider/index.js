export default class DoubleSlider {
  element;

  constructor({
    min = 0,
    max = 100,
    formatValue = value => value,
    selected: {
      from = min,
      to = max
    } = {}
  } = {}) {
    this.element = this.createElement(this.createTemplate());
    this.leftBoundary = this.element.querySelector('span[data-element="from"]');
    this.rightBoundary = this.element.querySelector('span[data-element="to"]');
    this.min = min;
    this.max = max;
    this.from = from;
    this.to = to;
    this.formatValue = formatValue;
    this.render();
    this.updateBoundary();
  }

// {
//   min: 100,
//   max: 200,
//   formatValue: value => '$' + value,
//   selected: {
//     from: 120,
//     to: 150
//   }

  createElement(template) {
    const element = document.createElement("div");
    element.classList.add("range-slider");
    element.innerHTML = template;

    return element;
  }

  createTemplate() {
    return `
       <span data-element="from">${this.formatValue(this.from)}</span>
        <div class="range-slider__inner">
          <span class="range-slider__progress"></span>
          <span class="range-slider__thumb-left"></span>
          <span class="range-slider__thumb-right"></span>
        </div>
       <span data-element="to">${this.formatValue(this.from)}</span>
    `;
  }

  updateBoundary() {
    if (this.leftBoundary) {
      this.leftBoundary.textContent = this.formatValue(this.from);
    }

    if (this.rightBoundary) {
      this.rightBoundary.textContent = this.formatValue(this.to);
    }
  }

  render() {
    if (!document.body.contains(this.element)) {
      document.body.append(this.element);
    }
  }

  destroy() {
    if (document.body.contains(this.element)) {
      this.element.remove();
    }
  }

}
