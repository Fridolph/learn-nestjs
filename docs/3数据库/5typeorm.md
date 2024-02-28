## typeorm-model-generator

安装

```bash
pnpm i -D typeorm-model-generator
```

package.json scripts

```js
{
  "generate:models": "typeorm-model-generator -h 127.0.0.1 -p 3306 -d learn_nestjs -u root -x 123123 -e mysql -o ./src/entities"
}
```