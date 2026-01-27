/**
 * @file subject.defintion.styles.ts
 * @description
 *  Style sheets for subject definition in Subject screen. Includes styles for
 *  Subject Context, Meaning, Reading, Slug, etc
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const SubjectSlugStyles = StyleSheet.create({
    slug: {
        alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingTop: 2,
        paddingBottom: 4,
        paddingHorizontal: 12,
    },
    slug_text: {
        fontFamily: "NotoSansJP-Bold",
        fontSize: 28, // NOTE: make dynamic later
        color: Colors.HEADER_WHITE,
        lineHeight: 40,
    },
    meaning: {
        fontFamily: "NotoSans-Regular",
        fontSize: 25, // NOTE: make dynamic later
        color: Colors.BASIC_BLACK,
    },
});

export const SubjectReadingStyles = StyleSheet.create({
    header: {
        fontFamily: "NotoSans-Regular",
        fontSize: 20, // NOTE: make dynamic later
        color: Colors.BASIC_BLACK,
    },
    readings_table: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "flex-start",
    },
    reading: {
        fontFamily: "NotoSans-Bold",
        fontSize: 14, // NOTE: make dynamic later
        color: Colors.LESSON_GREY,
    },
    pronunciation: {
        fontFamily: "NotoSans-Bold",
        fontSize: 9,
    },
    explanation: {
        fontFamily: "NotoSans-Regular",
        fontSize: 14, // NOTE: make dynamic later
        color: Colors.LESSON_GREY,
        paddingTop: 12,
    },
    hint: {
        backgroundColor: Colors.LESSON_LIGHT_GREY,
        borderRadius: 10,
        padding: 15,
    },
});

export const SubjectMeaningStyles = StyleSheet.create({
    header: {
        fontFamily: "NotoSans-Regular",
        fontSize: 20, // NOTE: make dynamic later
        color: Colors.BASIC_BLACK,
    },
    meaning: {
        fontFamily: "NotoSans-Bold",
        fontSize: 14, // NOTE: make dynamic later
        color: Colors.LESSON_GREY,
    },
    explanation: {
        fontFamily: "NotoSans-Regular",
        fontSize: 14, // NOTE: make dynamic later
        color: Colors.LESSON_GREY,
        paddingTop: 12,
    },
    hint: {
        backgroundColor: Colors.LESSON_LIGHT_GREY,
        borderRadius: 10,
        padding: 15,
    },
});

export const SubjectContextStyles = StyleSheet.create({
    header: {
        fontFamily: "NotoSans-Regular",
        fontSize: 20, // NOTE: make dynamic later
        color: Colors.BASIC_BLACK,
    },
    context_sentence: {
        fontFamily: "NotoSans-Regular",
        fontSize: 14, // NOTE: make dynamic later
        color: Colors.LESSON_GREY,
    },
});

export const RelatedSubjectsStyles = StyleSheet.create({
    header: {
        fontFamily: "NotoSans-Regular",
        fontSize: 20, // NOTE: make dynamic later
        color: Colors.BASIC_BLACK,
    },
    grid: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
});
