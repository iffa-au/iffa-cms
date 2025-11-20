import {HOST_URL, JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRES_IN} from "./env";
import {jwtVerify, SignJWT} from "jose";
import {ForbiddenError} from "../utils/http";


const secretEncoded = new TextEncoder().encode(JWT_SECRET);

const alg = JWT_ALGORITHM;

export const generateJWToken = async(payload: Record<string, any>): Promise<string> => {
    return await new SignJWT({
        id: payload.id,
        role: payload.role
    })
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setSubject(payload.email)
        .setIssuer(HOST_URL)
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(secretEncoded);
}

export const validateJWToken = async(token: string) => {
    try{
        const {payload} = await jwtVerify(token, secretEncoded, {
            issuer: HOST_URL,
        })
        return payload;
    }catch(error){
        throw new ForbiddenError()
    }

}

