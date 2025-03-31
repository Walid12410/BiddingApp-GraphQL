import gql from "graphql";

const BidTypeDefs = gql`
    type Bid {
        id: ID!
        startPrice: Int!
        startDate: String!
        endDate: String!
        status: String!
        winner: ID
        productId: ID!
        product: Product!
    }

    type BidInput {
        startPrice: Int!
        startDate: String!
        endDate: String!
        status: String!
        productId: ID!
    }

    type BidUpdateInput {
        startPrice: Int
        startDate: String
        endDate: String
        status: String
    }

    type Query {
        getBids: [Bid!]!
        getBid(id: ID!): Bid!
    }

    type Mutation {
        createBid(input: BidInput!): Bid!
        updateBid(id: ID!, input: BidUpdateInput!): Bid!
        deleteBid(id: ID!): Boolean!
    }
`;

export default BidTypeDefs;
