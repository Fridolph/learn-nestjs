// Copyright (c) 2022 toimc<admin@wayearn.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs日志
    // logger: false,
    // logger: ['error', 'warn'],
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api/v1');

  // 添加全局使用filter的逻辑
  const httpAdapter = app.get(HttpAdapterHost);  
  // 全局Filter只能有一个
  const logger = new Logger()
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  const port = 3000;
  await app.listen(port);
}
bootstrap();
