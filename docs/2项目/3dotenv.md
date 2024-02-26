# dotenv

dotenv 是一个零依赖的 Node.js 模块，它可以从一个.env 文件中加载环境变量到 process.env。
开发人员通常使用此模块来管理应用配置和敏感凭据，这些都不应该直接嵌入在代码中，以避免版本控制系统中不慎暴露它们。

使用 dotenv 可以让你将配置与代码的其余部分解耦。这意味着你不需要更改代码就可以根据开发环境、测试环境或生产环境中的不同需求来调整配置。这种方式也是在 12-Factor App 方法论中推荐的应用配置方式。

在项目中使用 dotenv 非常简单：

1. 你首先安装 dotenv 作为项目的依赖：

```bash
npm install dotenv
```

2. 在你的项目根目录下创建一个.env 文件，并在该文件中定义你的环境变量：

```js
DB_HOST = localhost;
DB_USER = root;
DB_PASS = s1mpl3;
```

3. 在你的 application 的入口文件（如 app.js 或 index.js）加入以下代码：

```js
require("dotenv").config();
```

或者如果你使用的是 import 语句：

```js
import "dotenv/config";
```

这行代码会使得 dotenv 去加载.env 文件，并将变量添加到 process.env 对象中。之后，你可以像访问其他环境变量一样来访问这些变量：

```js
const dbHost = process.env.DB_HOST;
```

现在，你无需更改代码便可以通过改变.env 文件中的环境变量来调整你的应用配置。这使得管理应用配置在多环境下更加安全和方便。

## dev -D

- config

- cross-env

- dotenv

这里我们用官方提供的工具

### @nestjs/config