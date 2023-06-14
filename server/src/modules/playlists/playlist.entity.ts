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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiHideProperty()
  @ManyToMany(() => TrackEntity, ({ playlists }) => playlists, {
    nullable: true,
  })
  @JoinTable({ name: 'playlist-tracks' })
  tracks: TrackEntity[];

  @ApiProperty()
  @ManyToOne(() => UserEntity, ({ playlists }) => playlists, {
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
}
