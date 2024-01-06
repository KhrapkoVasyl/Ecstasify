import { GenreEntity } from 'src/modules/genres/genre.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const data: Partial<GenreEntity>[] = [
  {
    id: 'e5333601-bfee-4af8-bc01-ad1370087c32',
    name: 'Pop',
  },
  {
    id: 'adb5d416-6ce2-44df-b1d4-e6362d8c71b4',
    name: 'Rock',
  },
  {
    id: '6b96146d-188d-45d0-877e-ebed09b30118',
    name: 'Experimental',
  },
  {
    id: 'ea4a2187-24df-46e4-b7e1-af9a43b6ff34',
    name: 'Electronic',
  },
];

export class Genres1704527936098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.synchronize();
    await queryRunner.connection.getRepository(GenreEntity).save(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(GenreEntity)
      .delete(data.map(({ id }) => id));
  }
}
