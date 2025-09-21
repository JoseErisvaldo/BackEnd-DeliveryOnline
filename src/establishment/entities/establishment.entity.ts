import { User } from "../../users/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
//import { Product } from '../../product/entities/product.entity';

@Entity("establishments")
export class Establishment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 150 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address: string;

  @ManyToOne(() => User, (user) => user.establishments, { eager: true })
  owner: User;

  /*@OneToMany(() => Product, (product) => product.establishment)
  products: Product[];*/

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
