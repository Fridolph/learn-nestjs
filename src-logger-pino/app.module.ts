import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RangeModule } from "./range/range.module";
import * as Joi from "joi";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

// 通过使用 dotenv 来也很好用，可直接读取
import * as dotenv from "dotenv";
import { ConfigEnum } from "./enum/config.enum";

// 第三方日志模块
import { LoggerModule } from "nestjs-pino";
import { join } from "path";

const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    UserModule,
    RangeModule,
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
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
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
      useFactory: (configService: ConfigService) => ({
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
        logging: process.env.NODE_ENV === 'development' ? true : false,
      }) as TypeOrmModuleOptions,
    }),

    // 数据库相关配置 - 现在用 forRootAsync 方法来配置
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   host: "localhost",
    //   port: 3306,
    //   username: "root",
    //   password: "123123",
    //   database: "learn_nestjs",
    //   entities: [__dirname + "/**/*.entity{.ts,.js}"],
    //   // 同步本地的schema与数据库 -> 初始化时使用
    //   synchronize: true,
    //   // 设置日志等级
    //   logging: ["error"],
    // }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            process.env.NODE_ENV === 'development' ? {
              level: "info",
              target: "pino-pretty",
              options: {
                colorize: true,
              },
            } : 
            {
              // 每天自动的把日志信息 按文件滚动方式 滚动出来
              level: "info",
              target: "pino-roll",
              options: {
                file: join("logs", "log.txt"),
                frequency: "daily", // hourly 以小时滚动
                size: '1m',
                mkdir: true,
              },
            },
          ],
        },
        // transport: process.env.NODE_ENV === 'development' ? {
        //   target: 'pino-pretty',
        //   options: {
        //     colorize: true
        //   }
        // } : {
        //   // 每天自动的把日志信息 按文件滚动方式 滚动出来
        //   target: 'pino-roll',
        //   options: {
        //     file: 'log.txt',
        //     frequency: 'daily',
        //     mkdir: true
        //   }
        // }
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
