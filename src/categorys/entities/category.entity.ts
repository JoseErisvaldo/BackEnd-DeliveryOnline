import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';


@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'categoryId' })
  categoryId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
