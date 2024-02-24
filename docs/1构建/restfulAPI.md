# RESTful API

## 设计

- 序言
- 全局参数
  - 错误码
  - 请求 BaseUrl
  - Proxy
- 修改记录
- 按照功能划分的接口描述

### 标准接口设计中的组成部分

- 接口描述
- 请求 URL
- 请求方式：POST/GET/DELETE/PUT
- 参数
  - Body
  - Params
  - Headers 参数
  - JWT Token
  - 参数说明
- 返回示例
- 返回参数说明

## 示例

### 简要描述

- 用户注册接口

### 请求 URL

- http://xx.com/api/user/register

### 请求方式

- POST

### 参数

| 参数名   | 必选 | 类型   | 说明   |
| -------- | ---- | ------ | ------ |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码   |
| name     | 否   | string | 昵称   |

### 返回示例

```json
{
  "code": 0,
  "data": {
    "uid": 1,
    "username": "fridolph"
  }
}
```

### 返回参数说明

| 参数名   | 类型   | 说明     |
| -------- | ------ | -------- |
| code     | int    | 错误码   |
| data     | object | 返回数据 |
| uid      | int    | 用户 ID  |
| username | string | 用户名   |

备注：code 为 0 表示成功，非 0 表示失败。

## 常用测试工具

- 客户端：
  - postman
  - apifox、eolink
  - DOClever
- 网页端
  - chrome拆件 Talend API 、 Postman interceptor
  - 插件工具 VSCode REST Client、 HTTP Client
  

## 启一个nest hello world

listen 3000 

### 项目基本目录

src
|-- app.controller.spec.ts  基于控制器的单元测试样例
|-- app.controller.ts  带有单个路由基本控制器示例
|-- app.module.ts  应用程序的根模块
|-- app.service.ts  带有单个方法的基本服务
|__ main.ts 应用程序入口 / 使用 NestFactory 创建Nest应用实例