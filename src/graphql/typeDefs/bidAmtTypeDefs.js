import { gql } from "apollo-server-express";


const BidAmtTypeDefs = gql`
    type BidAmt {
        id: ID!
        bidId: ID!
        userId: ID!
        amount: Int!
        createdAt: String!
    }

    input BidAmtInput {
        bidId: ID!
        userId: ID!
        amount: Int!
    }

    input BidAmtUpdateInput {
        amount: Int!
    }

    type Query {
        getBidAmts: [BidAmt!]!
        getBidAmt(id: ID!): BidAmt!
    }
    
    type Mutation {
        createBidAmt(input: BidAmtInput!): BidAmt!
        updateBidAmt(id: ID!, input: BidAmtUpdateInput!): BidAmt!
    }

`;

export default BidAmtTypeDefs;
