import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import Joi from "joi";


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});


function validationCreateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).trim().required(),
        email: Joi.string().email().required(),
        number: Joi.string().min(1).max(20).trim().required(),
        password: Joi.string().min(8).max(20).trim().required(),
    });

    return schema.validate(obj);
}


function validationLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).trim().required(),
    });

    return schema.validate(obj);
}


function validationupdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).trim().optional(),
        number: Joi.string().min(1).max(20).trim().optional(),
        password: Joi.string().min(8).max(20).trim().optional(),
    });

    return schema.validate(obj);
}

export {
    User,
    validationCreateUser,
    validationupdateUser,
    validationLoginUser
};