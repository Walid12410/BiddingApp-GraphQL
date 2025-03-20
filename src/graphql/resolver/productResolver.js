import { ApolloError } from "apollo-server-express";
import { Product,
     validationCreateProduct,
    validationUpdateProduct,
    validationDeleteProduct
} from "../../model/product";
import { authenticateUser } from "../../lib/authCheck";
import { Brand, Category } from "../../model/product";



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
    }
}


export default productResolver;
