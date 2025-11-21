import {HOST_URL, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ALGORITHM, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN} from "./env";
import {jwtVerify, SignJWT} from "jose";
import {ForbiddenError} from "../utils/http";


const accessSecret = new TextEncoder().encode(JWT_ACCESS_TOKEN_SECRET);
const refreshSecret = new TextEncoder().encode(JWT_REFRESH_TOKEN_SECRET);

const alg = JWT_ALGORITHM;

export const generateAccessToken = async (user: {id: number, role: string}) => {
    return await new SignJWT({role: user.role})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setSubject(user.id.toString())
        .setIssuer(HOST_URL)
        .setExpirationTime(JWT_ACCESS_EXPIRES_IN)
        .sign(accessSecret);
}

export const generateRefreshToken = async (user: {id: number}) => {
    return await new SignJWT({})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setSubject(user.id.toString())
        .setIssuer(HOST_URL)
        .setExpirationTime(JWT_REFRESH_EXPIRES_IN) // e.g. "7d"
        .sign(refreshSecret);
}

export const validateAccessToken = async (token: string) => {
    try {
        const {payload} = await jwtVerify(token, accessSecret, {
            issuer: HOST_URL
        })
        return payload;
    }catch (error) {
        throw new ForbiddenError("Invalid or expired access token");
    }
}

export const validateRefreshToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, refreshSecret, {
            issuer: HOST_URL,
        });
        return payload;
    } catch (error) {
        throw new ForbiddenError("Invalid or expired refresh token");
    }
};
