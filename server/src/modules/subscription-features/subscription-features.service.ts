import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { subscriptionFeaturesServiceErrorMessages } from './subscription-features.constants';
import { SubscriptionFeatureEntity } from './subscription-feature.entity';

@Injectable()
export class SubscriptionFeaturesService extends BaseService<SubscriptionFeatureEntity> {
  constructor(
    @InjectRepository(SubscriptionFeatureEntity)
    subscriptionFeatureEntityRepository: Repository<SubscriptionFeatureEntity>,
  ) {
    super(
      subscriptionFeatureEntityRepository,
      subscriptionFeaturesServiceErrorMessages,
    );
  }

  findAll(
    options: FindManyOptions<SubscriptionFeatureEntity> = {
      loadEagerRelations: true,
    },
  ): Promise<SubscriptionFeatureEntity[]> {
    if (options.loadEagerRelations && !options.relations) {
      Object.assign(options, {
        relations: { subscriptionPlan: true, feature: true },
      });
    }

    return super.findAll(options);
  }

  findOne(
    conditions: FindOptionsWhere<SubscriptionFeatureEntity>,
    options: FindOneOptions<SubscriptionFeatureEntity> = {
      loadEagerRelations: true,
    },
  ): Promise<SubscriptionFeatureEntity> {
    if (options.loadEagerRelations && !options.relations) {
      Object.assign(options, {
        relations: { subscriptionPlan: true, feature: true },
      });
    }

    return super.findOne(conditions, options);
  }
}
