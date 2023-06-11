import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlanEntity } from '../subscription-plans/subscription-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlanEntity])],
})
export class SubscriptionPlansModule {}
