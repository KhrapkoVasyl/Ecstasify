import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeatureEntity } from '../features/feature.entity';
import { SubscriptionPlanEntity } from '../subscription-plans/subscription-plan.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subscription-features')
export class SubscriptionFeatureEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  @JoinColumn()
  @ManyToOne(() => SubscriptionPlanEntity, {
    onDelete: 'CASCADE',
    eager: false,
  })
  public subscriptionPlan: SubscriptionPlanEntity;

  @ApiProperty()
  @JoinColumn()
  @ManyToOne(() => FeatureEntity, {
    onDelete: 'CASCADE',
    eager: false,
  })
  public feature: FeatureEntity;

  @ApiProperty({ type: 'numeric', required: true, example: 12.55 })
  @Column({ type: 'numeric', scale: 2, precision: 9 })
  public readonly value: number;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({
    readonly: true,
  })
  public readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({
    readonly: true,
  })
  public readonly updatedAt: Date;
}
