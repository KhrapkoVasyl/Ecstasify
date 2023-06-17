import { Module } from '@nestjs/common';
import { SubscriptionPlanEntity } from './subscription-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { SubscriptionPlansService } from './subscription-plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlanEntity])],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
