import {
  LoggerService,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {

  }

  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log("🚀 ~ exception:", exception)
    // 这里 host 代表 nextjs App 整个进程
    const context = host.switchToHttp();

    // 请求对象
    const request = context.getRequest();
    // 响应对象
    const response = context.getResponse();
    // console.log("🚀 ~ response:", response)
    // HTTP状态码
    const status = exception.getStatus()

    // 期间若有错误可以在这里保存到日志
    this.logger.error(exception.message, exception.stack);

    response.status(status).json({
      code: status,
      timestamp: new Date().toLocaleString(),
      // path: request.url,
      // method: request.method,
      message: exception.message || HttpException.name,
    })
    // throw new Error("Method not implemented.");
  }
}
