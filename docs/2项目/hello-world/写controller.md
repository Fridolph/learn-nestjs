每次都写 /api 很麻烦

可以在 main.ts 中

```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  await app.listen(3000)
}
bootstrap()
```
