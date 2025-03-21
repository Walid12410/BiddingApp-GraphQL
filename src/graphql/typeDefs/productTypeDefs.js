import gql from 'graphql';

const productTypeDefs = gql`
    type Product {
       id: Int!
       productName: String!
       productDescription: String!
       productPrice: Int!
       stock: Int!
       image: String!   
       imageID: String!
       categoryId: Int!
       brandId: Int!
       brand: Brand!
       category: Category!
    }


    type ProductInput {
        productName: String!
        productDescription: String!
        productPrice: Int!
        stock: Int!
        image: String!
    }

    type ProductUpdateInput {
        productName: String
        productDescription: String
        productPrice: Int
        stock: Int
        image: String
    }

    type ProductDeleteInput {
        id: Int!
    }
    
    type Query {
        getProducts(page: Int = 1, limit: Int = 10): [Product!]!
        getProduct(id: ID!): Product!
    }
        

    type Mutation {
        createProduct(input: ProductInput!): Product!
        updateProduct(id: ID!, input: ProductUpdateInput!): Product!
        deleteProduct(id: ID!): Product!
    }
`;

export default productTypeDefs;