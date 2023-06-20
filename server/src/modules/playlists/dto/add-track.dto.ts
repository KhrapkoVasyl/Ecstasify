import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    nullable: false,
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  public readonly trackId: string;
}
