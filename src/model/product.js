import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Category } from "./category";
import { Brand } from "./brand";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productDescription: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }    
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageID: {
        type: DataTypes.TEXT("Long"),
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id'
        }
    }
});

Category.hasMany(Product, { foreignKey: 'categoryId' });
Brand.hasMany(Product, { foreignKey: 'brandId' });

export {
    Product
}