/**
 * A utility function to grab related subjects
 *
 * @module R_Utils
 */

// API
import { SubjectsAPI } from "../api/subjects";

// Utils
import { C_Utils } from "./convert";

// Interfaces
import { SubjectProps } from "../interfaces/Subject";

async function getRelatedSubjects(
    subject_ids: Array<number>
): Promise<{
    radicals: SubjectProps[];
    kanji: SubjectProps[];
    vocabulary: SubjectProps[];
}> {
    const subjects_raw = await SubjectsAPI.getSubjectsWithId(
        subject_ids.join(",")
    );
    const subjects_formatted = C_Utils.convertSubjects(subjects_raw.data);
    const related_subjects = {
        radicals: subjects_formatted.filter(
            (subject) => subject.type === "radical"
        ),
        kanji: subjects_formatted.filter((subject) => subject.type === "kanji"),
        vocabulary: subjects_formatted.filter(
            (subject) => subject.type === "vocabulary"
        ),
    };

    return related_subjects;
}

export const R_Utils = {
    getRelatedSubjects,
};
