import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IdDto } from 'src/common/dto';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @ApiProperty({
    example: 'Music for study',
    required: true,
    nullable: false,
    minLength: 1,
    maxLength: 32,
  })
  public readonly name: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @ApiProperty({
    type: IdDto,
    required: false,
    nullable: true,
    example: { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
  })
  public readonly user: IdDto;
}
