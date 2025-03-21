import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Category } from "./category";
import { Brand } from "./brand";
import Joi from "joi";

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


function validationCreateProduct(input){
    const schema = Joi.object({
        productName: Joi.string().required(),
        productDescription: Joi.string().required(),
        productPrice: Joi.number().required(),
        stock: Joi.number().required(),
        categoryId: Joi.number().required(),
        brandId: Joi.number().required(),
    });

    return schema.validate(input);
}

function validationUpdateProduct(input){
    const schema = Joi.object({
        productName: Joi.string().optional(),
        productDescription: Joi.string().optional(),
        productPrice: Joi.number().optional(),
        stock: Joi.number().optional(),
        categoryId: Joi.number().optional(),
        brandId: Joi.number().optional(),
    });
    return schema.validate(input);
}

function validationDeleteProduct(input){
    const schema = Joi.object({
        id: Joi.number().required(),
    });
    return schema.validate(input);
}

export {
    Product,
    validationCreateProduct,
    validationUpdateProduct,
    validationDeleteProduct
}