import { ApiProperty } from '@nestjs/swagger';
import { ILike } from 'typeorm';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class FindAllTracksOptionsDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @ApiProperty({
    example: 'In the end',
    required: false,
    nullable: true,
    minLength: 1,
    maxLength: 32,
  })
  public readonly name?: string;

  get searchName() {
    return this.name ? ILike(`%${this.name}%`) : undefined;
  }
}
