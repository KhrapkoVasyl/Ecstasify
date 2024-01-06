import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IdDto } from 'src/common/dto';

export class CreateTrackDto {
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

  @IsObject()
  @ValidateNested()
  @ApiProperty({
    type: IdDto,
    example: { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
    required: true,
    nullable: false,
  })
  public readonly genre: IdDto;

  // @IsObject()
  // @ValidateNested()
  // @ApiProperty({
  //   type: IdDto,
  //   example: { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
  //   required: true,
  //   nullable: false,
  // })
  // public readonly file: IdDto;
}
