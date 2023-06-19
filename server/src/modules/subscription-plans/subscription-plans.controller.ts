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
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionPlanEntity } from './subscription-plan.entity';
import { IdDto } from 'src/common/dto';
import { plainToInstance } from 'class-transformer';
import { CreateSubscriptionPlanDto, UpdateSubscriptionPlanDto } from './dto';

@ApiTags('subscription-plans')
@Controller('subscription-plans')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscriptionPlansController {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService,
  ) {}

  @Get()
  findAll(): Promise<SubscriptionPlanEntity[]> {
    return this.subscriptionPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<SubscriptionPlanEntity> {
    return this.subscriptionPlansService.findOne(conditions);
  }

  @Post()
  createOne(
    @Body() createEntityDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanEntity> {
    const model = plainToInstance(SubscriptionPlanEntity, createEntityDto);

    return this.subscriptionPlansService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateSubscriptionPlanDto,
  ) {
    const model = plainToInstance(SubscriptionPlanEntity, updateEntityDto);

    return this.subscriptionPlansService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto) {
    return this.subscriptionPlansService.deleteOne(conditions);
  }
}
