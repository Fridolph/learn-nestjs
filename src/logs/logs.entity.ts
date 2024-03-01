import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data: string;

  @Column()
  result: number;

  // 和 OneToOne 一样：通过注解标明两个实体类间的关系
  // 第一个参数，告诉ORM返回回来的数据类型
  // 第二个参数，看对应的数据怎么查询出来
  @ManyToOne(() => User, (user) => user.logs)
  // 在哪个表里建立对应的关联关系
  @JoinColumn()
  user: User;
}
