import { Logs } from "../logs/logs.entity";
import { Roles } from "../roles/roles.entity";
import { Profile } from "./profile.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    profile: Profile;
    logs: Logs[];
    roles: Roles[];
}
