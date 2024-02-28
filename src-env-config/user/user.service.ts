import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  getUsers() {
    return {
      code: 0,
      data: [],
      msg: '请求用户列表成功',
    }
  }

  addUser() {
    // 会往数据库添加数据，这些逻辑暂时省略，后面来学
    return {
      code: 0,
      data: {},
      msg: '添加用户成功',
    }
  }
}
