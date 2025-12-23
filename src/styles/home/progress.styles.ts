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
        justifyContent: "flex-start",
        width: "100%",
        padding: 5,
        gap: 10,
        marginBottom: 5,
    },
    subject: {
        backgroundColor: "#ffffff",
        width: "10%",
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    subject_character: {
        width: "90%",
        height: "70%",
        backgroundColor: Colors.OPTIONS_GREY,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    srs_bar: {
        backgroundColor: Colors.OPTIONS_GREY,
        height: "20%",
        width: "100%",
        borderRadius: 30,
    },
    srs_bar_filler: {
        height: "100%",
        backgroundColor: Colors.CORRECT_GREEN,
        borderRadius: 30,
    },
});
