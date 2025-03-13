import gql from 'graphql';

const userTypeDefs = gql`
    type User {
        id: ID!,
        username: STRING!,
        email: STRING!,
        number: STRING!,
        password: STRING!,
        isAdmin: BOOLEAN!
    },

    type AuthPayload {
        token: String!,
        user: User!
    },

    type SignupInput {
        username: STRING!,
        email: STRING!,
        number: STRING!,
        password: STRING!,
    }

    type LoginInput {
        email: STRING!,
        password: STRING!
    }

    type EditInput {
        username: STRING,
        number: STRING,
        password: STRING,
    }

    type Query {
        getUsers(page: Int = 1, limit: Int = 10): [User!]!,
        getUser(id: ID!): User!
    },

    type Mutation {
        loginUser(inpup: LoginInput!): AuthPayload!,
        createUser(input: SignupInput!): AuthPayload!,
        updateUser(input: EditInput!, id: ID!): User!,
    }
`;


export default userTypeDefs;