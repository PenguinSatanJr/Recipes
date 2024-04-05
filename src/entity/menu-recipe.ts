import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { MealTime } from '../types';

@Entity()
export default class MenuRecipe {
  @PrimaryColumn()
  menu_id: number;

  @PrimaryColumn()
  recipe_id: number;

  @Column({ type: 'enum', enum: MealTime })
  meal_time: MealTime;

  @CreateDateColumn()
  createdAt: Date;
}
