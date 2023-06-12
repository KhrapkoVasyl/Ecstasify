import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { GenreEntity } from '../genres/genre.entity';
import { PlaylistEntity } from '../playlists/playlist.entity';
import { FileEntity } from '../files/file.entity';

@Entity({ name: 'tracks' })
export class TrackEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiProperty()
  @ManyToOne(() => AuthorEntity, ({ tracks }) => tracks)
  @JoinColumn()
  author: AuthorEntity;

  @ApiProperty()
  @ManyToOne(() => GenreEntity, ({ tracks }) => tracks)
  @JoinColumn()
  genre: GenreEntity;

  @ApiHideProperty()
  @ManyToMany(() => PlaylistEntity, ({ tracks }) => tracks)
  @JoinTable({ name: 'playlist-tracks' })
  playlists: PlaylistEntity[];

  @ApiProperty()
  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: FileEntity;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;
}
