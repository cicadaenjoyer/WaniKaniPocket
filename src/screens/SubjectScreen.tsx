/**
 * @file SubjectScreen.tsx
 * @description
 *   A dedicated screen to display Subject detailed definiton including
 *   readings, meanings, use cases, explanations, etc
 */

import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Components
import SubjectDefinition from "../components/global/SubjectDefinition";

// Interfaces
import { SubjectProps } from "../interfaces/Subject";

const SubjectScreen = (nav: {
    route: { params: { subject: SubjectProps } };
}) => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
            <ScrollView>
                <SubjectDefinition subject={nav.route.params.subject} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SubjectScreen;
