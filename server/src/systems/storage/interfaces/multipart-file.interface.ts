import { MultipartFile } from '@fastify/multipart';

export interface IMultipartFile extends Omit<MultipartFile, 'file'> {
  readonly data: Buffer;
}
