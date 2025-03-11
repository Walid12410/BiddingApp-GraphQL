import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

const Brand = sequelize.define("Brand",{
    brandName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export {
    Brand
};