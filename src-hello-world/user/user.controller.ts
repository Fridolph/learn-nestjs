import { UserService } from './user.service'
import { Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    // 语法糖 -> 相当与 this.userService = new UserService();
  }

  @Get()
  getUsers(): any {
    // return {
    //   code: 0,
    //   data: [],
    //   msg: '请求用户列表成功',
    // }

    // 当有了service后，就可以直接返回 service了.
    // 上面注释的代码放到 user.service 中了
    return this.userService.getUsers()
  }

  @Post()
  addUser(): any {
    return this.userService.addUser()
  }
}
