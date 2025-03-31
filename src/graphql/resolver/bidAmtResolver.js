import { ApolloError } from "apollo-server-express";
import { BidAmt, validationCreateBidAmt, validationUpdateBidAmt } from "../../model/bidAmt";
import { authenticateIsAdmin, authenticateUser } from "../../lib/authCheck";
import { Bid } from "../../model/bid";
import { Product } from "../../model/product";
import { Brand } from "../../model/brand";
import { Category } from "../../model/category";


const bidAmtResolver = {
    Query: {
        getBidAmts: async (_, { page, limit }) => {
            try {
                const bidAmts = await BidAmt.findAll({
                    limit: limit,
                    offset: (page - 1) * limit,
                    include: [
                        {
                            model: Bid,
                            attributes: ['id', 'startPrice', 'startDate', 'endDate', 'status'],
                            include: [
                                {
                                    model: Product,
                                    attributes: ['id', 'brandId', 'categoryId'],
                                    include: [
                                        {
                                            model: Brand,
                                            attributes: ['id', 'name']
                                        },
                                        {
                                            model: Category,
                                            attributes: ['id', 'name']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
                if (bidAmts.length === 0) {
                    throw new ApolloError("No bid amounts found", "404");
                }
                return bidAmts;
            } catch (error) {
                throw new ApolloError(error.message || "An error occurred while fetching bid amounts", "500");
            }
        },

        getBidAmt: async (_, { id }) => {
            try {
                const bidAmt = await BidAmt.findByPk(id, {
                    include: [
                        {
                            model: Bid,
                            attributes: ['id', 'startPrice', 'startDate', 'endDate', 'status'],
                            include: [
                                {
                                    model: Product,
                                    attributes: ['id', 'brandId', 'categoryId'],
                                    include: [
                                        {
                                            model: Brand,
                                            attributes: ['id', 'name']
                                        },
                                        {
                                            model: Category,
                                            attributes: ['id', 'name']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });

                if (!bidAmt) {
                    throw new ApolloError("Bid amount not found", "404");
                }
                return bidAmt;
            } catch (error) {
                throw new ApolloError(error.message || "An error occurred while fetching bid amount", "500");
            }
        },
    },

    Mutation: {
        createBidAmt: async (_, { input }, { req }) => {
            try {

                authenticateUser(req);

                const { error } = validationCreateBidAmt(input);
                if (error) {
                    throw new ApolloError(error.message, "400");
                }

                const bid = await Bid.findByPk(input.bidId);
                if (!bid) {
                    throw new ApolloError("Bid not found", "404");
                }

                if (bid.status !== "active") {
                    throw new ApolloError("Bid is not active", "400");
                }

                const bidAmt = await BidAmt.create(input);
                return bidAmt;
            } catch (error) {
                throw new ApolloError(error.message || "An error occurred while creating bid amount", "500");
            }
        },

        updateBidAmt: async (_, { id, input }, { req }) => {
            try {
                authenticateUser(req);

                const { error } = validationUpdateBidAmt(input);
                if (error) {
                    throw new ApolloError(error.message, "400");
                }

                const bidAmt = await BidAmt.findByPk(id);
                if (!bidAmt) {
                    throw new ApolloError("Bid amount not found", "404");
                }

                await bidAmt.update(input);
                return bidAmt;
            } catch (error) {
                throw new ApolloError(error.message || "An error occurred while updating bid amount", "500");
            }
        },

    },


}

export default bidAmtResolver;
