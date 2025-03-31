import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Product } from "./product";
import { User } from "./user";

const Bid = sequelize.define('Bid', {
    bidId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    },
    winner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    }
});

Product.hasOne(Bid, { foreignKey: 'productId' });
User.hasOne(User, { foreignKey: 'winner' });


function validationCreateBid(input){
    const schema = Joi.object({
        startPrice: Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.string().required(),
        productId: Joi.number().required(),
    });

    return schema.validate(input);
}

function validationUpdateBid(input){
    const schema = Joi.object({
        startPrice: Joi.number().optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
        status: Joi.string().optional(),
    });

    return schema.validate(input);
}

export {
    Bid,
    validationCreateBid,
    validationUpdateBid
}