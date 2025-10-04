import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Establishment } from '../../establishment/entities/establishment.entity';
import { Category } from '../../categorys/entities/category.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id', type: 'bigint' })
  productId: number;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @Column({ name: 'price', type: 'double precision', nullable: true })
  price: number;

  @Column({ name: 'discount', type: 'double precision', nullable: true, default: 0 })
  discount: number;

  @Column({ name: 'is_active', type: 'boolean', nullable: true })
  isActive: boolean;

  @Column({ name: 'photo', type: 'text', nullable: true })
  photo: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, { cascade: true })
  ingredients: Ingredient[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Establishment, (establishment) => establishment.products, { eager: true })
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
