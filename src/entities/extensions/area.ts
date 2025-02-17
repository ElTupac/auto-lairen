import { Card } from "./card";

export abstract class Area {
  readonly name!: string;
  private _content: Card<unknown>[];

  constructor(content?: Card<unknown>[]) {
    this._content = (content || []).map((card) => {
      card.moveToArea(this);
      return card;
    });
  }

  get content() {
    return this._content;
  }

  shuffleContent() {
    const contentToSort = [...this._content];
    for (let i = contentToSort.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [contentToSort[i], contentToSort[j]] = [
        contentToSort[j],
        contentToSort[i],
      ];
    }
    this._content = contentToSort;
    return this._content;
  }

  protected getCardByIndex(index: number) {
    return this._content.slice(index, 1);
  }
  protected popCardByIndex(index: number) {
    return this._content.splice(index, 1);
  }
  protected addCardToTop(card: Card<unknown>) {
    card.moveToArea(this);
    this._content.unshift(card);
  }
  protected addCardToBottom(card: Card<unknown>) {
    card.moveToArea(this);
    this._content.push(card);
  }

  moveCardToThisArea(card: Card<unknown>, sendBottom?: boolean) {
    if (card.area) {
      const currentAreaCardIndex = card.area.content.findIndex(
        ({ id }) => id === card.id
      );
      if (currentAreaCardIndex !== -1)
        card.area.popCardByIndex(currentAreaCardIndex);
    }

    if (sendBottom) this.addCardToBottom(card);
    else this.addCardToTop(card);
  }
}
