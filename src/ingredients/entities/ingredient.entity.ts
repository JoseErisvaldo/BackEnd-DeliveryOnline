import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'ingredient' })
export class Ingredient {
  @PrimaryGeneratedColumn({ name: 'ingredient_id', type: 'bigint' })
  ingredientId: number;

  @Column({ type: 'bigint', nullable: true })
  sku: number;

  @Column({ type: 'double precision', nullable: true })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToOne(() => Product, (product) => product.ingredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sku', referencedColumnName: 'productId' })
  product: Product;
}
