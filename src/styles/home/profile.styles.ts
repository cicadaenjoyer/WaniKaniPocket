/**
 * @file profile.styles.ts
 * @description
 *   Style sheets for the Profile section in Home screen.
 */

import { StyleSheet } from "react-native";

export const ProfileSectionStyles = StyleSheet.create({
    profile_section: {
        flexDirection: "row",
        gap: 15,
        height: "80%",
        marginRight: "auto",
        marginLeft: 10,
    },
    icon_view: {
        height: "100%",
        width: 45,
    },
    level_view: {
        flexDirection: "column",
        height: "100%",
        alignContent: "center",
    },
    profile_icon: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        overflow: "hidden",
        resizeMode: "cover",
    },
    level_text: {
        fontFamily: "NotoSans-Regular",
        fontSize: 13,
    },
});
