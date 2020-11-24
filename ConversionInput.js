import React from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet, Text } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginVertical: 10,
        marginVertical: 20,
        borderRadius: 5,
        flexDirection: "row"
    },
    button: {
        padding: 15,
        borderRightColor: colors.border,
        borderRightWidth: 1
    },
    buttonText: {
        fontSize: 18,
        color: colors.blue,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        padding: 10,
        color: colors.textLight
    }
});

export const ConversionInput = ({text, value, onButtonPress, onChangeText, keyBoardType}) => {

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onButtonPress} styles={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput style={styles.input}/>
        </View>
    );
};