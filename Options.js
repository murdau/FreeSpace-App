import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, ScrollView, Linking, Alert, Dimensions} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import colors from './colors';
import Map from './Map';
import { Button } from './Button';
import Navigation from './Navigation';
const screen = Dimensions.get('window');

//.catch prevents malicious and zipped URLs from being linked
const openURL = (URL) => {
    return Linking.openURL(URL).catch(() =>{
        Alert.alert('Sorry, something went wrong.', 'please try again later.');
    });
}

const styles = StyleSheet.create({
container: {
    backgroundColor: colors.blue,
    flex: 1
},
row: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},
text: {
    fontSize: 16,
    color: colors.white
},
separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20
},
map: {
    height:screen.height*0.4,
    width:screen.width*0.4,
    position:"relative"
},
backButton: {
    position:'absolute',
    left:0,
    right:80,
    top:0,
    bottom:0,
    marginLeft:15,
    marginTop:22,
}
});

export default () => {
    return(
        <View style={styles.container}>
        <SafeAreaView style={{flex: 1 }}>
                <TouchableOpacity style={styles.row}>
                <Text style={styles.text}>Bluetooth</Text> 
                <Entypo name="chevron-right" size={20} color={colors.white} onPress={() => alert("hi")}/>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row}>
                <Text style={styles.text}>Settings</Text>
                <Entypo name="chevron-right" size={20} color={colors.white} onPress={() => openURL('app-settings://')}/>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row}>
                <Text onPress={() => openURL('https://www.google.ca/maps')} style={styles.text}>Navigation</Text>
                <Entypo name="export" size={20} color={colors.white} onPress={() => openURL('https://www.google.ca/maps')}/>
            </TouchableOpacity>
            <Map style={styles.map}/>
        </SafeAreaView>
        </View>
    )
}
/*export default class Options extends Component{
    render(){
        return <Map/>
    }
}*/