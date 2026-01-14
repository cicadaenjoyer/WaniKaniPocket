import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";

const WEB_URL = "https://api.gravatar.com/v3/profiles";

/**
 * Uses the Gravatar API to get the user's profile picture.
 *
 * @param {string} email - User's email addresss
 * @param {string} api_token - The Gravatar API token
 */
async function getUserIcon(email: string, api_token: string) {
    if (!email || !api_token) return;

    const headers: Headers = new Headers();
    headers.set("Authorization", `Bearer ${api_token}`);

    // Compute hash on user email
    const hashed_email = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        email.toLowerCase().trim()
    );

    const response = await fetch(`${WEB_URL}/${hashed_email}`, {
        method: "GET",
        headers: headers,
    });

    if (response.ok) {
        const data = await response.json();
        setUserIcon(data.avatar_url || "");
    }
}

async function setUserIcon(icon_link?: string) {
    // Set to gravtar icon link
    if (icon_link) {
        await SecureStore.setItemAsync("GRAVATAR_ICON", icon_link);
    }
}

export const GravatarAPI = {
    getUserIcon,
};
