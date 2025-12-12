/**
 * Assignments component displays the user's current assignment count and provides
 * a button to start lessons. It fetches assignment data from the API on mount,
 * handles loading and authorization states.
 *
 * @param {AssignmentsProps} props - The props for the Assignments component.
 * @param {string} props.label - The label to display for the assignments section.
 * @param {Array<RawAssignmentProps>} props.label - The assignments available to learn.
 * @param {object} props.userPref - A json object containing user preferred settings.
 *
 * @returns {JSX.Element} The rendered Assignments component.
 */

import React, { useState } from "react";
import { View, Image, Pressable, LayoutChangeEvent } from "react-native";

// Interfaces
import { RawAssignmentProps } from "../../../interfaces/RawAssignment";

// Styling
import { HomeStyles } from "../../../styles/globals";
import { DashboardStyles } from "../../../styles/home/dashboard.styles";
import { Colors } from "../../../constants/colors";

// Components
import ButtonText from "./ButtonText";

interface AssignmentsProps {
    label: string;
    assignments: Array<RawAssignmentProps>;
    userPref: object;
}

/**
 * Assignments component displays the user's current assignment count and provides
 * a button to start lessons. It fetches assignment data from the API on mount,
 * handles loading and authorization states.
 *
 * @param {AssignmentsProps} props - The props for the Assignments component.
 * @returns {JSX.Element} The rendered Assignments component.
 */
const Assignments: React.FC<AssignmentsProps> = ({
    label,
    assignments,
    userPref,
}) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Handle layout changes to update container size
    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };

    // Calculate image max dimensions based on container size
    const maxWidth = containerSize.width * 0.5; // 50% of container width
    const maxHeight = containerSize.height * 0.75; // 75% of container height

    return (
        <Pressable
            style={[
                HomeStyles.review_box,
                assignments.length !== 0
                    ? { backgroundColor: Colors.KANJI_PINK }
                    : { backgroundColor: "gray" },
            ]}
            onLayout={onLayout}
        >
            {/* Assignment count and description */}
            <View style={DashboardStyles.count}>
                <ButtonText>Assignments {assignments.length}</ButtonText>
                <ButtonText>
                    We cooked up these lessons just for you.
                </ButtonText>
            </View>

            {/* Themed image */}
            <View style={DashboardStyles.icon}>
                {containerSize.width > 0 && (
                    <Image
                        source={require("../../../../assets/images/buttons/lessons_crab.png")}
                        style={{
                            width: maxWidth,
                            height: maxHeight,
                            resizeMode: "contain",
                        }}
                    />
                )}
            </View>

            {/* Start Lessons button */}
            <View style={DashboardStyles.button_container}>
                <Pressable style={DashboardStyles.button}>
                    <ButtonText style={{ color: "black" }}>
                        Start Lessons
                    </ButtonText>
                </Pressable>
            </View>
        </Pressable>
    );
};

export default Assignments;
