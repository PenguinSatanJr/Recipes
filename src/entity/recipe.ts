import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

const MAX_RECIPE_TITLE_LENGTH = 255;
const MAX_RECIPE_DESCRIPTION_LENGTH = 1000;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
