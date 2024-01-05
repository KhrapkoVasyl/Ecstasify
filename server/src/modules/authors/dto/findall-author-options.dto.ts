import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class FindAllAuthorOptionsDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @ApiProperty({
    example: 'Linkin Park',
    required: true,
    nullable: false,
    minLength: 1,
    maxLength: 32,
  })
  public readonly name?: string;
}
