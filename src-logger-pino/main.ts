// import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PREFIX = "api/v1";
const PORT = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 通过这行代码可以关闭日志
    // logger: false
    // 设置日志等级
    // logger: ['error', 'warn']
  });
  app.setGlobalPrefix(PREFIX);

  // const logger = new Logger()
  // logger.warn(`App 运行在 ${PORT} 端口`)

  await app.listen(PORT);

}

bootstrap();
