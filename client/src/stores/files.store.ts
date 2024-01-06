import { RootService } from '@/services';
import { makeAutoObservable } from 'mobx';

class FilesStore {
  uploadFileLoading = false;

  constructor(private rootService: RootService) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async uploadFile(data: FormData) {
    this.uploadFileLoading = true;

    const res = await this.rootService.filesService.uploadFile(data);

    this.uploadFileLoading = false;

    if (res) {
      return res.src;
    }
  }
}

export { FilesStore };
