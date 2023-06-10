import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FeatureEntity } from '../features/feature.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'subscription-plans' })
export class SubscriptionPlanEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiProperty()
  @Column({ type: 'double precision' })
  price: number;

  @ApiProperty()
  @OneToMany(() => UserEntity, (user) => user.subscriptionPlan)
  users: UserEntity[];

  @ApiProperty()
  @ManyToMany(() => FeatureEntity, (feature) => feature.subscriptionPlans)
  @JoinTable({ name: 'subscription-plan-features' })
  features: FeatureEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
