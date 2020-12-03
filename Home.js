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
//import { ConversionInput } from '../App/ConversionInput';
import { Button } from './Button';
//import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
//import Converter from './directionConvert';
//import { color } from 'react-native-reanimated';
//import App from './directionConvert';
//import Input from './input'


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
    textstyle: {
        fontWeight: 'bold',
        fontSize: 22
    },
    input: {
        backgroundColor: colors.white,
        width: 360,
        marginLeft: 8,
        borderRadius: 4,
        height:45,
        marginTop:10
    },
    button: {
        backgroundColor: 'red',
    },
    container2 : {
        flex: 1,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: "center",
    },
    input2: {
        borderWidth: 1,
        borderColor: '#777',
        padding:8,
        margin: 10,
        width: 300,
        backgroundColor: colors.white
    },
    print: {
        marginTop:10,
        fontSize: 20,
        fontFamily: "Helvetica"
    }
});

export default ({ navigation }) => {
    const [location, setLoc] = useState('');
    const [Dest, setDest] = useState('');
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
                {/*<Entypo name="compass" size={32} color={colors.white} />*/}
                <Text>Compass</Text>
            </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.content}>
        <View style={styles.logoContainer}>
        <Image 
        source={require('./background.png')} 
        style={styles.logoBackground}
        resizeMode='contain'
        />
        <Image 
        source={require('./finallogo.png')}
        style={styles.logo}
        resizeMode="contain"
        />
        </View>
        <View style={styles.container2}>
            <Text>Enter Current location</Text>
            <TextInput 
            style={styles.input2}
            placeholder='eg. 123 Apple Street, Toronto, ON'
            onChangeText={(val) => setLoc(val)}/>
            <Text>Enter Destination</Text>
            <TextInput style={styles.input2}
            onChangeText={(val) => setDest(val)}
            placeholder='eg. 456 Banana Street, Ottawa, ON'/>
            <Text style={styles.print}>Location: {location}</Text>
            <Text style={styles.print}>Destination: {Dest}</Text>
        </View>
        <Button text="Navigation" onPress={() => 
            navigation.push("Navigation", {dest: {Dest}})
        }/>
        <View style={{height: screen.height}} />
        </View>
        </ScrollView>
      </View>  
    );
};
//<Input/>
/*    const Converter = () => {
        const[text, setText] = useState('');
        return (
            <View style={{padding:10}}>
                <TextInput
                placeholder="Input your destination"
                onChangeText={text=>setText(text)}
                defaultValue={text}/>
                <Text style={{padding:10, fontSize:22}}>
                    {text.split('').map((word) => word && 'testing').join('')}
                </Text>
            </View>
        )
    }

     <ConversionInput
         text='Destination:'
         value='123 Apple St.'
         onButtonPress={() => alert('Input destination please')}
         />

         <View style={styles.input}>
        <App/>
        </View>
        <ConversionInput
        text="Current Location:"
        value='123 Banana St.'
        onButtonPress={() => alert('Allow location to be used')}
        />
        <Button text="Navigation" onPress={() => navigation.push("Navigation")}/>
        <Button text="Allow Location" onPress={() => openURL('app-settings:')}/>
         
*/