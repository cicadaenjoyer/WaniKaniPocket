import * as SecureStore from "expo-secure-store";

const WEB_URL = "https://api.wanikani.com/v2";

async function login(api_token: string) {
    const headers: Headers = new Headers();
    headers.set("Authorization", `Bearer ${api_token}`);

    const response = await fetch(`${WEB_URL}/user`, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new Error("Unauthorized: Invalid API token");
            case 404:
                throw new Error("Not Found: Endpoint does not exist");
            default:
                throw new Error(
                    `API Error: ${response.status} ${response.statusText}`
                );
        }
    } else {
        if (await SecureStore.getItemAsync("WK_TOKEN")) {
            console.log(
                "API Token has already been stored. How'd you get here?"
            );
            return true;
        } else {
            try {
                await SecureStore.setItemAsync("WK_TOKEN", api_token);
                console.log("Successfully stored API Token.");
                return true;
            } catch (e) {
                console.error(e);
            }
        }
    }

    return await response.json();
}

export const AuthAPI = {
    login,
};
