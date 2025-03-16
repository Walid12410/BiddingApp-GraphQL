import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolver from "./resolver/userResolver";
import brandTypeDefs from "./typeDefs/brandTypeDefs";
import brandResovler from "./resolver/brandResolver";


const typeDefs = mergeTypeDefs([
    userTypeDefs,
    brandTypeDefs
]);

const resolvers = mergeResolvers([
    userResolver,
    brandResovler
]);

export {
    typeDefs,
    resolvers
}