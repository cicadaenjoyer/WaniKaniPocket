/**
 * @file progress.styles.ts
 * @description
 *   Style sheets for progress-related components.
 *   Provides styles for the progress bar, its filler, and the label.
 */

import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const ProgressStyles = StyleSheet.create({
    bar: {
        height: 20,
        width: '100%',
        backgroundColor: Colors.OPTIONS_GREY,
        borderRadius: 30,
        flexDirection: 'row',
    },
    filler: {
        height: '100%',
        backgroundColor: Colors.KANJI_PINK,
        borderRadius: 30,
        alignItems: 'flex-end',
        paddingRight: 10
    },
    label: {
        paddingLeft: 5
    }
});