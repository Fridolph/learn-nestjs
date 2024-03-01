import { UserService } from "./user.service";
import { Controller, Get, Post, Patch, Delete, Logger, HttpException, HttpStatus, LoggerService, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
// 加入日志模块
// import { Logger } from "@nestjs/common";
// import { Logger } from "nestjs-pino";

@Controller("user")
export class UserController {
  // private logger = new Logger(UserController.name)

  constructor(
    // 语法糖 -> 相当与 this.userService = new UserService();
    private userService: UserService,
    private configService: ConfigService,
    // 第三方 nestjs-pino
    // private logger: Logger
    // 第三方 winston
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {
    //
    this.logger.log(`UserController init...`)
  }

  @Get()
  getUsers() {
    // mock数据
    const user = { isAdmin: false }

    if (!user.isAdmin) {
      throw new HttpException('账号不是管理员，没有权限访问', HttpStatus.FORBIDDEN)
    }
    this.logger.log(`请求getUsers成功`)
    // this.logger.warn(`请求getUsers成功`) // 告警样式，这里请求成功了
    // this.logger.error(`请求getUsers成功`) 失败样式 - 这里请求成功了 所以stack 为null
    // this.logger.debug(`请求getUsers成功`) 没有东西打印
    // this.logger.verbose(`请求getUsers成功`) 没有东西打印
    return this.userService.findAll();
  }

  @Post()
  addUser() {
    // 先模拟插入定死的数据
    const user = { username: "tomic", password: "666888" } as User;
    return this.userService.create(user);
  }

  @Patch()
  updateUser(id: number) {
    // todo 传递参数id
    // todo 异常处理
    const user = { username: 'newName '} as User
    return this.userService.update(1, user)
  }

  @Delete()
  deleteUser(id: number) {
    return this.userService.remove(id);
  }

  @Get('/profile')
  getUserProfile(id: number) {
    return this.userService.findProfile(2)
  }

  @Get('/logs')
  getUserLogs(id: number) {
    return this.userService.findUserLogs(2)
  }

  @Get('/logsByGroup')
  async getLogsByGroup() {
    const res = await this.userService.findLogsByGroup(2)
    return res.map(v => ({
      result: v.result,
      count: v.count
    }))
  }
}
