// import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';
import { TypeOrmModule } from "@nestjs/typeorm";

// 通过使用 dotenv 来也很好用，可直接读取
import * as dotenv from "dotenv";

// 第三方日志模块 winston - 通过ormconfig.ts
import { Module, Global, Logger } from "@nestjs/common";
import { connectionParams } from "../ormconfig";
// Module
import { UserModule } from "./user/user.module";
import { RangeModule } from "./range/range.module";

const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

// 把日志进行全局注册这样所有模块都能使用了
@Global()
@Module({
  imports: [
    // env相关配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: ".env" })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production")
          .default("development"),
        DB_PORT: Joi.number().valid(3306),
        DB_HOST: Joi.string().ip(),
        DB_TYPE: Joi.string().valid("mysql", "postgres"),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),

    // 同步本地的schema与数据库 -> 初始化时使用
    // 数据库相关配置 2
    TypeOrmModule.forRoot(connectionParams),
    UserModule,
    RangeModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
