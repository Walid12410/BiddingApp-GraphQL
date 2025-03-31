import { ApolloError } from "apollo-server-express";
import { Product,
     validationCreateProduct,
    validationUpdateProduct,
} from "../../model/product";
import { authenticateIsAdmin } from "../../lib/authCheck";
import { Brand } from "../../model/brand";
import { Category } from "../../model/category";
import { Bid } from "../../model/bid";


const productResolver = {
    Query: {
        getProducts: async (_, {page, limit}) => {
            try {
                const products = await Product.findAll(
                    {
                        limit: limit,
                        offset: (page - 1) * limit,
                        include: [
                            {
                                model: Brand,
                                attributes: ['id', 'brandName']
                            },
                            {
                                model: Category,
                                attributes: ['id', 'categoryName']
                            }   
                        ]
                    }
                );
                if(!products || products.length === 0){
                    throw new ApolloError("No products found", "404");
                }
                return products;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        getProduct: async (_, {id}) => {
            try {
                const product = await Product.findByPk(id, {
                    include: [
                        {
                            model: Brand,
                            attributes: ['id', 'brandName']
                        },
                        {
                            model: Category,
                            attributes: ['id', 'categoryName']
                        }
                    ]
                });
                if(!product){
                    throw new ApolloError("Product not found", "404");
                }
                return product;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

    Mutation: {
        createProduct: async (_, {input}, {req}) => {
            try {
                authenticateIsAdmin(req);

                const {error} = validationCreateProduct(input);
                if(error){
                    throw new ApolloError(error.message, "400");
                }

                const brand = await Brand.findByPk(input.brandId);
                if(!brand){
                    throw new ApolloError("Brand not found", "404");
                }

                const category = await Category.findByPk(input.categoryId);
                if(!category){
                    throw new ApolloError("Category not found", "404");
                }

                const product = await Product.create(input);
                return product;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateProduct: async (_, {id, input}, {req}) => {
            try {
                authenticateIsAdmin(req);

                const {error} = validationUpdateProduct(input);
                if(error){
                    throw new ApolloError(error.message, "400");
                }

                const product = await Product.findByPk(id);
                if(!product){
                    throw new ApolloError("Product not found", "404");
                }

                await product.update(input);
                return product;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        deleteProduct: async (_, {id}, {req}) => {
            try {
                authenticateIsAdmin(req);

                const product = await Product.findByPk(id);
                if(!product){
                    throw new ApolloError("Product not found", "404");
                }

                const productInBid = await Bid.findOne({
                    where: {
                        productId: id
                    }
                });
                if(productInBid){
                    throw new ApolloError("Product is in bid", "400");
                }

                await product.destroy();
                return "Product deleted successfully";
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    }
    
}


export default productResolver;
