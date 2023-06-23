import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionFeatureEntity } from './subscription-feature.entity';
import { SubscriptionFeaturesController } from './subscription-features.controller';
import { SubscriptionFeaturesService } from './subscription-features.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionFeatureEntity])],
  controllers: [SubscriptionFeaturesController],
  providers: [SubscriptionFeaturesService],
  exports: [SubscriptionFeaturesService],
})
export class SubscriptionFeaturesModule {}
