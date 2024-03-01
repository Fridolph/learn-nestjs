// import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RangeModule } from "./range/range.module";
import * as Joi from "joi";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

// 通过使用 dotenv 来也很好用，可直接读取
import * as dotenv from "dotenv";
import { ConfigEnum } from "./enum/config.enum";

// 第三方日志模块 pino
// import { LoggerModule } from "nestjs-pino";
// import { join } from "path";

// 第三方日志模块 winston
import { Module, Global, Logger } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { LogsModule } from './logs/logs.module';
import * as winston from "winston";

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          // 同步本地的schema与数据库 -> 初始化时使用
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          // 设置日志等级
          // logging: ["error"],
          logging: process.env.NODE_ENV === "development" ? true : false,
        }) as TypeOrmModuleOptions,
    }),
    
    LogsModule,
    UserModule,
    RangeModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
