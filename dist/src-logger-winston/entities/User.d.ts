import { Logs } from "./Logs";
import { Profile } from "./Profile";
import { Roles } from "./Roles";
export declare class User {
    id: number;
    username: string;
    password: string;
    logs: Logs[];
    profile: Profile;
    roles: Roles[];
}
