import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSubscriptionPlanDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({
    example: 'Premium',
    required: true,
    nullable: false,
    uniqueItems: true,
    minLength: 2,
    maxLength: 32,
  })
  public readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({
    example: 5.25,
    required: true,
    nullable: false,
    minimum: 0,
    maximum: 100,
  })
  public readonly price: number;
}
