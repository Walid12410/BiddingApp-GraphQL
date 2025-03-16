import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-express";


export const authenticateUser = (req) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApolloError("Unauthorized: No token provided", "401");
        }

        // Verify the token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        if (!decoded) {
            throw new ApolloError("Unauthorized: Invalid token", "401");
        }

        return decoded; // Return decoded token (contains user data)
    } catch (error) {
        throw new ApolloError(error.message, "401");
    }
};


export const authenticateIsAdmin = (req) => {
    const user = authenticateUser(req); // Authenticate user
    if (user.role !== "admin") {
        throw new ApolloError("Forbidden: Admin access required", "403");
    }
    return user; // Return user if admin
};

