import { UserService } from "./user.service";
import { Controller, Get, Post, Patch, Delete } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(
    // 语法糖 -> 相当与 this.userService = new UserService();
    private userService: UserService,
    private configService: ConfigService,
  ) {
    //
  }

  @Get()
  getUsers() {
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