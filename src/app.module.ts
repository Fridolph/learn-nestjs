import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RangeModule } from "./range/range.module";
import * as Joi from "joi";

// 通过使用哦 dotenv 来也很好用，可直接读取
import * as dotenv from "dotenv";

const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: ".env" })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: Joi.number().valid(3306),
        DB_URL: Joi.string().domain(),
        DB_HOST: Joi.string().ip()
        
      }),
    }),
    UserModule,
    RangeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
