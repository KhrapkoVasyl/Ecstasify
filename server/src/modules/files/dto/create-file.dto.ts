import { PayloadTooLargeException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';
import { ErrorMessagesEnum } from 'src/common/enums';
import { IMultipartFile } from 'src/systems/storage/interfaces';

export class CreateFileDto {
  @IsNotEmpty()
  @IsObject()
  @Transform(({ value: [file] }) => {
    if (file.limit) {
      throw new PayloadTooLargeException(ErrorMessagesEnum.FILE_TOO_LARGE);
    }
    return file;
  })
  @ApiProperty({
    required: true,
    format: 'binary',
    type: String,
  })
  public readonly file: IMultipartFile;
}
