import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolver from "./resolver/userResolver";
import brandTypeDefs from "./typeDefs/brandTypeDefs";
import brandResovler from "./resolver/brandResolver";
import categoryTypeDefs from "./typeDefs/categoryTypeDefs";
import categoryResolver from "./resolver/categoryResolver";
import productTypeDefs from "./typeDefs/productTypeDefs";
import productResolver from "./resolver/productResolver";

const typeDefs = mergeTypeDefs([
    userTypeDefs,
    brandTypeDefs,
    productTypeDefs,
    categoryTypeDefs
]);

const resolvers = mergeResolvers([
    userResolver,
    brandResovler,
    productResolver,
    categoryResolver
]);

export {
    typeDefs,
    resolvers
}