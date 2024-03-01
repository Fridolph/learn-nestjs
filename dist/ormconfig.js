"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionParams = void 0;
const logs_entity_1 = require("./src/logs/logs.entity");
const user_entity_1 = require("./src/user/user.entity");
const roles_entity_1 = require("./src/roles/roles.entity");
const profile_entity_1 = require("./src/user/profile.entity");
const typeorm_1 = require("typeorm");
exports.connectionParams = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123123",
    database: "learn_nestjs",
    synchronize: true,
    entities: [logs_entity_1.Logs, user_entity_1.User, roles_entity_1.Roles, profile_entity_1.Profile],
};
exports.default = new typeorm_1.DataSource({
    ...exports.connectionParams,
    migrations: ['./src/migration/**'],
    subscribers: []
});
//# sourceMappingURL=ormconfig.js.map