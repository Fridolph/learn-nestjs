import { UserService } from './user.service'
import { Controller, Get, Post } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import { ConfigEnum } from 'src/enum/config.enum'
// import * as config from 'config'


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  // constructor(private userService: UserService, private configService: ConfigService) {
    // 语法糖 -> 相当与 this.userService = new UserService();
  }

  @Get()
  getUsers(): any {
    // 1. 由于 ConfigService 是在 App 设置的，所以这里打印不了会报错，需要返回 app 中设置 isGlobal: true
    // const db = this.configService.get(ConfigEnum.DB)
    // const host = this.configService.get(ConfigEnum.DB_HOST)
    // console.log("🚀 ~ UserController ~ getUsers:", db, host)

    // 2. 通过 configuration 的形式读取    
    // console.log("🚀 ~ env:", process.env.DB_HOST)
    console.log("🚀 ~ process.env:\n", process.env)

    // 3. 建议用 config 库，写 json 比较简单能跑通

    return this.userService.getUsers()
  }

  @Post()
  addUser(): any {
    return this.userService.addUser()
  }
}
