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

@Entity({ name: 'genres' })
export class GenreEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32, unique: true })
  name: string;

  @ApiHideProperty()
  @OneToMany(() => TrackEntity, ({ genre }) => genre, {
    nullable: true,
  })
  tracks: TrackEntity[];

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ readonly: true })
  readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ readonly: true })
  readonly updatedAt: Date;
}
