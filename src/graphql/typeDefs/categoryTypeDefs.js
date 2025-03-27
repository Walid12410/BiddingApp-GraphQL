import gql from 'graphql';


const categoryTypeDefs = gql`
    type Category {
        id: ID!
        categoryName: String!
    }

    type EditInput {
        categoryName: STRING
    }

    type createInput {
        categoryName: STRING!
    }

    type Query {
        getCategories: [Category!]!,
    }
    
    type Mutation {
        createCategory(input: createInput!): Category!,
        updateCategory(input: EditInput!, id: ID!): Category!,
        deleteCategory(id: ID!): Category
    }
`;

export default categoryTypeDefs;
