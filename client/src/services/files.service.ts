import BaseService from './base.service';

class FilesService extends BaseService {
  uploadFile = (data: FormData) => {
    return this.httpRequest.post<{ src: string }>(
      '/files',
      data,
      true,
      undefined,
      {
        contentType: 'multipart/form-data',
      }
    );
  };
}

export default FilesService;
