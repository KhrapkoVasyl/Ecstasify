import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubscriptionPlanEntity } from '../subscription-plans/subscription-plan.entity';

@Entity({ name: 'features' })
export class FeatureEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ManyToMany(
    () => SubscriptionPlanEntity,
    (subscriptionPlan) => subscriptionPlan.features,
  )
  subscriptionPlans: SubscriptionPlanEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
