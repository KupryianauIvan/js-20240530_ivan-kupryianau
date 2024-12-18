class Tooltip {
  static instance;

  element;

<<<<<<< HEAD
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

=======
>>>>>>> 25c2ba31e687f6a6e25ad302a5368ef579a39ae4
  onPointerOver = event => {
    const element = event.target.closest('[data-tooltip]');

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  };

  onPointerMove = event => {
    this.moveTooltip(event);
  };

<<<<<<< HEAD
  moveTooltip(event) {
    const shift = 10;
    const left = event.clientX + shift;
    const top = event.clientY + shift;

    // TODO: Add logic for window borders

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

=======
>>>>>>> 25c2ba31e687f6a6e25ad302a5368ef579a39ae4
  onPointerOut = () => {
    this.remove();
  };

<<<<<<< HEAD
=======
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

>>>>>>> 25c2ba31e687f6a6e25ad302a5368ef579a39ae4
  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  render(html) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = html;

    document.body.append(this.element);
  }

<<<<<<< HEAD
=======
  moveTooltip(event) {
    const shift = 10;
    const left = event.clientX + shift;
    const top = event.clientY + shift;

    // TODO: Add logic for window borders

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

>>>>>>> 25c2ba31e687f6a6e25ad302a5368ef579a39ae4
  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
