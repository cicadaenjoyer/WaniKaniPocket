/**
 * ProfileSection is a component in the home page menu bar that shows the user's profile icon,
 * current level, and subscription type
 *
 * @param {string} level - The user's current level
 * @param {number} subscription_type - The user's subscription type
 *
 * @returns {JSX.Element}
 */
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import * as SecureStore from "expo-secure-store";

// Styling
import { ProfileSectionStyles as styles } from "../../../styles/home/profile.styles";

const DEFAULT_AVATAR = require("../../../assets/images/profile/default_avatar.png");

const ProfileSection: React.FC<{
    username?: string;
    level?: number;
    subscription_type?: string;
}> = ({ username, level, subscription_type }) => {
    const [avatarIcon, setAvatarIcon] = useState(DEFAULT_AVATAR);

    useEffect(() => {
        (async () => {
            const email = await SecureStore.getItemAsync("GRAVATAR_EMAIL");
            if (!email) return;

            setAvatarIcon({
                uri: `https://www.gravatar.com/avatar/${email}?s=1000&d=404`,
            });
        })();
    }, []);

    return (
        <View style={styles.profile_section}>
            {/* Profile Picture */}
            <View style={styles.icon_view}>
                <Image
                    style={styles.profile_icon}
                    source={avatarIcon}
                    onError={() => setAvatarIcon(DEFAULT_AVATAR)}
                />
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
