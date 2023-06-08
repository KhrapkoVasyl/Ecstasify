import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrackEntity } from '../tracks/track.entity';

@Entity({ name: 'authors' })
export class AuthorEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @OneToMany(() => TrackEntity, (track) => track.author)
  tracks: TrackEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
