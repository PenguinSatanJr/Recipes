import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddMenuRecipeTable1712317954279
  implements MigrationInterface
{
  name = 'AddMenuRecipeTable1712317954279';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."menu_recipe_meal_time_enum" AS ENUM('Breakfast', 'Lunch', 'Dinner')`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_recipe" ("menu_id" integer NOT NULL, "recipe_id" integer NOT NULL, "meal_time" "public"."menu_recipe_meal_time_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f81e9e93013b6a671d23809b26f" PRIMARY KEY ("menu_id", "recipe_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d89e30b3880de2f86da8746d4" ON "menu_recipe" ("menu_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1166511b16a0bdf5a2ccd20fe" ON "menu_recipe" ("recipe_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" ADD CONSTRAINT "FK_3d89e30b3880de2f86da8746d41" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" ADD CONSTRAINT "FK_b1166511b16a0bdf5a2ccd20feb" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" DROP CONSTRAINT "FK_b1166511b16a0bdf5a2ccd20feb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" DROP CONSTRAINT "FK_3d89e30b3880de2f86da8746d41"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1166511b16a0bdf5a2ccd20fe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d89e30b3880de2f86da8746d4"`,
    );
    await queryRunner.query(`DROP TABLE "menu_recipe"`);
    await queryRunner.query(`DROP TYPE "public"."menu_recipe_meal_time_enum"`);
  }
}
