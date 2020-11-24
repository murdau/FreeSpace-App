import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import colors from './colors';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Icon, Divider, Header} from 'react-native-elements';

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default class bluetooth extends Component {
    render(){
    return(
    <View style={styles.container}>
        <Text>Welcome</Text>
    </View>
    );
    }
}