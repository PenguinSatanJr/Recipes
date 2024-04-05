import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddTitleToMenu1712245947781 implements MigrationInterface {
  name = 'AddTitleToMenu1712245947781';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu" ADD "title" character varying(255) NOT NULL`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "menu" DROP COLUMN "title"`);
  }
}
