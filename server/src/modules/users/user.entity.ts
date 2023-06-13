import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { SubscriptionPlanEntity } from '../subscription-plans/subscription-plan.entity';
import { Exclude } from 'class-transformer';
import { PlaylistEntity } from '../playlists/playlist.entity';
import { CommonEntity } from 'src/common/entities';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
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
  @Column({ length: 256, unique: true })
  email: string;

  @ApiProperty()
  @Column()
  role: number;

  @ApiProperty()
  @ManyToOne(() => SubscriptionPlanEntity, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  subscriptionPlan: SubscriptionPlanEntity;

  @ApiHideProperty()
  @OneToMany(() => PlaylistEntity, ({ user }) => user, {
    nullable: true,
  })
  playlists: PlaylistEntity[];

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;
}
