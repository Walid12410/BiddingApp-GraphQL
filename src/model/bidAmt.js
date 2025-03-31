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
        allowNull: false,
        defaultValue: 0  // Optional
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Associations
Bid.hasMany(BidAmt, { foreignKey: 'bidId', onDelete: 'CASCADE' });
User.hasMany(BidAmt, { foreignKey: 'userId', onDelete: 'CASCADE' });

BidAmt.belongsTo(Bid, { foreignKey: 'bidId', onDelete: 'CASCADE' });
BidAmt.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });



function validationCreateBidAmt(input){
    const schema = Joi.object({
        bidId: Joi.number().required(),
        userId: Joi.number().required(),
        amount: Joi.number().required()
    });

    return schema.validate(input);
}

function validationUpdateBidAmt(input){
    const schema = Joi.object({
        amount: Joi.number().required()
    });

    return schema.validate(input);  
}

export { BidAmt, validationCreateBidAmt, validationUpdateBidAmt };
