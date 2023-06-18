import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class UpdateSubscriptionFeatureDto {
  @ValidateIf(({ value }) => value !== undefined)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
    nullable: false,
    example: 15,
  })
  public readonly value: number;
}
