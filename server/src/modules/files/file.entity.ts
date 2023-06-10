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

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32 })
  filename: string;

  @ApiProperty({ maxLength: 4 })
  @Column({ length: 4 })
  fileExt: string;

  @ApiProperty({ maxLength: 37 })
  @Column({ length: 37 })
  filenameWithExt: string;

  @ApiProperty({ maxLength: 256 })
  @Column({ length: 256 })
  filepath: string;

  @ApiProperty()
  @OneToOne(() => TrackEntity, ({ genre }) => genre)
  track: TrackEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
