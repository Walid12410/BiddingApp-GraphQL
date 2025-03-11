import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Category } from "./category";
import { Brand } from "./brand";


const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

Product.belongsTo(Category, {
    foreignKey: {
        name: "categoryId",
        allowNull: false
    },
    onDelete: 'CASCADE'
});

Product.belongsTo(Brand, {
    foreignKey: {
        name: "brandId",
        allowNull: false
    },
    onDelete: 'CASCADE'
});

export {
    Product
}