/**
 * @file lesson.navigator.styles.ts
 * @description
 *   Style sheets for the navigator component on Lessons screen.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const LessonNavigatorStyles = StyleSheet.create({
    navigator: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
    },
    subject_button_view: {
        height: "auto",
        paddingHorizontal: 2,
        borderRadius: 8,
        alignItems: "center",
    },
    slug: {
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    slug_text: {
        color: Colors.HEADER_WHITE,
        fontSize: 16,
        fontFamily: "NotoSansJP-Bold",
        lineHeight: 28,
    },
    reviews: {
        height: "auto",
        justifyContent: "center",
        borderColor: Colors.CORRECT_GREEN_ACCENT,
        backgroundColor: Colors.CORRECT_GREEN,
        borderWidth: 1,
        borderRadius: 5,
        borderBottomWidth: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
});
