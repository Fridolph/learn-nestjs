import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { Logger } from "@nestjs/common";
// 第三方日志库 winston
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

const PREFIX = "api/v1";
const PORT = 3000;

// 写了单独的 logs Module 所以这里的代码可以删掉了
// 下面关于 日志 Log 的都注释掉了
// const loggerInstance = WinstonModule.createLogger({
//   transports: [],
// })
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 
  });
  app.setGlobalPrefix(PREFIX);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  await app.listen(PORT);
}

bootstrap();
