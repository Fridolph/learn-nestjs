"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
require("winston-daily-rotate-file");
const transports_1 = require("winston/lib/winston/transports");
const DailyRotateFile = require("winston-daily-rotate-file");
const config_enum_1 = require("../../src/enum/config.enum");
let LogsModule = class LogsModule {
};
exports.LogsModule = LogsModule;
exports.LogsModule = LogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const consoleTransports = new transports_1.Console({
                        level: "info",
                        format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
                    });
                    const dailyTransports = new DailyRotateFile({
                        level: "warn",
                        dirname: "logs",
                        filename: "proName_warn-%DATE%.log",
                        datePattern: "YYYY-MM-DD-HH",
                        zippedArchive: true,
                        maxSize: "20m",
                        maxFiles: "14d",
                        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
                    });
                    const dailyInfoTransports = new DailyRotateFile({
                        level: configService.get(config_enum_1.LogEnum.LOG_LEVEL),
                        dirname: "logs",
                        filename: "proName_info-%DATE%.log",
                        datePattern: "YYYY-MM-DD-HH",
                        zippedArchive: true,
                        maxSize: "20m",
                        maxFiles: "14d",
                        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
                    });
                    return {
                        transports: [
                            consoleTransports,
                            ...(configService.get(config_enum_1.LogEnum.LOG_ON)
                                ? [dailyTransports, dailyInfoTransports]
                                : []),
                        ],
                    };
                }
            }),
        ]
    })
], LogsModule);
//# sourceMappingURL=logs.module.js.map