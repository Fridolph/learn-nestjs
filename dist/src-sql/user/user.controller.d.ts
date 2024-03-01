import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
export declare class UserController {
    private userService;
    private configService;
    constructor(userService: UserService, configService: ConfigService);
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
