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
import { AuthorEntity } from '../authors/author.entity';
import { GenreEntity } from '../genres/genre.entity';
import { PlaylistEntity } from '../playlists/playlist.entity';
import { FileEntity } from '../files/file.entity';
import { CommonEntity } from 'src/common/entities';

@Entity({ name: 'tracks' })
export class TrackEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiProperty()
  @ManyToOne(() => AuthorEntity, ({ tracks }) => tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  author: AuthorEntity;

  @ApiProperty()
  @ManyToOne(() => GenreEntity, ({ tracks }) => tracks, { onDelete: 'CASCADE' })
  @JoinColumn()
  genre: GenreEntity;

  @ApiHideProperty()
  @ManyToMany(() => PlaylistEntity, ({ tracks }) => tracks, { nullable: true })
  playlists: PlaylistEntity[];

  @ApiProperty()
  @OneToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  file: FileEntity;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;
}
