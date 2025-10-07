import * as SecureStore from "expo-secure-store";

const WEB_URL = "https://api.wanikani.com/v2";

async function getAllSubjects(query='') {
    const apiToken = SecureStore.getItem('WK_TOKEN');

    if (apiToken) {
        const headers: Headers = new Headers();
        headers.set('Authorization', `Bearer ${apiToken}`);
        headers.set('Wanikani-Revision', '20170710');

        const response = await fetch(`${WEB_URL}/subjects/${query}`, {
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
        } else {
            return await response.json();
        }
    }
}

async function getAllKanji() {
    return await getAllSubjects('?types=kanji');
}

async function getKanjiAtLevel(level: number) {
    return await getAllSubjects(`?types=kanji&levels=${level}`);
}

async function getAllRadicals() {
    return await getAllSubjects('?types=radical');
}

async function getRadicalsAtLevel(level: number) {
    return await getAllSubjects(`?types=radical&levels=${level}`);
}

export const SubjectsAPI = {
    getAllSubjects,
    getAllKanji,
    getKanjiAtLevel,
    getAllRadicals,
    getRadicalsAtLevel
}