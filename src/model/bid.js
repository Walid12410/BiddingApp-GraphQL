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


export {
    Bid
}