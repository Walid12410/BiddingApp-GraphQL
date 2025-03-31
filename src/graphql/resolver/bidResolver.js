import { ApolloError } from "apollo-server-express";
import { Bid, validationCreateBid, validationUpdateBid } from "../../model/bid";
import { authenticateIsAdmin } from "../../lib/authCheck";
import { Product } from "../../model/product";
import { Brand } from "../../model/brand";
import { Category } from "../../model/category";
import { BidAmt } from "../../model/bidAmt";


const bidResolver = {
    Query: {
        getBids: async (_, {page, limit}) => {
            try {
                const bids = await Bid.findAll({
                    limit: limit,
                    offset: (page - 1) * limit,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'categoryId', 'brandId'],
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
                    ]
                });
                if (bids.length === 0) {
                    throw new ApolloError("No bids found", "404");
                }
                return bids;
            } catch (e) {
                throw new ApolloError(e.message || "An error occurred while fetching bids", "500");
            }
        },

        getBid: async (_, {id}) => {
            try {
                const bid = await Bid.findByPk(id, {
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'categoryId', 'brandId'],
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
                    ]
                });

                if(!bid){
                    throw new ApolloError("Bid not found", "404");
                }
                return bid;
            } catch (e) {
                throw new ApolloError(e.message || "An error occurred while fetching bid", "500");
            }
        }
    },


    Mutation: {
        createBid: async (_, {input}, {req}) => {
            try {
                authenticateIsAdmin(req);

                const {error} = validationCreateBid(input);
                if(error){
                    throw new ApolloError(error.message, "400");
                }
                
                const product = await Product.findByPk(input.productId);
                if(!product){
                    throw new ApolloError("Product not found", "404");
                }

                const bid = await Bid.create(input);
                return bid;
            } catch (e) {
                throw new ApolloError(e.message || "An error occurred while creating bid", "500");
            }
        },

        updateBid: async (_, {id, input}, {req}) => {
            try {
                authenticateIsAdmin(req);
                
                const {error} = validationUpdateBid(input);
                if(error){
                    throw new ApolloError(error.message, "400");
                }

                const bid = await Bid.findByPk(id);
                if(!bid){
                    throw new ApolloError("Bid not found", "404");
                }

                await bid.update(input);
                return bid;
            } catch (e) {
                throw new ApolloError(e.message || "An error occurred while updating bid", "500");
            }
        },

        deleteBid: async (_, {id}, {req}) => {
            try {
                authenticateIsAdmin(req);
                
                const bid = await Bid.findByPk(id);
                if(!bid){
                    throw new ApolloError("Bid not found", "404");
                }

                const bidInBidAmt = await BidAmt.findOne({
                    where: {
                        bidId: id
                    }
                });
                if(bidInBidAmt){
                    throw new ApolloError("Bid is in bid amount", "400");
                }

                await bid.destroy();
                return "Bid deleted successfully";
            } catch (e) {
                throw new ApolloError(e.message || "An error occurred while deleting bid", "500");
            }
        }
    }
    
}

export default bidResolver;
