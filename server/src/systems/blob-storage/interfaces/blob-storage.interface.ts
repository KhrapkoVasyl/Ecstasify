export interface IBlobStorage {
  putContent(fileName: string): Promise<void>;
  containsFileByName(fileName: string): Promise<boolean>;

  findByFilm(filmId: string): Promise<string[]>;
}
