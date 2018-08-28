export class VariationCurve extends HTMLElement {

  get isInverted() {
    return this.hasAttribute('inverted');
  }

  get color() {
    if (!this.hasAttribute('color')) {
      throw new Error('You must define a color');
    }
    return this.attributes.getNamedItem('color').value;
  }

  connectedCallback() {
    this.innerHTML = `
    <svg width="195" height="195" viewBox="0 0 195 195" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path ${this.isInverted ? 'transform="scale(-1,1) translate(-195, 0)"' : ''} d="M22 153.06L48.5 139.904H75.5L104.5 132.313H130L153 119.663H174.5L191 106C172.696 163.059 154.458 176.053 104.5 190C63.7841 184.217 46.5783 180.223 22 153.06Z" fill="${this.color}" opacity=".25" />
      <path ${this.isInverted ? 'transform="scale(-1,1) translate(-195, 0)"' : ''} d="M22 153L48.5 140H75.5L104 132.5H130L153 120H174.5L190.5 107" stroke="${this.color}"/>
    </svg>
    `;
  }

}
