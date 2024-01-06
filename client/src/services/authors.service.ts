import { Author } from '@/models/author';
import BaseService from './base.service';

class AuthorsService extends BaseService {
  getAllAuthors = (query: { name?: string }) => {
    return this.httpRequest.get<Author[]>('/authors', true, query);
  };

  createAuthor = (data: Author) => {
    const formData = new FormData();
    for (const key in data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formData.append(key, data[key]);
    }

    return this.httpRequest.post<Author>(
      '/authors',
      formData,
      true,
      undefined,
      {
        contentType: 'multipart/form-data',
      }
    );
  };

  updateAuthor = (authorId: Author['id'], data: Author) => {
    return this.httpRequest.patch<Author>(`/authors/${authorId}`, data);
  };

  deleteAuthor = (authorId: string) => {
    return this.httpRequest.delete<Author>(`/authors/${authorId}`);
  };
}

export default AuthorsService;
