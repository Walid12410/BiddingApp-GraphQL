import { ApolloError } from "apollo-server-express";
import { Brand, validationCreateBrand, validationUpdateBrand } from "../../model/brand";
import { authenticateUser } from "../../lib/authCheck";
import { Product } from "../../model/product";

const brandResovler = {
    Query: {
        getBrands: async (_) => {
            try {
                const brands = await Brand.findAll();
                if (!brands || brands.length === 0) {
                    throw new ApolloError("No brand added yet", "404");
                }
                return brands;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

    Mutation: {
        createBrand: async (_, { input }) => {
            try {
                const { error } = validationCreateBrand(input);
                if (error) {
                    throw new ApolloError(error.details[0].message, "400");
                }

                const isExists = await Brand.findOne({ where: { brandName: input.brandName } });
                if (isExists) {
                    throw new ApolloError("Brand name already exists", "400");
                }

                const brand = await Brand.create({
                    brandName: input.brandName
                });

                return brand;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateBrand: async (_, { input, id }, { req }) => {
            try {

                authenticateUser(req);

                const { error } = validationUpdateBrand(input);
                if (error) {
                    throw new ApolloError(error.details[0].message, "400");
                }

                const brand = await Brand.findByPk(id);
                if (!brand) {
                    throw new ApolloError("Brand not found", "404");
                }

                await brand.update(input);
                return brand;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        deleteBrand: async (_, { id }, { req }) => {
            try {
                authenticateUser(req);

                const brandUsed = await Product.findOne({ where: { brandId: id } });
                if (brandUsed) {
                    throw new ApolloError("Brand is used in product", "400");
                }

                const brand = await Brand.findByPk(id);
                if (!brand) {
                    throw new ApolloError("Brand not found", "404");
                }

                await brand.destroy();
                return "Brand deleted successfully";

            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    }
};

export default brandResovler;