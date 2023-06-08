import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ maxLength: 50 })
  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => AuthorEntity, (author) => author.tracks)
  @JoinColumn()
  author: AuthorEntity;

  @ManyToOne(() => GenreEntity, (genre) => genre.tracks)
  @JoinColumn()
  genre: GenreEntity;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.tracks)
  @JoinTable({ name: 'playlist-tracks' })
  playlists: PlaylistEntity[];

  @OneToOne(() => FileEntity, (file) => file.track)
  @JoinColumn()
  file: FileEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
