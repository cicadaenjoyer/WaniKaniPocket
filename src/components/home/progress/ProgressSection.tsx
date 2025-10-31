/**
 * @file ProgressSection.tsx
 * @description
 *   Displays the user's current level and a progress bar for kanji mastery at that level.
 *   Fetches user info on mount to determine the current level, then renders a Progress Bar.
 *
 *   - Fetches user level from UserAPI on mount.
 *   - Renders the level and a Progress Bar for that level.
 *   - Handles loading state.
 *
 * @module components/home/progress/ProgressSection
 */

import React from "react";
import { View, Text } from "react-native";

// Styling
import { HomeStyles } from "../../../styles/globals";

// Components
import Bar from "./Bar";
import Subjects from "./Subjects";

interface ProgressSectionProps {
    label: string;
    userLevel: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
    label,
    userLevel,
}) => {
    return (
        <View style={HomeStyles.progress_container}>
            <Text>Level {userLevel} Progress</Text>
            <Bar level={userLevel} />
            <Subjects level={userLevel} type={"radicals"} />
            <Subjects level={userLevel} type={"kanji"} />
        </View>
    );
};

export default ProgressSection;
