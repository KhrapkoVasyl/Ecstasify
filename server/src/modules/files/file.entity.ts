import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrackEntity } from '../tracks/track.entity';

@Entity({ name: 'files' })
export class FileEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 50 })
  @Column({ length: 50 })
  filename: string;

  @ApiProperty({ maxLength: 4 })
  @Column({ length: 4 })
  fileExt: string;

  @ApiProperty({ maxLength: 55 })
  @Column({ length: 55 })
  filenameWithExt: string;

  @ApiProperty({ maxLength: 255 })
  @Column({ length: 255 })
  filepath: string;

  @OneToOne(() => TrackEntity, (track) => track.genre)
  track: TrackEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
