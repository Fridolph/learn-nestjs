import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Logs } from "../logs/logs.entity";
export declare class UserService {
    private readonly userRepository;
    private readonly logsRepository;
    constructor(userRepository: Repository<User>, logsRepository: Repository<Logs>);
    findAll(): Promise<User[]>;
    find(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findProfile(id: number): Promise<User>;
    findUserLogs(id: number): Promise<Logs[]>;
    findLogsByGroup(id: number): Promise<any[]>;
    create(user: User): Promise<User>;
    update(id: number, user: Partial<User>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
