import { ApolloError } from "apollo-server-express";
import { Category, validationCreateCategory, validationUpdateCategory } from "../../model/category";
import { authenticateIsAdmin } from "../../lib/authCheck";
import { Product } from "../../model/product";


const categoryResolver = {
    Query: {
        getCategories: async (_) => {
            try {
                const categories = await Category.findAll();

                if (!categories || categories.length === 0) {
                    throw new ApolloError("No category added yet", "404");
                }
                return categories;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

    Mutation: {
        createCategory: async (_, { input }, { req }) => {
            try {
                authenticateIsAdmin(req);

                const { error } = validationCreateCategory(input);
                if (error) {
                    throw new ApolloError(error.details[0].message, "400");
                }

                const isExists = await Category.findOne({ where: { categoryName: input.categoryName } });
                if (isExists) {
                    throw new ApolloError("Category name already exists", "400");
                }

                const category = await Category.create({
                    categoryName: input.categoryName
                });

                return category;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateCategory: async (_, { input, id }, { req }) => {
            try {
                authenticateIsAdmin(req);

                const { error } = validationUpdateCategory(input);
                if (error) {
                    throw new ApolloError(error.details[0].message, "400");
                }

                const category = await Category.findByPk(id);
                if (!category) {
                    throw new ApolloError("Category not found", "404");
                }

                await category.update({
                    categoryName: input.categoryName
                });

                return category;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        deleteCategory: async (_, { id }, { req }) => {
            try {
                authenticateIsAdmin(req);

                const categoryUsed = await Product.findOne({ where: { categoryId: id } });
                if (categoryUsed) {
                    throw new ApolloError("Category is used in product", "400");
                }

                const category = await Category.findByPk(id);
                if (!category) {
                    throw new ApolloError("Category not found", "404");
                }

                await category.destroy();

                return "Category deleted successfully";
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    }
}

export default categoryResolver;
