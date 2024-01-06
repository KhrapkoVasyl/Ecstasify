import { UserRoleEnum } from 'src/common/enums';
import { UserEntity } from 'src/modules/users/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const data: Partial<UserEntity>[] = [
  {
    id: 'e5333601-bfee-4af8-bc01-ad1370087c32',
    role: UserRoleEnum.ADMIN,
    email: 'admin@gmail.com',
    password: '$2b$10$IrQL2ZBIQKAnCdjXbVkGtuSmU2l7/QaQmgEUJQtgE0jdv531gZQ5m', // password1234
    name: 'Jhon Doe',
  },
  {
    id: 'adb5d416-6ce2-44df-b1d4-e6362d8c71b4',
    role: UserRoleEnum.ADMIN,
    email: 'khrapko2002@gmail.com',
    password: '$2b$10$IrQL2ZBIQKAnCdjXbVkGtuSmU2l7/QaQmgEUJQtgE0jdv531gZQ5m', // password1234
    name: 'Albert',
  },
];

export class Users1704496499847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.synchronize();
    await queryRunner.connection.getRepository(UserEntity).save(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(UserEntity)
      .delete(data.map(({ id }) => id));
  }
}
