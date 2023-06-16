import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { CommonEntity } from 'src/common/entities';
import { UserEntity } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants';

@Entity({ name: 'refresh-tokens' })
export class RefreshTokenEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 512, uniqueItems: true })
  @Column({ length: 512, unique: true })
  value: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;

  @ApiProperty({ readOnly: true })
  @Column({ readonly: true })
  expiresAt: Date;

  @BeforeInsert()
  public async hashRefreshToken() {
    if (this.value) {
      this.value = await bcrypt.hash(this.value, SALT_ROUNDS);
    }
  }
}
