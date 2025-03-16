import { ApolloError } from "apollo-server-express";
import { Brand, validationCreateBrand, validationUpdateBrand } from "../../model/brand";
import { authenticateUser } from "../../lib/authCheck";


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
        createBrand: async(_, {input}) => {
            try {
                const {error} = validationCreateBrand(input);
                if(error){
                    throw new ApolloError(error.details[0].message,"400");
                }

                const isExists = await Brand.findOne({ where: { brandName: input.brandName } });
                if(isExists){
                    throw new ApolloError("Brand name already exists","400");
                }

                const brand = await Brand.create({
                    brandName: input.brandName
                });

                return brand;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateBrand: async(_, {input, id}, {req}) => {
            try {
                
                authenticateUser(req);

                const {error} = validationUpdateBrand(input);
                if(error){
                    throw new ApolloError(error.details[0].message,"400");
                }

                const brand = await Brand.findByPk(id);
                if(!brand){
                    throw new ApolloError("Brand not found", "404");
                }

                await brand.update(input);
                return brand;
            } catch (error) {
                throw new ApolloError(error.message, "500");  
            }
        },

        //@TODO delete method : check if it use in brand model
    }
};

export default brandResovler;