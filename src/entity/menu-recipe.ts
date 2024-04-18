import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MealTime, WeekDay } from '../types';
// eslint-disable-next-line import/no-cycle
import Recipe from './recipe';
import Menu from './menu';

@Entity()
export default class MenuRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  'menuId': number;

  @Column()
  'recipeId': number;

  @Column({ type: 'enum', enum: MealTime })
  'mealTime': MealTime;

  @Column({ type: 'enum', enum: WeekDay })
  'weekDay': WeekDay;

  @ManyToOne(() => Recipe, (recipe) => recipe.menuRecipes, {
    onDelete: 'CASCADE',
  })
  recipe: Recipe;

  @ManyToOne(() => Menu, (menu) => menu.menuRecipes, { onDelete: 'CASCADE' })
  menu: Menu;

  @CreateDateColumn()
  createdAt: Date;
}
