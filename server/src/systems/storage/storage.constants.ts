import { BlockBlobParallelUploadOptions } from '@azure/storage-blob';

export const STORAGE_ROOT_DIRECTORY = 'uploads';

export const STORAGE_DEFAULT_UPLOAD_OPTIONS: BlockBlobParallelUploadOptions = {
  blobHTTPHeaders: { blobContentType: 'application/octet-stream' },
};
