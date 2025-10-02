// Style sheets for screens
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const HomeButtonStyles = StyleSheet.create({
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