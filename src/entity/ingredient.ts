import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const MAX_INGREDIENT_NAME_LENGTH = 255;

export const MAX_INGREDIENT_WEIGHT = 100;

export const MAX_CALORIES = 10000;

@Entity()
export default class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: MAX_INGREDIENT_NAME_LENGTH,
  })
  name: string;

  @Column({
    type: 'integer',
  })
  calories: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 1,
  })
  protein: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 1,
  })
  fat: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 1,
  })
  carbs: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
