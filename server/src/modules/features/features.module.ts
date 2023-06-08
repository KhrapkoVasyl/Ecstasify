import { Module } from '@nestjs/common';
import { FeatureEntity } from './feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureEntity])],
})
export class FeaturesModule {}
