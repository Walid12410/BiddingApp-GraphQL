import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolver from "./resolver/userResolver";
import brandTypeDefs from "./typeDefs/brandTypeDefs";
import brandResovler from "./resolver/brandResolver";
import categoryTypeDefs from "./typeDefs/categoryTypeDefs";
import categoryResolver from "./resolver/categoryResolver";
import productTypeDefs from "./typeDefs/productTypeDefs";
import productResolver from "./resolver/productResolver";
import bidTypeDefs from "./typeDefs/bidTypeDefs";
import bidResolver from "./resolver/bidResolver";
import bidAmtTypeDefs from "./typeDefs/bidAmtTypeDefs";
import bidAmtResolver from "./resolver/bidAmtResolver";

const typeDefs = mergeTypeDefs([
    userTypeDefs,
    brandTypeDefs,
    productTypeDefs,
    categoryTypeDefs,
    bidTypeDefs,
    bidAmtTypeDefs
]);

const resolvers = mergeResolvers([
    userResolver,
    brandResovler,
    productResolver,
    categoryResolver,
    bidResolver,
    bidAmtResolver
]);

export {
    typeDefs,
    resolvers
}