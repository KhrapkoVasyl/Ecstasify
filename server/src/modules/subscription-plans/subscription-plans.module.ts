import { Module } from '@nestjs/common';
import { SubscriptionPlanEntity } from './subscription-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlanEntity])],
})
export class SubscriptionPlansModule {}
