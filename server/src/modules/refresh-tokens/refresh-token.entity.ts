import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from 'src/common/entities';
import { UserEntity } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants';

@Entity({ name: 'refresh-tokens' })
export class RefreshTokenEntity extends CommonEntity {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', maxLength: 512, uniqueItems: true })
  @Column({ length: 512, unique: true })
  value: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @Column({ readonly: true })
  expiresAt: Date;

  @BeforeInsert()
  public async hashRefreshToken() {
    if (this.value) {
      this.value = await bcrypt.hash(this.value, SALT_ROUNDS);
    }
  }
}
