import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  Entity,
} from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty({ type: 'string', maxLength: 64, required: true })
  @Column({ type: 'varchar', length: 64 })
  public readonly fileName: string;

  @ApiProperty({ type: 'string', maxLength: 64, required: true })
  @Column({ type: 'varchar', length: 64 })
  public readonly fileExt: string;

  @ApiProperty({ type: 'string', maxLength: 128, required: true })
  @Column({ type: 'varchar', length: 128 })
  public readonly fileNameWithExt: string;

  @ApiProperty({ type: 'string', maxLength: 256, required: true })
  @Column({ type: 'varchar', length: 256 })
  public readonly filePath: string;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({
    readonly: true,
  })
  public readonly createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({
    readonly: true,
  })
  public readonly updatedAt: Date;
}
