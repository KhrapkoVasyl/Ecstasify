import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(256)
  @ApiProperty({
    example: 'Number of playlists',
    required: true,
    nullable: false,
    minLength: 2,
    maxLength: 256,
  })
  public readonly name: string;
}
