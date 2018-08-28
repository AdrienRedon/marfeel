import { number } from '../utils/decorators.js';

export class Chart extends HTMLElement {

  get dataType() {
    if (!this.hasAttribute('data-type')) {
      throw new Error('You must define a type for the chart');
    }
    return this.attributes.getNamedItem('data-type').value;
  }

  get dataSuffix() {
    return this.hasAttribute('data-suffix')
      ? this.attributes.getNamedItem('data-suffix').value
      : '';
  }

  getProgressCircle(value) {
    const radius = 195;
    const circumference = 2 * Math.PI * radius;
    const progress = value / 100;
    const dashoffset = circumference * (1 - progress);
    return {
      dashoffset,
      circumference,
    };
  }

  connectedCallback() {
    this.initData().then((data) => {
      const total = data.tablet.value + data.smartphone.value;
      const tabletPercent = total > 0
        ? (data.tablet.value / total * 100)
        : 0;
      const smartphonePercent = total > 0
        ? (data.smartphone.value / total * 100)
        : 0;
      this.innerHTML = `
        <div class="chart">
          <div class="chart--circle">
            <svg class="chart--circle__graph" viewBox="0 0 400 400">
              <circle class="chart--circle__meter" cx="-200" cy="200" r="195" stroke-width="10" fill="none" style="stroke: ${data.tablet.color}" />
              <circle class="chart--circle__value" cx="-200" cy="200" r="195" stroke-width="10" fill="none" style="stroke: ${data.smartphone.color}; stroke-dashoffset: ${this.getProgressCircle(smartphonePercent).dashoffset}; stroke-dasharray: ${this.getProgressCircle(smartphonePercent).circumference}" />
            </svg>
          </div>
          <app-variation-curve class="chart--variation" color="${data.tablet.color}" ${data.variation === 'decrease' ? 'inverted' : ''}></app-variation-curve>
          <p class="chart--title">${this.dataType}</p>
          <p class="chart--total">${number(total) + this.dataSuffix}</p>
        </div>
        <div class="details">
          <div class="details--tablet">
            <p style="color: ${data.tablet.color}">Tablet</p>
            <p>${tabletPercent.toFixed(0)}% <span class="details--value">${number(data.tablet.value) + this.dataSuffix}</span></p>
          </div>
          <div class="details--smartphone">
            <p style="color: ${data.smartphone.color}">Smartphone</p>
            <p>${smartphonePercent.toFixed(0)}% <span class="details--value">${number(data.smartphone.value) + this.dataSuffix}</span></p>
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
