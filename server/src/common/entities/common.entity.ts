import { BaseEntity } from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  id: string;
}
