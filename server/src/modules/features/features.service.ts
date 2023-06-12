import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { featuresServiceErrorMessages } from './features.constants';
import { FeatureEntity } from './feature.entity';

@Injectable()
export class FeaturesService extends BaseService<FeatureEntity> {
  constructor(
    @InjectRepository(FeatureEntity)
    featureEntityRepository: Repository<FeatureEntity>,
  ) {
    super(featureEntityRepository, featuresServiceErrorMessages);
  }
}
