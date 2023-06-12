import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SubscriptionFeatureEntity } from '../subscription-features/subscription-feature.entity';

@Entity('subscription-plans')
export class SubscriptionPlanEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty({
    type: 'string',
    uniqueItems: true,
    example: 'Premium',
    required: true,
  })
  @Column({ type: 'varchar', length: 32, unique: true })
  public readonly name: string;

  @ApiProperty({ type: 'numeric', required: true, example: 5.25 })
  @Column({ type: 'numeric', scale: 2, precision: 9 })
  public readonly price: number;

  @ApiHideProperty()
  @OneToMany(
    () => SubscriptionFeatureEntity,
    ({ subscriptionPlan }) => subscriptionPlan,
    {
      onDelete: 'SET NULL',
      nullable: true,
      eager: false,
    },
  )
  public readonly subscriptionFeatures?: SubscriptionFeatureEntity[];

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
