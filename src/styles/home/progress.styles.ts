/**
 * @file progress.styles.ts
 * @description
 *   Style sheets for progress-related components.
 *   Provides styles for the progress bar, its filler, and the label.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const ProgressStyles = StyleSheet.create({
    // Level Progression / Progress Bar
    bar: {
        height: 20,
        width: "100%",
        backgroundColor: Colors.OPTIONS_GREY,
        borderRadius: 30,
        flexDirection: "row",
    },
    filler: {
        height: "100%",
        backgroundColor: Colors.KANJI_PINK,
        borderRadius: 30,
        alignItems: "flex-end",
        paddingRight: 10,
    },
    label: {
        fontFamily: "NotoSans-Regular",
        paddingLeft: 5,
    },
    // Kanji/Radical Progression Table
    subject_container: {
        backgroundColor: "#ffffff",
    },
    grid: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        padding: 5,
        gap: 10,
        marginBottom: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.READING_HIGHLIGHT_BACK,
    },
    progress_container: {
        backgroundColor: "#ffffff",
        width: "11%",
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    progress_fill: {
        width: "95%",
        height: "80%",
        backgroundColor: Colors.OPTIONS_GREY,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingTop: 2,
        paddingBottom: 4,
    },
    progress_text: {
        color: "#ffffff",
        fontFamily: "NotoSansJP-Bold",
        fontSize: 18,
        lineHeight: 20,
    },
    srs_bar: {
        backgroundColor: Colors.OPTIONS_GREY,
        height: "12%",
        width: "100%",
        borderRadius: 30,
    },
    srs_bar_filler: {
        height: "100%",
        backgroundColor: Colors.CORRECT_GREEN,
        borderRadius: 30,
    },
});
