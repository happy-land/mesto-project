export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод, который отвечает за отрисовку всех карточек
  renderItems(cardsData) {
    // console.log(`cardsData = ${cardsData}`);
    cardsData.forEach(item => {
      // console.log(`renderItems: item = ${item}`);
      this._renderer(item);
    });
  }

  addItem(element) {
    // console.log(`addItem(): ${this._container}.append element = ${element}`);
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

}