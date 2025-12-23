/**
 * @file dashboard.styles.ts
 * @description
 *   Style sheets for dashboard-related UI components.
 *   Provides styles for assignment/review cards, icons, and dashboard buttons.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const DashboardStyles = StyleSheet.create({
    assignment: {
        width: "90%",
        minHeight: 140,
        borderRadius: 10,
        backgroundColor: Colors.LESSON_GREY,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    // Left Side of Assignment Card
    assignment_icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    // Right Side of Assignment Card
    assignment_info: {
        justifyContent: "center",
        width: "45%",
    },
    assignment_header: {
        fontFamily: "NotoSans-Bold",
        fontSize: 16,
        color: Colors.HEADER_WHITE,
    },
    assignment_subheader: {
        fontFamily: "NotoSans-Regular",
        fontSize: 13,
        color: Colors.HEADER_WHITE,
    },
    assignment_button_container: {
        alignItems: "center",
        width: "75%",
        backgroundColor: Colors.HEADER_WHITE,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 3,
        borderWidth: 0.5,
        borderBottomWidth: 3,
        marginTop: 10,
    },
    assignment_button_text: {
        fontFamily: "NotoSans-Bold",
        fontSize: 14,
    },
    card: {
        width: "95%",
        justifyContent: "center",
    },
});
