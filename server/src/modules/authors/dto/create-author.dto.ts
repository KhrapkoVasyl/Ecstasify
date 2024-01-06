import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateFileDto } from 'src/modules/files/dto';

export class CreateAuthorDto extends CreateFileDto {
  @IsNotEmpty()
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
  public readonly name: string;
}
