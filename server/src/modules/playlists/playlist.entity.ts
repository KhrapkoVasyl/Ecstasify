import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { TrackEntity } from '../tracks/track.entity';
import { UserEntity } from '../users/user.entity';
import { CommonEntity } from 'src/common/entities';

@Entity({ name: 'playlists' })
export class PlaylistEntity extends CommonEntity {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiHideProperty()
  @ManyToMany(() => TrackEntity, ({ playlists }) => playlists, {
    nullable: true,
  })
  @JoinTable({ name: 'playlist-tracks' })
  tracks: Partial<TrackEntity>[];

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, ({ playlists }) => playlists, {
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
}
