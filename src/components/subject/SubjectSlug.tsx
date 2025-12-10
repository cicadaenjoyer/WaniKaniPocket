/**
 * SubjectSlug component displays a Subject's main reading (slug) and meaning
 *
 * @param {SubjectSlugProps} props - The props for the SubjectSlug component.
 * @param {string} props.fill - The color corresponding to the subject type.
 * @param {string} props.slug - The main subject character(s).
 * @param {string} props.main_meaning - The main subject meaning.
 * @param {string} props.subject_image - A helper image used mainly for Radical subjects.
 *
 * @returns {JSX.Element}
 */

import React from "react";
import { View, Text } from "react-native";

// Styling
import { Colors } from "../../constants/colors";

interface SubjectSlugProps {
    fill: string;
    slug: string;
    main_meaning: string;
    // subject_image: string;
}

const SubjectSlug: React.FC<SubjectSlugProps> = ({
    fill,
    slug,
    main_meaning,
}) => {
    return (
        <View>
            {/* Main Subject Slug */}
            <View
                style={{
                    alignSelf: "flex-start",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: fill,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                }}
            >
                <Text
                    style={{
                        fontFamily: "NotoSans-Bold",
                        fontSize: 25, // NOTE: make dynamic later
                        color: Colors.HEADER_WHITE,
                    }}
                >
                    {slug}
                </Text>
            </View>

            {/* Subject Main Meaning & Helper Image */}
            <Text
                style={{
                    fontFamily: "NotoSans-Regular",
                    fontSize: 25, // NOTE: make dynamic later
                    color: Colors.BASIC_BLACK,
                }}
            >
                {main_meaning}
            </Text>
        </View>
    );
};

export default SubjectSlug;
