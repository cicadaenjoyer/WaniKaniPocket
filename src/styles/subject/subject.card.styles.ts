/**
 * @file subject.card.styles.ts
 * @description
 *   Style sheets for subject card in Subject screen.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const SubjectCardStyles = StyleSheet.create({
    container: {
        height: "auto",
        backgroundColor: Colors.HEADER_WHITE,
        borderColor: Colors.LESSON_GREY,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: "center",
    },
    slug: {
        borderRadius: 8,
        paddingTop: 2,
        paddingBottom: 4,
        paddingHorizontal: 10,
    },
    slug_text: {
        color: "#ffffff",
        fontSize: 24,
        fontFamily: "NotoSansJP-Bold",
        lineHeight: 38,
    },
    reading: {
        color: Colors.BASIC_BLACK,
        fontFamily: "NotoSansJP-Regular",
        fontSize: 13,
        lineHeight: 20,
    },
    meaning: {
        color: Colors.READING_HIGHLIGHT_FILL,
        fontFamily: "NotoSans-Regular",
        fontSize: 13,
    },
});
