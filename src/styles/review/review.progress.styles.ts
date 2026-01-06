/**
 * @file review.progress.styles.ts
 * @description
 *   Style sheets for the Review Progress component in Review screen.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const ReviewProgressStyles = StyleSheet.create({
    icon_view: {
        flexDirection: "row",
        backgroundColor: "transparent",
        alignItems: "center",
        gap: 10,
        alignSelf: "flex-start",
        paddingTop: 5,
        paddingHorizontal: 10,
        width: "100%",
    },
    icon_text: {
        fontFamily: "NotoSans-Bold",
        color: Colors.HEADER_WHITE,
        fontSize: 14,
    },
});
