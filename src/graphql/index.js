import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs";
import userResolver from "./resolver/userResolver";


const typeDefs = mergeTypeDefs([
    userTypeDefs
]);

const resolvers = mergeResolvers([
    userResolver
]);

export {
    typeDefs,
    resolvers
}