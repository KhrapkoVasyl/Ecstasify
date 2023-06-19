import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { SubscriptionPlanEntity } from './subscription-plan.entity';
import { subscriptionPlansServiceErrorMessages } from './subscription-plans.constants';

@Injectable()
export class SubscriptionPlansService extends BaseService<SubscriptionPlanEntity> {
  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    subscriptionPlanEntityRepository: Repository<SubscriptionPlanEntity>,
  ) {
    super(
      subscriptionPlanEntityRepository,
      subscriptionPlansServiceErrorMessages,
    );
  }

  findAll(
    options: FindManyOptions<SubscriptionPlanEntity> = {
      loadEagerRelations: true,
    },
  ): Promise<SubscriptionPlanEntity[]> {
    if (options.loadEagerRelations && !options.relations) {
      Object.assign(options, {
        relations: { subscriptionFeatures: { feature: true } },
      });
    }

    return super.findAll(options);
  }

  findOne(
    conditions: FindOptionsWhere<SubscriptionPlanEntity>,
    options: FindOneOptions<SubscriptionPlanEntity> = {
      loadEagerRelations: true,
    },
  ): Promise<SubscriptionPlanEntity> {
    if (options.loadEagerRelations && !options.relations) {
      Object.assign(options, {
        relations: { subscriptionFeatures: { feature: true } },
      });
    }

    return super.findOne(conditions, options);
  }
}
