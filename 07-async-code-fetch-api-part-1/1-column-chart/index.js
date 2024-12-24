import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {
  fetchParams;
  data;

  constructor({
    url = "",
    range = {
      from: "",
      to: "",
    },
    label,
    value = 0,
    formatHeading = (value) => value
  } = {}) {
    super({
      data: [],
      label,
      value: value || 0,
      link: '',
      formatHeading
    });

    this.url = url;
    this.range = range;

    this.loadOrdersButton = document.getElementById('loadOrders');
    this.startDateInput = document.getElementById('start');
    this.endDateInput = document.getElementById('end');

    this.fetchParams = {
      from: new Date(this.startDateInput.value),
      to: new Date(this.endDateInput.value)
    };

    this.initialize();
  }

  update(start = this.fetchParams.from, end = this.fetchParams.to, newData = []) {
    super.update(newData);
    this.startDateInput.value = start.toISOString().split('T')[0];
    this.endDateInput.value = end.toISOString().split('T')[0];

    this.value = this.transformData(this.data)
      .reduce((acc, val) => acc + val, 0);
  }

  async getOrders(data) {
    const response = await fetchJson(`${BACKEND_URL}/${this.url}`, data);
    console.log(response);
    return response;
  }

  async loadData() {
    try {
      this.data = await this.getOrders(this.fetchParams);
      this.update(this.fetchParams.from, this.fetchParams.to, this.transformData(this.data));
      console.log(this.transformData(this.data));
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`);
    }
  }

  transformData(data) {
    return Object.values(data).map(value => parseInt(String(value), 10));
  }

  initialize() {
    this.loadOrdersButton.addEventListener('click', this.loadData.bind(this));
  }
}
