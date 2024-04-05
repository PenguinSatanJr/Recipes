import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Recipe from './recipe';

export const MAX_MENU_TITLE_LENGTH = 255;

@Entity()
export default class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: MAX_MENU_TITLE_LENGTH })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany('Recipe', 'menus')
  @JoinTable({
    name: 'menu_recipe',
    joinColumn: { name: 'menu_id' },
    inverseJoinColumn: { name: 'recipe_id' },
  })
  recipes: Recipe[];
}
