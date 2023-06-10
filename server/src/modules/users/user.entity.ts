import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
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
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 16 })
  password: string;

  @ApiProperty({ maxLength: 256 })
  @Column({ length: 256 })
  email: string;

  @ApiProperty()
  @Column()
  role: number;

  @ApiProperty()
  @ManyToOne(() => SubscriptionPlanEntity, ({ users }) => users)
  @JoinColumn()
  subscriptionPlan: SubscriptionPlanEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
