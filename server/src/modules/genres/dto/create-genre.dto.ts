import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({
    uniqueItems: true,
    example: 'phonk',
    required: true,
    nullable: false,
    minLength: 2,
    maxLength: 32,
  })
  public readonly name: string;
}
