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
    button: {
        width: '70%'
    }
});