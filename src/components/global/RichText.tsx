/**
 * RichText component displays a Subject's main reading (slug), meaning,
 *
 * @param {RichTextProps} props - The props for the RichText component.
 * @param {string} props.label - The label to display for the RichText section.
 * @param {object} props.userPref - A json object containing user preferred settings.
 *
 * @returns {JSX.Element} The rendered RichText component.
 */

import React from "react";
import { View, Text, Image } from "react-native";

// Styling
import { Colors } from "../../constants/colors";

interface RichTextProps {
    text: string;
}

/**
 * RichText component displays the user's current assignment count and provides
 * a button to start lessons. It fetches assignment data from the API on mount,
 * handles loading and authorization states.
 *
 * @param {RichTextProps} props - The props for the RichText component.
 * @returns {JSX.Element} The rendered RichText component.
 */
const RichText: React.FC<RichTextProps> = ({ text }) => {
    const EXPLAIN_REGEX =
        /(<(?:kanji|radical|vocabulary|reading|em)>.*?<\/(?:kanji|radical|vocabulary|reading|em)>)|([^<]+)/g;

    return (
        <Text
            style={{
                fontFamily: "NotoSans-Regular",
                fontSize: 14,
                flexWrap: "wrap",
            }}
        >
            {text.match(EXPLAIN_REGEX)?.map((e, idx) => {
                const RM_REGEX =
                    /<\/?(?:vocabulary|kanji|radical|reading|em)>/g;
                const word_type =
                    e
                        .match(RM_REGEX)?.[0]
                        ?.replace(/[<>]/g, "")
                        ?.toUpperCase() || null;
                const background_fill = word_type
                    ? Colors[`${word_type}_HIGHLIGHT_BACK`]
                    : "transparent";
                const txt_fill = word_type
                    ? Colors[`${word_type}_HIGHLIGHT_FILL`]
                    : "";

                return (
                    <Text
                        style={{
                            backgroundColor: background_fill,
                            color: txt_fill,
                            fontFamily:
                                word_type === "EM"
                                    ? "NotoSans-Italic"
                                    : "NotoSans-Regular",
                        }}
                        key={idx}
                    >
                        {e.replace(RM_REGEX, "")}
                    </Text>
                );
            })}
        </Text>
    );
};

export default RichText;
