import gql from 'graphql';

const brandTypeDefs = gql`
    type Brand {
        id: ID!,
        brandName: STRING!
    }

    type EditInput {
        brandName: STRING
    }

    type createInput {
        brandName: STRING!
    }

    type Query {
        getBrands: [Brand!]!,
    }

    type Mutation {
        createBrand(input: createInput!): Brand!,
        updateBrand(input: EditInput!, id: ID!): Brand!,
        deleteBrand(id: ID!): Brand
    }
`;

export default brandTypeDefs;