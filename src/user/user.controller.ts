import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Inject,
  LoggerService,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUsersDto } from './dto/getUser.dto';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init');
  }

  // 查询所有用户
  @Get()
  getUsers(@Query() query: getUsersDto): any {
    // 可查询条件：
    // page - 页码
    // limit - 每页条数
    // 其他查询条件：username、role、gender、sort
    // 前端传递的所有参数都是 string 字符串，需要转换类型
    console.log("🚀 ~ UserController ~ getUsers ~ query:", query)

    // this.logger.log(`请求getUsers成功`);
    


    return this.userService.findAll(query);
    // return this.userService.getUsers();
  }

  // 新增用户
  @Post()
  addUser(): any {
    // todo 解析Body参数
    const user = { username: 'toimc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }

  // 查询单个用户
  @Get(':id')
  getUser() {
    return 'hello world :id'
  }

  // 更新单个用户信息
  @Patch(':id')
  updateUser(): any {
    // todo 传递参数id
    // todo 异常处理
    const user = { username: 'newname' } as User;
    return this.userService.update(1, user);
  }

  // 删除用户
  @Delete(':id')
  deleteUser(): any {
    // todo 传递参数id
    return this.userService.remove(1);
  }

  // 查询用户详情
  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }

  // 获取某个用户操作日志
  @Get('/logs/:id')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logs/group/:id')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }
}
