import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// 使用到的模块
import { Logs } from "./src/logs/logs.entity";
import { User } from "./src/user/user.entity";
import { Roles } from "./src/roles/roles.entity";
import { Profile } from "./src/user/profile.entity";
import { DataSource, DataSourceOptions } from "typeorm";
// 通过环境变量读取不同的 .env 文件
import  * as fs from 'fs'
import * as dotenv from 'dotenv'
import { ConfigEnum } from "./src/enum/config.enum";
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env))
  }
  return {}
}
// 通过 dotenv 来解析不同的配置文件
function buildConnetionOptions() {
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(`.env.${process.env.NODE_ENV}`)
  // configService
  const config = {
    ...defaultConfig,
    ...envConfig
  }
  console.log("🚀 ~ buildConnetionOptions ~ config:", config)
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    // 同步本地的schema与数据库 -> 初始化时使用
    synchronize: config[ConfigEnum.DB_SYNC],
    // 设置日志等级
    // logging: false
    entities: [Logs, User, Roles, Profile],
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnetionOptions()

export default new DataSource({
  ...connectionParams,
  migrations: ['./src/migration/**'],
  subscribers: []
} as DataSourceOptions)