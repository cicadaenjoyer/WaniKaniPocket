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
        character_images: Array<{ url: string }>;
        readings: any;
        meanings: any;
        meaning_mnemonic: string;
        reading_mnemonic: string;
        meaning_hint: string;
        reading_hint: string;
        pronunciation_audios: Array<{
            url: string;
            metadata: {
                gender: "string";
                voice_actor_id: number;
                voice_actor_name: "string";
                voice_description: "string";
            };
        }> | null;
    };
    srs_stage: number;
}

function convertSubject(subject_raw: Subject) {
    const partial_subject = {
        fill: "",
        type: subject_raw.object,
        q_type: "",
        slug: subject_raw.data.slug,
        characters: subject_raw.data.characters,
        character_image: subject_raw.data.character_images?.[0]?.url || "",
        readings: subject_raw.data.readings,
        meanings: subject_raw.data.meanings,
        m_explanation: subject_raw.data.meaning_mnemonic,
        r_explanation: subject_raw.data.reading_mnemonic,
        m_hint: subject_raw.data.meaning_hint,
        r_hint: subject_raw.data.reading_hint,
        // NOTE: API is returning dupe audios for some reason...
        pronunciation_audios: subject_raw.data.pronunciation_audios?.filter(
            (audio, index, self) =>
                index ===
                self.findIndex(
                    (a) =>
                        a.metadata.voice_actor_id ===
                        audio.metadata.voice_actor_id
                )
        ),
    };

    const subject_meaning = partial_subject;
    const subject_reading = partial_subject;

    subject_meaning.q_type = "meaning";
    subject_reading.q_type = "reading";
    switch (subject_raw.object) {
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
}

function convertSubjects(subjects_raw: Subject[]) {
    return subjects_raw.flatMap((subject) => {
        return convertSubject(subject);
    });
}

export const C_Utils = {
    convertSubject,
    convertSubjects,
};
