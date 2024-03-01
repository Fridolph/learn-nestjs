import {
  ManyToMany,
  OneToMany,
  OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
} from "typeorm";
import { Logs } from "../logs/logs.entity";
import { Roles } from "../roles/roles.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // ts -> 数据库 关联关系 Mapping
  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: "users_roles" })
  roles: Roles[];
}
