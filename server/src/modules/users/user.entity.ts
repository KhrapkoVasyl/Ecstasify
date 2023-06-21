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
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { SubscriptionPlanEntity } from '../subscription-plans/subscription-plan.entity';
import { Exclude } from 'class-transformer';
import { PlaylistEntity } from '../playlists/playlist.entity';
import { CommonEntity } from 'src/common/entities';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from 'src/common/enums';
import { SALT_ROUNDS } from 'src/common/constants';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 256 })
  password: string;

  @ApiProperty({ type: 'string', maxLength: 256, uniqueItems: true })
  @Column({ length: 256, unique: true })
  email: string;

  @ApiProperty({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  @Column({ enum: UserRoleEnum, default: UserRoleEnum.USER, nullable: false })
  role: UserRoleEnum;

  @ApiProperty({ type: () => SubscriptionPlanEntity, nullable: true })
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

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  }
}
