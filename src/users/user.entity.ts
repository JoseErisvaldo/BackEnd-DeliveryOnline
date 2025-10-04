import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Establishment } from '../establishment/entities/establishment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Establishment, (establishment) => establishment.owner)
  establishments: Establishment[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  number?: string;

  @Column({ nullable: true })
  complement?: string;

  @Column({ nullable: true })
  neighborhood?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ nullable: true, default: "active" })
  status?: string;

}
