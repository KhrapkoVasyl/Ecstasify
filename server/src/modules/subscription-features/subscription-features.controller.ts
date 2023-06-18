import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateSubscriptionFeatureDto,
  UpdateSubscriptionFeatureDto,
} from './dto';
import { SubscriptionFeaturesService } from './subscription-features.service';
import { SubscriptionFeatureEntity } from './subscription-feature.entity';
import { IdDto } from 'src/common/dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subscription-features')
@Controller('subscription-features')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscriptionFeaturesController {
  constructor(
    private readonly subscriptionFeaturesService: SubscriptionFeaturesService,
  ) {}

  @Get()
  findAll(): Promise<SubscriptionFeatureEntity[]> {
    return this.subscriptionFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<SubscriptionFeatureEntity> {
    return this.subscriptionFeaturesService.findOne(conditions);
  }

  @Post()
  createOne(
    @Body() createEntityDto: CreateSubscriptionFeatureDto,
  ): Promise<SubscriptionFeatureEntity> {
    const model = plainToInstance(SubscriptionFeatureEntity, createEntityDto);

    return this.subscriptionFeaturesService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateSubscriptionFeatureDto,
  ): Promise<SubscriptionFeatureEntity> {
    const model = plainToInstance(SubscriptionFeatureEntity, updateEntityDto);

    return this.subscriptionFeaturesService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<SubscriptionFeatureEntity> {
    return this.subscriptionFeaturesService.deleteOne(conditions);
  }
}
