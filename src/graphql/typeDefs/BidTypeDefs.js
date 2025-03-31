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

    type Query {
        getBids: [Bid!]!
        getBid(id: ID!): Bid!
    }

    type Mutation {
        createBid(input: BidInput!): Bid!
        updateBid(id: ID!, input: BidInput!): Bid!
        deleteBid(id: ID!): Bid!
    }
`;

export default BidTypeDefs;
