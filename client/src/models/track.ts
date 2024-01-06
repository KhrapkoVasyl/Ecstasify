import { Author } from './author';

export interface Track {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  author: Author | null;
  authorId: string | null;
  genreId: string;
  genre: {
    id: string;
  };
  file: File;
  image: { src: string };
  coverImg: string;
}
