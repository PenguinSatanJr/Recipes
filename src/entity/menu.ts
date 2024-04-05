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

@Entity()
export default class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
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
