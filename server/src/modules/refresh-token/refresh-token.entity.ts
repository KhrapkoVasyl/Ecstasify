import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { CommonEntity } from 'src/common/entities';
import { UserEntity } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './/refresh-tokens.constants';

@Entity({ name: 'refresh-tokens' })
export class RefreshTokenEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 512 })
  @Column({ length: 512, unique: true, nullable: true })
  value: string;

  @ApiProperty()
  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;

  @ApiProperty()
  @Column({ readonly: true })
  expiresAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashRefreshToken() {
    if (this.value) {
      this.value = await bcrypt.hash(this.value, SALT_ROUNDS);
    }
  }
}
