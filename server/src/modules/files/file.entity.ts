import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as path from 'path';
import { AppConfigService } from 'src/config/app-config.service';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  Entity,
} from 'typeorm';

const appConfigService = new AppConfigService(new ConfigService());

@Entity('files')
export class FileEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty({ type: 'string', maxLength: 256, required: true })
  @Column({ type: 'varchar', length: 256 })
  public readonly fileName: string;

  @ApiProperty({ type: 'string', maxLength: 256, required: true })
  @Column({ type: 'varchar', length: 256 })
  public readonly fileExt: string;

  @ApiProperty({ type: 'string', maxLength: 512, required: true })
  @Column({ type: 'varchar', length: 512 })
  public readonly fileNameWithExt: string;

  @ApiProperty({ type: 'string', maxLength: 512, required: true })
  @Column({ type: 'varchar', length: 512 })
  public readonly filePath: string;

  @ApiProperty({ type: 'string', maxLength: 256, required: true })
  @Column({ type: 'varchar', length: 256 })
  public readonly mimetype: string;

  @Expose()
  @ApiProperty({ readOnly: true })
  get src(): string {
    if (!this.filePath) return null;
    const filePath = path
      .join(appConfigService.get('CDN'), this.filePath)
      .replace(/\\/g, '/');

    return new URL(filePath).toString();
  }

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
