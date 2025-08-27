const WEB_URL = "https://api.wanikani.com/v2";

async function login(apiToken: string) {
    const headers: Headers = new Headers();
    headers.set('Authorization', `Bearer ${apiToken}`);

    const response = await fetch(`${WEB_URL}/user`, {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        switch (response.status){
            case 401:
                throw new Error("Unauthorized: Invalid API token");
            case 404:
                throw new Error("Not Found: Endpoint does not exist");
            default:
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
    }

    return await response.json();
}

export const AuthAPI = {
    login,
}