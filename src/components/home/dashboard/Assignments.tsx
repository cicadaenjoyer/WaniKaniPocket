/**
 * Assignments component displays the user's current assignment count and provides
 * a button to start lessons. It fetches assignment data from the API on mount,
 * handles loading and authorization states.
 *
 * @param {AssignmentsProps} props - The props for the Assignments component.
 * @param {string} props.label - The label to display for the assignments section.
 * @param {object} props.userPref - A json object containing user preferred settings.
 *
 * @returns {JSX.Element} The rendered Assignments component.
 */

import React, { useState, useEffect } from "react";
import { View, Image, Pressable, LayoutChangeEvent } from "react-native";

// Styling
import { HomeStyles } from "../../../styles/globals";
import { DashboardStyles } from "../../../styles/home/dashboard.styles";
import { Colors } from "../../../constants/colors";

// API
import { AssignmentsAPI } from "../../../api/assignments";

// Components
import ButtonText from "./ButtonText";

interface AssignmentsProps {
    label: string;
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
const Assignments: React.FC<AssignmentsProps> = ({ label, userPref }) => {
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch assignments on mount
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const result = await AssignmentsAPI.getAssignmentsBatch();
                if (result) {
                    setAssignmentCount(result.total_count);
                    setAuthorized(true);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    // Handle layout changes to update container size
    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };
    // Calculate image max dimensions based on container size
    const maxWidth = containerSize.width * 0.5; // 50% of container width
    const maxHeight = containerSize.height * 0.75; // 75% of container height

    // Default loading state view
    if (loading) {
        return (
            <View
                style={[
                    HomeStyles.review_box,
                    { justifyContent: "center", alignItems: "center" },
                ]}
            ></View>
        );
    }

    return (
        <Pressable
            style={[
                HomeStyles.review_box,
                authorized
                    ? { backgroundColor: Colors.KANJI_PINK }
                    : { backgroundColor: "gray" },
            ]}
            onLayout={onLayout}
        >
            {/* Assignment count and description */}
            <View style={DashboardStyles.count}>
                <ButtonText>Assignments {assignmentCount}</ButtonText>
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
