import bcrypt from 'bcryptjs';
import {BCRYPT_SALT_ROUNDS} from "../config/env";

/**
 * Generates a bcrypt hashed password asynchronously
 * @param password Plain text password
 * @returns Promise resolving to hashed password string
 */
export const generateHashedPassword = async (password: string): Promise<string> => {
    const saltRound = Number(BCRYPT_SALT_ROUNDS)
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(password, salt);
}

/**
 * Validates a password against a hashed password asynchronously
 * @param password Plain text password
 * @param hashedPassword Previously hashed password
 * @returns Promise resolving to boolean indicating match
 */
export const validatePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};