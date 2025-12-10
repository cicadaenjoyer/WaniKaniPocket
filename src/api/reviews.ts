import * as SecureStore from "expo-secure-store";

// Interfaces
import { ReviewProps } from "../interfaces/Review";

const WEB_URL = "https://api.wanikani.com/v2";

async function postReview(review: ReviewProps) {
    const apiToken = SecureStore.getItem("WK_TOKEN");

    if (apiToken) {
        const headers: Headers = new Headers();
        headers.set("Authorization", `Bearer ${apiToken}`);
        headers.set("Wanikani-Revision", "20170710");
        headers.set("Content-Type", "application/json");

        const response = await fetch(`${WEB_URL}/reviews`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                review: {
                    created_at: review.created_at,
                    assignment_id: review.assignment_id,
                    incorrect_meaning_answers: review.incorrect_meaning_answers,
                    incorrect_reading_answers: review.incorrect_reading_answers,
                },
            }),
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
        }
    }
}

export const ReviewsAPI = {
    postReview,
};
