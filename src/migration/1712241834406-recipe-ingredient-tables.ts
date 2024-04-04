import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RecipeIngredientTables1712241834406
  implements MigrationInterface
{
  name = 'RecipeIngredientTables1712241834406';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(1000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "calories" integer NOT NULL, "protein" numeric(8,1) NOT NULL, "fat" numeric(8,1) NOT NULL, "carbs" numeric(8,1) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
  }
}
