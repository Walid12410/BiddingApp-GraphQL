import { ApolloError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { User, validationCreateUser, validationLoginUser, validationupdateUser } from "../../model/user";
import { generateToken } from "../../lib/generateToken";


const userResolver = {
    Query: {
        getUser: async (_, {id}) => {
            try {
                const user = await User.findByPk(id);
                if (!user) {
                    throw new ApolloError("User not found", "404");
                }
                return user;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        getUsers: async(_,{page,limit}) => {
            try {
                const users = await User.findAll({
                    limit: limit,
                    offset: (page - 1) * limit
                });
                
                const userWithoutPassword = users.map(user=> {
                    // Convert Sequelize model to plain object if needed
                    const userObject = user.get ? user.get({plain: true}) : user;

                    const { password, ...userWithoutPassword } = userObject;

                    return userWithoutPassword;
                });

                return userWithoutPassword;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

    Mutation: {
        createUser: async(_,{input}, {res}) => {
            try {
                const {error} = validationCreateUser(input);
                if (error) {
                    throw new ApolloError(error.message, "400");
                }

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(input.password, salt);

                const user = await User.create({
                    ...input,
                    password: hashPassword
                });

                const token = generateToken(user.id, res);

                return {token, user};

            } catch (error) {
                throw new ApolloError(error.message, "500"); 
            }
        },

        loginUser: async(_,{input}, {res}) => {
            try {

                const {error} = validationLoginUser(input);
                if(error){
                    throw new ApolloError(error.message, "400");
                }

                const user = await User.findOne({
                    where: {
                        email : input.email
                    }
                });

                if (!user) {
                    throw new ApolloError("Incorrect email or password", "400");
                }

                const validPassword = await bcrypt.compare(input.password, user.password);

                if (!validPassword) {
                    throw new ApolloError("Incorrect email or password", "400");
                }

                const token = generateToken(user.id, res);

                return {token, user};

            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateUser: async(_, {input, id}) => {
            try {
                const {error} = validationupdateUser(input);
                if(error){
                    throw new ApolloError(error.message, "400");
                }

                const user = await User.findByPk(id);
                if(!user) {
                    throw new ApolloError("User not found", "404");
                }

                await user.update(input);
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }

    }
};


export default userResolver;