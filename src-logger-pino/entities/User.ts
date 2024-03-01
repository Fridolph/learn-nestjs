import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Logs } from "./Logs";
import { Profile } from "./Profile";
import { Roles } from "./Roles";

@Entity("user", { schema: "learn_nestjs" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "userId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "rolesId", referencedColumnName: "id" }],
    schema: "learn_nestjs",
  })
  roles: Roles[];
}
