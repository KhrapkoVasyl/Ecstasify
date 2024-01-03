import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { GenreEntity } from '../genres/genre.entity';
import { PlaylistEntity } from '../playlists/playlist.entity';
import { FileEntity } from '../files/file.entity';
import { CommonEntity } from 'src/common/entities';

@Entity({ name: 'tracks' })
export class TrackEntity extends CommonEntity {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiProperty({ type: 'string', maxLength: 36, nullable: true })
  @Column({ length: 36 })
  author: string;

  @ApiProperty({ type: () => GenreEntity })
  @ManyToOne(() => GenreEntity, ({ tracks }) => tracks, { onDelete: 'CASCADE' })
  @JoinColumn()
  genre: GenreEntity;

  @ApiHideProperty()
  @ManyToMany(() => PlaylistEntity, ({ tracks }) => tracks, { nullable: true })
  playlists: PlaylistEntity[];

  @ApiProperty({ type: () => FileEntity })
  @OneToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  file: FileEntity;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;
}
