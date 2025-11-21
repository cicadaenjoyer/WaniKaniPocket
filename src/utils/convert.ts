/**
 * Utility functions for converting and transforming data structures
 * used throughout the application.
 *
 * @module C_Utils
 */

// Styling
import { Colors } from "../constants/colors";

interface Subject {
    object: "radical" | "kanji" | "vocabulary";
    data: {
        slug: string;
        characters: string;
        readings: any;
        meanings: any;
    };
}

function convertSubjects(subjects_raw: Subject[]) {
    return subjects_raw.flatMap((subject) => {
        const [subject_reading, subject_meaning] = [
            {
                fill: "",
                type: subject.object,
                q_type: "reading",
                slug: subject.data.slug,
                characters: subject.data.characters,
                readings: subject.data.readings,
            },
            {
                fill: "",
                type: subject.object,
                q_type: "meaning",
                slug: subject.data.slug,
                characters: subject.data.characters,
                meanings: subject.data.meanings,
            },
        ];
        switch (subject.object) {
            case "radical":
                subject_reading.fill = Colors.RADICAL_BLUE;
                subject_meaning.fill = Colors.RADICAL_BLUE;
                break;
            case "kanji":
                subject_reading.fill = Colors.KANJI_PINK;
                subject_meaning.fill = Colors.KANJI_PINK;
                break;
            case "vocabulary":
                subject_reading.fill = Colors.VOCAB_PURPLE;
                subject_meaning.fill = Colors.VOCAB_PURPLE;
                break;
        }

        return [subject_meaning, subject_reading];
    });
}

export const C_Utils = {
    convertSubjects,
};
