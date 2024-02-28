# QueryBuilder

> 更多查看文档 <https://typeorm.bootcss.com>

## 什么是 QueryBuilder

QueryBuilder 是 TypeORM最强大的功能之一，它允许你使用优雅便捷的语法构建 SQL 查询，执行并获得自动转换的实体。

QueryBuilder 是一个查询构造器，可以将 SQL 语句的各个部分组装起来，生成一个完整的 SQL 语句。

```js
const firstUser = await connection
  .getRepository(User)
  .createQueryBuilder("user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```

它将生成以下 SQL 语句：

```sql
SELECT
  user.id as userId,
  user.firstName as userFirstName,
  user.lastName as userLastName
FROM users user
WHERE user.id = 1
```

然后返回一个 User 实例：

```js

```