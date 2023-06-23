import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID()
  @ApiProperty({ type: String })
  public readonly id: string;
}
