/**
 * @file globals.ts
 * @description
 *   Global style sheets for screens and common UI components.
 *   Provides reusable styles for main screens (login, home, etc).
 */

import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
    },
});

export const HomeStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.OPTIONS_GREY,
        flex: 1,
        gap: 30,
        alignItems: 'center',
    },
    header_container: {
        height: 45,
        width: '100%',
        backgroundColor: Colors.HEADER_WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
    },
    header_image: {
        height: '50%', // XXX: Not sure how this will look on other devices
        width: '25%',
    },
    review_container: {
        backgroundColor: Colors.OPTIONS_GREY,
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    progress_container: {
        backgroundColor: Colors.HEADER_WHITE,
        justifyContent: 'space-around',
        width: '95%',
        padding: 10
    },
    review_box: {
        width: '48%',
        minHeight: 120,
        borderRadius: 5,
        backgroundColor: Colors.LESSON_GREY,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 5
    },
});