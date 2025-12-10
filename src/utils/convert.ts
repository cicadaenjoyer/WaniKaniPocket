/**
 * Utility functions for converting and transforming data structures
 * used throughout the application.
 *
 * @module C_Utils
 */

// Styling
import { Colors } from "../constants/colors";

// Interfaces
import { RawSubjectProps } from "../interfaces/RawSubject";

function convertSubject(subject_raw: RawSubjectProps) {
    const converted_subject = {
        id: subject_raw.id,
        fill: "",
        type:
            subject_raw.object === "kana_vocabulary"
                ? "vocabulary"
                : subject_raw.object,
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
        context_sentences: subject_raw.data.context_sentences,
        related_subject_ids: [
            ...(subject_raw.data?.amalgamation_subject_ids || []),
            ...(subject_raw.data?.component_subject_ids || []),
            ...(subject_raw.data?.visually_similar_subject_ids || []),
        ],
        is_kana: subject_raw.object === "kana_vocabulary",
    };
    switch (converted_subject.type) {
        case "radical":
            converted_subject.fill = Colors.RADICAL_BLUE;
            break;
        case "kanji":
            converted_subject.fill = Colors.KANJI_PINK;
            break;
        case "vocabulary":
            converted_subject.fill = Colors.VOCAB_PURPLE;
            break;
    }

    return [converted_subject];
}

function convertSubjects(subjects_raw: RawSubjectProps[]) {
    let subjects = subjects_raw.flatMap(convertSubject);

    for (let i = subjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [subjects[i], subjects[j]] = [subjects[j], subjects[i]];
    }

    return subjects;
}

export const C_Utils = {
    convertSubject,
    convertSubjects,
};
