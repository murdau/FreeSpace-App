import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create ({
    button: {
        alignItems: "center",   
        justifyContent: "center",
        marginTop: 20
    },
    buttonText:{
        color: colors.white,
        fontSize: 18
    } 
});
export const Button = ({onPress, text}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};
