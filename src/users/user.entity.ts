import { Establishment } from "../establishment/entities/establishment.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Establishment, (establishment) => establishment.owner)
  establishments: Establishment[];
}
