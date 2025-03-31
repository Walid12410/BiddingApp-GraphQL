import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolver from "./resolver/userResolver";
import brandTypeDefs from "./typeDefs/brandTypeDefs";
import brandResovler from "./resolver/brandResolver";
import categoryTypeDefs from "./typeDefs/categoryTypeDefs";
import categoryResolver from "./resolver/categoryResolver";
import productTypeDefs from "./typeDefs/productTypeDefs";
import productResolver from "./resolver/productResolver";
import bidTypeDefs from "./typeDefs/BidTypeDefs";
import bidResolver from "./resolver/bidResolver";

const typeDefs = mergeTypeDefs([
    userTypeDefs,
    brandTypeDefs,
    productTypeDefs,
    categoryTypeDefs,
    bidTypeDefs
]);

const resolvers = mergeResolvers([
    userResolver,
    brandResovler,
    productResolver,
    categoryResolver,
    bidResolver
]);

export {
    typeDefs,
    resolvers
}