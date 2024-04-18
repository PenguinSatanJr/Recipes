import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import MenuRecipe from './menu-recipe';

export const MAX_MENU_TITLE_LENGTH = 255;

@Entity()
export default class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: MAX_MENU_TITLE_LENGTH })
  title: string;

  @OneToMany(() => MenuRecipe, (menuRecipe) => menuRecipe.menu)
  menuRecipes: MenuRecipe[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
