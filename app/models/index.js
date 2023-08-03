import { dbConfig } from "../config/db.config.js";
import { Sequelize, DataTypes } from 'sequelize';
import { initUserModel } from "./user.model.js";
import { initBootcampModel } from "./bootcamp.model.js";

const sequelize = new Sequelize (dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle
    }
})

const db = {
    Sequelize,
    sequelize,
    users: initUserModel(sequelize, DataTypes),
    bootcamps: initBootcampModel(sequelize, DataTypes)
}

db.users.belongsToMany(db.bootcamps, {
    through: "user_bootcamp",
    as: "bootcamps",
    foreignKey: "user_id"
})
db.bootcamps.belongsToMany(db.users, {
    through: "user_bootcamp",
    as: "users",
    foreignKey: "bootcamp_id"
})

export default db