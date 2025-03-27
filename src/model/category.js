import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import Joi from "joi";

const Category = sequelize.define("Category",{
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const validationCreateCategory = (input) => {
    const schema = Joi.object({
        categoryName: Joi.string().required().min(3).max(50)
    });
    return schema.validate(input);
}

const validationUpdateCategory = (input) => {
    const schema = Joi.object({
        categoryName: Joi.string().optional().min(3).max(50)
    });
    return schema.validate(input);
}



export {
    Category,
    validationCreateCategory,
    validationUpdateCategory
};