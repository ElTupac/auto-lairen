export abstract class Area<T> {
  readonly name!: string;
  private _content: T[];

  constructor(content: T[]) {
    this._content = content;
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
}
