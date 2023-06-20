import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrackEntity } from '../tracks/track.entity';
import { CommonEntity } from 'src/common/entities';

@Entity({ name: 'authors' })
export class AuthorEntity extends CommonEntity {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', maxLength: 32, uniqueItems: true })
  @Column({ length: 32, unique: true })
  name: string;

  @ApiHideProperty()
  @OneToMany(() => TrackEntity, ({ author }) => author, { nullable: true })
  tracks: TrackEntity[];

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;
}
