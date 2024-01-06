import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateFileDto } from 'src/modules/files/dto';

export class CreateTrackDto extends PartialType(CreateFileDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @ApiProperty({
    example: 'In the end',
    required: true,
    nullable: false,
    minLength: 1,
    maxLength: 32,
  })
  public readonly name: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  public readonly authorId?: string;

  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    required: true,
    nullable: false,
  })
  public readonly genreId: string;
}
