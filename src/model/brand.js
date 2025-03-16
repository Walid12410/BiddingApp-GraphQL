import Joi from "joi";
import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

const Brand = sequelize.define("Brand",{
    brandName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


function validationCreateBrand(obj) {
    const schema = Joi.object({
        brandName: Joi.string().min(1).max(50).trim().required()
    });

    return schema.validate(obj);
}

function validationUpdateBrand(obj) {
    const schema = Joi.object({
        brandName: Joi.string().min(1).max(50).trim().optional()
    });

    return schema.validate(obj);
}


export {
    Brand,
    validationUpdateBrand,
    validationCreateBrand
};