export default class NotificationMessage {
  element;
  timerId;
  static currentShownComponentLink;

  constructor(message, {
    type = 'success',
    duration = '1000'
  } = {}) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplate() {
    return (`
    <div class="${this.handleTypeCSS()}" style="--value:${this.getSeconds()}">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`);
  }

  handleTypeCSS() {
    return this.type === 'success' ? 'notification success' : 'notification error';
  }

  getSeconds() {
    return `${((this.duration % 60000) / 1000).toFixed(0)}s`;
  }

  show(container = document.body) {
    if (NotificationMessage.currentShownComponentLink) {
      NotificationMessage.currentShownComponentLink.destroy();
    }

    NotificationMessage.currentShownComponentLink = this;

    container.append(this.element);
    this.timerId = setTimeout(() => {
      this.destroy();
    }, +this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }
}
