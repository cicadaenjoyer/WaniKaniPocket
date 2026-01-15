import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";

/**
 * Stores the user's Gravatar hashed email into memory
 *
 * @param {string} email - User's email addresss
 */
async function setUserIcon(email: string) {
    if (!email) return;

    // Compute hash on user email
    const hashed_email = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        email.toLowerCase().trim()
    );

    // Store hash in memory
    await SecureStore.setItemAsync("GRAVATAR_EMAIL", hashed_email);
}

export const GravatarAPI = {
    setUserIcon,
};
