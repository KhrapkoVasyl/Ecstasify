import {
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

import { CreateFileDto } from 'src/modules/files/dto';
import { ErrorMessagesEnum } from '../enums';

/**
 * [description]
 */
@Injectable()
export class FileMimetypeValidationPipe implements PipeTransform {
  constructor(private readonly allowedTypes: string[]) {}

  /**
   * [description]
   * @param value
   */
  transform(value: CreateFileDto) {
    if (!this.allowedTypes.includes(value.file.mimetype))
      throw new UnsupportedMediaTypeException(
        ErrorMessagesEnum.FILE_UNSUPPORTED_TYPE,
      );
    return value;
  }
}
