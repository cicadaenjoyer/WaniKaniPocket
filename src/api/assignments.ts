import * as SecureStore from "expo-secure-store";

const WEB_URL = "https://api.wanikani.com/v2";

async function getAssignments(query: string = "") {
    const apiToken = SecureStore.getItem("WK_TOKEN");

    if (apiToken) {
        const headers: Headers = new Headers();
        headers.set("Authorization", `Bearer ${apiToken}`);
        headers.set("Wanikani-Revision", "20170710");

        const response = await fetch(`${WEB_URL}/assignments/${query}`, {
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
            return await response.json();
        }
    }
}

async function getAssignmentsBatch() {
    const assignments = await getAssignments(
        "?immediately_available_for_lessons=true"
    );
    const lessonsPerSession = 15; // NOTE: not sure how WK gets the session batch size, hardcoding for now...

    return {
        ...assignments,
        data: assignments.data.slice(0, lessonsPerSession),
        total_count: lessonsPerSession,
    };
}

async function getKanjiAssignments() {
    return await getAssignments("?subject_types=kanji");
}

async function getKanjiAssignmentsAtLevel(level: number) {
    return await getAssignments(`?subject_types=kanji&levels=${level}`);
}

async function getRadicalAssignments() {
    return await getAssignments("?subject_types=radical");
}

async function getRadicalAssignmentsAtLevel(level: number) {
    return await getAssignments(`?subject_types=radical&levels=${level}`);
}

export const AssignmentsAPI = {
    getAssignments,
    getAssignmentsBatch,
    getKanjiAssignments,
    getKanjiAssignmentsAtLevel,
    getRadicalAssignments,
    getRadicalAssignmentsAtLevel,
};
