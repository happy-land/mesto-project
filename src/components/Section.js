export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cardsData) {
    cardsData.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, position = 'end') {
    switch (position) {
      case 'end':
        this._container.append(element);
        break;
      case 'start':
        this._container.prepend(element);
        break;
    }
  }

  clear() {
    this._container.innerHTML = '';
  }

}