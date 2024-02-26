## 使用 config

通过写 .env 的方式

```js
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RangeModule } from "./range/range.module";
// import configuration from './configuration.js';

// 通过使用哦 dotenv 来也很好用，可直接读取
import * as dotenv from "dotenv";

const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: ".env" })],
    }),
    UserModule,
    RangeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
