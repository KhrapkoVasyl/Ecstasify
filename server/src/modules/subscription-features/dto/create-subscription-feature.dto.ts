import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { IdDto } from 'src/common/dto';

export class CreateSubscriptionFeatureDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @ApiProperty({ type: IdDto, required: true, nullable: false })
  public readonly subscriptionPlan: IdDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @ApiProperty({ type: IdDto, required: true, nullable: false })
  public readonly feature: IdDto;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 15,
  })
  public readonly value: number;
}
