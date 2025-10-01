import { Category } from '../../categorys/entities/category.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';


@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id', type: 'bigint' })
  productId: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ name: 'createdAt', type: 'timestamptz', nullable: true })
  createdAt: Date;

  @Column({ type: 'double precision', nullable: true })
  price: number;

  @Column({ name: 'isActive', type: 'boolean', nullable: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category' })
  category: Category;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, { cascade: true })
  ingredients: Ingredient[];
}
