import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Bid } from "./bid";
import { User } from "./user";

const BidAmt = sequelize.define('BidAmt', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bid,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

Bid.hasMany(BidAmt, { foreignKey: 'bidId' });
User.hasMany(BidAmt, { foreignKey: 'userId' });
BidAmt.belongsTo(Bid, { foreignKey: 'bidId' });
BidAmt.belongsTo(User, { foreignKey: 'userId' });

export {
    BidAmt
}