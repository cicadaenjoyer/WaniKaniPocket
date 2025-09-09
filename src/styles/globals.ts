// Style sheets for screens
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
        flex: 1,
        backgroundColor: Colors.OPTIONS_GREY,
        alignItems: 'center',
        justifyContent: 'center',
    }
});