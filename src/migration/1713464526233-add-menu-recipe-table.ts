import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddMenuRecipeTable1713464526233
  implements MigrationInterface
{
  name = 'AddMenuRecipeTable1713464526233';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."menu_recipe_mealtime_enum" AS ENUM('Breakfast', 'Lunch', 'Dinner')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."menu_recipe_weekday_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_recipe" ("id" SERIAL NOT NULL, "menuId" integer NOT NULL, "recipeId" integer NOT NULL, "mealTime" "public"."menu_recipe_mealtime_enum" NOT NULL, "weekDay" "public"."menu_recipe_weekday_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ef5d22c2c6d4ce89fcad82872cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" ADD CONSTRAINT "FK_67071c944bbbb1b1685427b0a56" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" ADD CONSTRAINT "FK_251363341a57941649af56408d5" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" DROP CONSTRAINT "FK_251363341a57941649af56408d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_recipe" DROP CONSTRAINT "FK_67071c944bbbb1b1685427b0a56"`,
    );
    await queryRunner.query(`DROP TABLE "menu_recipe"`);
    await queryRunner.query(`DROP TYPE "public"."menu_recipe_weekday_enum"`);
    await queryRunner.query(`DROP TYPE "public"."menu_recipe_mealtime_enum"`);
  }
}
