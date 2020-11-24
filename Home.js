import React, { useState, useEffect} from 'react';
import { 
    View,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    Linking,
    ScrollView,
    Keyboard,
    TextInput,
        } from 'react-native';
import colors from './colors';
import { ConversionInput } from '../App/ConversionInput';
import { Button } from './Button';
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

const screen = Dimensions.get('window');
const openURL = (URL) => {
    return Linking.openURL(URL).catch(() =>{
        Alert.alert('Sorry, something went wrong.', 'please try again later.');
    });
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1,
    },
    content: {
        paddingTop: screen.height*0.1
    },
    textCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    logoBackground: {
        width: screen.width*0.6,
        height: screen.width*0.6,
    },
    logo:{
        position:'absolute',
        width: screen.width*0.35,
        height: screen.height*0.35
    },
    header:{
        alignItems: 'flex-end',
        marginHorizontal: 20,
    },
});

export default ({ navigation }) => {
    const [scrollEnabled, setScrollEnabled] = useState(false);
    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => {
            setScrollEnabled(true);
        });
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            setScrollEnabled(false);
        });
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, [])
    return(
      <View style={styles.container}>
          <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue}/>

        <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.push("Navigation")}>
                <Entypo name="compass" size={32} color={colors.white} />
            </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.content}>
        <View style={styles.logoContainer}>
        <Image 
        source={require('../App/background.png')} 
        style={styles.logoBackground}
        resizeMode='contain'
        />
        <Image 
        source={require('./finallogo.png')}
        style={styles.logo}
        resizeMode="contain"
        />
        </View>
        <ConversionInput
        text='Destination:'
        value='123 Apple St.'
        onButtonPress={() => alert('Input destination please')}
        />
        <ConversionInput
        text="Current Location:"
        value='123 Banana St.'
        onButtonPress={() => alert('Allow location to be used')}
        />
        <Button text="Allow Location" onPress={() => openURL('app-settings:')}/>
        <Button text="Navigation" onPress={() => navigation.push("Navigation")}/>
        <View style={{height: screen.height}} />
        </View>
        </ScrollView>
      </View>  
    );
};