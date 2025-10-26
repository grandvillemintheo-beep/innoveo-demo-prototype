"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const configuration_1 = require("../config/configuration");
const content_entity_1 = require("../content/entities/content.entity");
const user_entity_1 = require("./entities/user.entity");
const config = (0, configuration_1.default)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    ssl: config.database.ssl,
    entities: [user_entity_1.User, content_entity_1.Content],
    synchronize: false,
    migrations: ['dist/database/migrations/*.js']
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=data-source.js.map