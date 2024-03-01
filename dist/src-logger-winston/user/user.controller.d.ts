import { UserService } from "./user.service";
import { LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
export declare class UserController {
    private userService;
    private configService;
    private readonly logger;
    constructor(userService: UserService, configService: ConfigService, logger: LoggerService);
    getUsers(): Promise<User[]>;
    addUser(): Promise<User>;
    updateUser(id: number): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    getUserProfile(id: number): Promise<User>;
    getUserLogs(id: number): Promise<import("../logs/logs.entity").Logs[]>;
    getLogsByGroup(): Promise<{
        result: any;
        count: any;
    }[]>;
}
