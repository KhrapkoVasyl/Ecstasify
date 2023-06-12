import { Module } from '@nestjs/common';
import { FeatureEntity } from './feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureEntity])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
