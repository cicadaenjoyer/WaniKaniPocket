/**
 * @file Bar.tsx
 * @description
 *    A dynamic progress bar that displays the number of mastered and in-progress Kanji items.
 *    This progress bar uses the Subject's SRS stage value to calculate the mastery percentage.
 *
 * @returns {JSX.Element} The rendered Progress Bar component.
 */

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

// Styling
import { ProgressStyles as styles } from "../../../styles/home/progress.styles";

// API
import { SubjectsAPI } from "../../../api/subjects";
import { AssignmentsAPI } from "../../../api/assignments";

interface BarProps {
    level: number;
}

const Bar: React.FC<BarProps> = ({ level }) => {
    const [learned, setLearned] = useState(0);
    const [kanji, setKanji] = useState(0);

    useEffect(() => {
        const fetchKanji = async () => {
            try {
                // Get all user-seen kanji assignments at current level
                const all_learned =
                    await AssignmentsAPI.getKanjiAssignmentsAtLevel(level);
                // Get all kanji assignments from site at current level
                const all_kanji = await SubjectsAPI.getKanjiAtLevel(level);

                if (all_learned && all_kanji) {
                    // Count mastered kanji
                    let num_learned = all_learned.data.reduce(
                        (sum: number, kanji: { data: { passed_at?: Date } }) =>
                            sum + (kanji?.data?.passed_at ? 1 : 0),
                        0
                    );
                    setLearned(num_learned);
                    setKanji(all_kanji.total_count);
                }
            } catch (e) {
                console.error(e);
            } finally {
                // No cleanup needed
            }
        };
        fetchKanji();
    });

    // Calculate progress percentage
    const progress = Math.min(learned / kanji, 1) * 100 || 0;

    return (
        <View style={styles.bar}>
            <View style={[styles.filler, { width: `${progress}%` }]}>
                {/* Show label inside bar if progress >= 50% */}
                {progress >= 50 && (
                    <Text style={styles.label}>
                        {learned} of {kanji} kanji passed
                    </Text>
                )}
            </View>
            {/* Show label outside bar if progress < 50% */}
            {progress < 50 && (
                <Text style={styles.label}>
                    {learned} of {kanji} kanji passed
                </Text>
            )}
        </View>
    );
};

export default Bar;
