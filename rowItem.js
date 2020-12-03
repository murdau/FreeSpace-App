import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    row: {},
    text: {},
});

export const RowItem = ({ rightIcon }) => {
    return (
<TouchableOpacity style={styles.row}>
                <Text style={styles.text}>FreeSpace</Text>
                {rightIcon}
            </TouchableOpacity>
    );
};