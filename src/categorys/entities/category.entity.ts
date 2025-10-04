import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'categorys' }) // mantendo plural como você queria
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  categoryId: string;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
