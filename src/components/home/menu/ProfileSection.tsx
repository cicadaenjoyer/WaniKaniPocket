/**
 * ProfileSection is a component in the home page menu bar that shows the user's profile icon,
 * current level, and subscription type
 *
 * @param {string} level - The user's current level
 * @param {number} subscription_type - The user's subscription type
 *
 * @returns {JSX.Element}
 */
import React from "react";
import { View, Text, Image } from "react-native";
import * as SecureStore from "expo-secure-store";

// Styling
import { ProfileSectionStyles as styles } from "../../../styles/home/profile.styles";

const ProfileSection: React.FC<{
    username?: string;
    level?: number;
    subscription_type?: string;
}> = ({ username, level, subscription_type }) => {
    const profile_icon = SecureStore.getItem("GRAVATAR_ICON");
    return (
        <View style={styles.profile_section}>
            {/* Profile Picture */}
            <View style={styles.icon_view}>
                <Image
                    style={styles.profile_icon}
                    source={
                        profile_icon
                            ? { uri: profile_icon }
                            : require("../../../assets/images/profile/default_avatar.png")
                    }
                ></Image>
            </View>

            {/* User Level and Subscription */}
            <View style={styles.level_view}>
                <Text style={styles.level_text}>{username}</Text>
                <Text style={styles.level_text}>
                    Level {level} |{" "}
                    {(subscription_type?.charAt(0).toUpperCase() || "") +
                        (subscription_type?.slice(1) || "")}
                </Text>
            </View>
        </View>
    );
};

export default ProfileSection;
