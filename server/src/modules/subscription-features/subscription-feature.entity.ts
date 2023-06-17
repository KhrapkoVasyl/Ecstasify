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
import { CommonEntity } from 'src/common/entities';
import { Transform } from 'class-transformer';

@Entity('subscription-features')
export class SubscriptionFeatureEntity extends CommonEntity {
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
  @Column({ type: 'numeric', scale: 2, precision: 9, nullable: false })
  @Transform(({ value }) => parseFloat(value))
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
