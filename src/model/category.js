import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category",{
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export {
    Category
};