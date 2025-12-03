/**
 * SubjectDefinition component acts as a parent component for SubjectSlug, Meaning, etc.
 *
 * @param {SubjectProps} subject - The subject to display.
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { View } from "react-native";

// Components
import SubjectSlug from "../subject/SubjectSlug";
import SubjectMeaning from "../subject/SubjectMeaning";
import SubjectReading from "../subject/SubjectReading";

// Styling
import { Colors } from "../../constants/colors";

// Interfaces
import { SubjectProps } from "../../interfaces/Subject";

const SubjectDefinition: React.FC<{ subject: SubjectProps }> = ({
    subject,
}) => {
    const subject_type = subject.type;
    const subject_slug =
        subject.type === "radical" ? subject.characters?.[0] : subject.slug;
    const subject_image = subject.character_image;
    const subject_readings = subject?.readings || "";
    const subject_main_meaning =
        subject?.meanings?.find((r) => r.primary)?.meaning || "";
    const subject_alt_meanings =
        subject?.meanings
            ?.filter((m) => !m.primary)
            ?.map((m) => m.meaning)
            .join(", ") || "";
    const r_explanation = subject?.r_explanation || "";
    const m_explanation = subject?.m_explanation || "";
    const r_hint = subject?.r_hint || "";
    const m_hint = subject?.m_hint || "";
    const pronunciations = subject?.pronunciation_audios || [];

    let subject_color = Colors.BASIC_BLACK;
    switch (subject.type) {
        case "radical":
            subject_color = Colors.RADICAL_BLUE;
            break;
        case "kanji":
            subject_color = Colors.KANJI_PINK;
            break;
        case "vocabulary":
            subject_color = Colors.VOCAB_PURPLE;
            break;
        default:
            subject_color = Colors.BASIC_BLACK;
            break;
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
            }}
        >
            {/* Subject Slug, Meaning, & Image */}
            <SubjectSlug
                fill={subject_color}
                slug={subject_slug}
                main_meaning={subject_main_meaning}
                subject_image={subject_image}
            />

            {/* Subject Detailed Primary/Alt Meanings, Explanation, & Hint*/}
            {subject_main_meaning && (
                <SubjectMeaning
                    type={subject_type}
                    main_meaning={subject_main_meaning}
                    alt_meanings={subject_alt_meanings}
                    meaning_explanation={m_explanation}
                    meaning_hint={m_hint}
                />
            )}

            {/* Subject Detailed Reading & Explanation */}
            {subject_readings && (
                <SubjectReading
                    type={subject_type}
                    readings_raw={subject_readings}
                    pronunciations={pronunciations}
                    reading_explanation={r_explanation}
                    reading_hint={r_hint}
                />
            )}

            {/* Subject Context */}
            {/* Subject Kanji Composition */}
        </View>
    );
};

export default SubjectDefinition;
