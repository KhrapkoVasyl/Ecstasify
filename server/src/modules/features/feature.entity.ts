import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { SubscriptionFeatureEntity } from '../subscription-features/subscription-feature.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('features')
export class FeatureEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty({ type: 'string', maxLength: 256 })
  @Column({ type: 'varchar', length: 256 })
  public readonly name: string;

  @ApiHideProperty()
  @OneToMany(() => SubscriptionFeatureEntity, ({ feature }) => feature, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: false,
  })
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
