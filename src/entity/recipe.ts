import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import MenuRecipe from './menu-recipe';

export const MAX_RECIPE_TITLE_LENGTH = 255;
export const MAX_RECIPE_DESCRIPTION_LENGTH = 1000;

@Entity()
export default class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: MAX_RECIPE_TITLE_LENGTH,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: MAX_RECIPE_DESCRIPTION_LENGTH,
  })
  description: string;

  @OneToMany(() => MenuRecipe, (menuRecipe) => menuRecipe.recipe, {
    onDelete: 'CASCADE',
  })
  menuRecipes: MenuRecipe[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
