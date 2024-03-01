import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
// 这里图简单，先这样写，后面会创建 单独的文件夹
import { Logs } from "../logs/logs.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {
    //
  }

  /**
   *
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   * @param username
   */
  find(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * @param username
   */
  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * @param id
   */
  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }

  async findUserLogs(id: number) {
    const user = await this.find(id);
    return this.logsRepository.find({
      where: {
        user,
      },
      relations: {
        user: true,
      },
    });
  }

  findLogsByGroup(id: number) {
    // SELECT logs.result as result, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result;
    return this.logsRepository
      .createQueryBuilder("logs")
      .select("logs.result", "result")
      .addSelect('COUNT("logs.result")', "count")
      .leftJoinAndSelect("logs.user", "user")
      .where("user.id = :id", { id })
      .groupBy("logs.result")
      .orderBy('result', 'DESC')
      .getRawMany();
  }

  /**
   *
   * @param user
   */
  async create(user: User) {
    const userTemp = await this.userRepository.create(user);
    return this.userRepository.save(userTemp);
  }

  /**
   * @param id
   * @param user
   */
  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
