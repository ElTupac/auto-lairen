export abstract class Area<T> {
  readonly name!: string;
  private content: T[];

  getContent: () => T[];
}
