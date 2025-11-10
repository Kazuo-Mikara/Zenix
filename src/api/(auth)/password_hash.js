import bcrypt from 'bcryptjs';

// The number of salt rounds determines the computational cost of hashing.
// 10 is a good standard default.
const SALT_ROUNDS = 10;

/**
 * Hashes a plaintext password using bcrypt.
 * @param {string} password - The plaintext password.
 * @returns {Promise<string>} The hashed password.
 */
export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

/**
 * Compares a plaintext password with a stored hash.
 * @param {string} password - The plaintext password.
 * @param {string} hash - The stored password hash.
 * @returns {Promise<boolean>} True if passwords match, false otherwise.
 */
export async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
}