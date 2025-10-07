/**
 * @file dashboard.styles.ts
 * @description
 *   Style sheets for dashboard-related screens and components.
 *   Provides styles for assignment/review cards, icons, and dashboard buttons.
 */

import { StyleSheet } from 'react-native';

export const DashboardStyles = StyleSheet.create({
    count: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: '75%',
        width: '50%'
    },
    icon: {
        flex: 1,
        justifyContent: 'center'
    },
    button_container: {
        width: '85%',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        alignItems: 'center'
    },
    button_text: {
        fontFamily: "NotoSans-Regular",
        lineHeight: 16,
        color: '#ffffff'
    }
});