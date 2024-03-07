import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Logs } from "../logs/logs.entity";
import { getUsersDto } from "./dto/getUser.dto";
import { conditionUtils } from "src/utils/db.helper";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>
  ) {}

  findAll(query: getUsersDto) {
    const { limit, page, username, role, gender } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take
    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     username: true,
    //     profile: {
    //       gender: true
    //     }

    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   take,
    //   skip,
    //   where: {
    //     username,
    //     profile: {
    //       gender
    //     },
    //     roles: {
    //       id: role
    //     }
    //   }
    // });

    // 尝试另一种查询方式 createQueryBuilder
    let obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role
    }
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles')
    
    const newQuery = conditionUtils<User>(queryBuilder, obj)
    return newQuery
      .take(take)
      .skip(skip)
      .getMany()
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // 这里的try catch 是一种通用写法
  // 但每个都这样写太多也太麻烦了
  // async create(user: User) {
  //   const userTmp = await this.userRepository.create(user);
  //   try {
  //     const res = await this.userRepository.save(userTmp);
  //     return res      
  //   } catch (error) {
  //     console.log("🚀 ~ UserService ~ create ~ error:", error)
  //     if (error && error.errno === 1062) {
  //       throw new HttpException(error.sqlMessage, 500);
  //     }
  //   }
  // }

  async create(user: User) {
    const userTmp = await this.userRepository.create(user);
    const res = await this.userRepository.save(userTmp);
    return res
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: {
        user,
      },
      // relations: {
      //   user: true,
      // },
    });
  }

  findLogsByGroup(id: number) {
    // SELECT logs.result as rest, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result;
    // return this.logsRepository.query(
    //   'SELECT logs.result as rest, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result',
    // );
    return (
      this.logsRepository
        .createQueryBuilder("logs")
        .select("logs.result", "result")
        .addSelect('COUNT("logs.result")', "count")
        .leftJoinAndSelect("logs.user", "user")
        .where("user.id = :id", { id })
        .groupBy("logs.result")
        .orderBy("count", "DESC")
        .addOrderBy("result", "DESC")
        .offset(2)
        .limit(3)
        // .orderBy('result', 'DESC')
        .getRawMany()
    );
  }
}
