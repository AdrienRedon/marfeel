import { number } from '../utils/decorators.js';

export default class extends HTMLElement {

  get dataType () {
    if (!this.hasAttribute('data-type')) {
      throw new Error('You must define a type for the chart');
    }
    return this.attributes.getNamedItem('data-type').value;
  }

  get dataSuffix () {
    return this.hasAttribute('data-suffix')
      ? this.attributes.getNamedItem('data-suffix').value
      : '';
  }

  connectedCallback() {
    this.initData().then((data) => {
      this.innerHTML = `
        <div class="chart">
          <p class="chart-title">${this.dataType}</p>
          <p class="chart-total">${number(data.tablet.value + data.smartphone.value) + this.dataSuffix}</p>
        </div>
        <div class="details">
          <div class="tablet">
            <p style="color: ${data.tablet.color}">Tablet</p>
            <p>${number(data.tablet.value) + this.dataSuffix}</p>
          </div>
          <div class="smartphone">
            <p style="color: ${data.smartphone.color}">Smartphone</p>
            <p>${number(data.smartphone.value) + this.dataSuffix}</p>
          </div>
        </div>
      `;
    });
  }

  initData() {
    return fetch(`./data/${this.dataType}.json`)
      .then(response => response.json())
  }

}
