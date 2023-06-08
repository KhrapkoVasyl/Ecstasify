import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { SubscriptionPlanEntity } from '../subscription-plans/subscription-plan.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 20 })
  @Column({ length: 20 })
  name: string;

  @ApiProperty({ maxLength: 16 })
  @Column({ length: 16 })
  password: string;

  @ApiProperty({ maxLength: 254 })
  @Column({ length: 254 })
  email: string;

  @ApiProperty()
  @Column()
  role: number;

  @ManyToOne(
    () => SubscriptionPlanEntity,
    (subscriptionPlan) => subscriptionPlan.users,
  )
  @JoinColumn()
  subscriptionPlan: SubscriptionPlanEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
