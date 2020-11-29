import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from 'react-native';

import Home from "./Home";
import Options from "./Options";
import { colors } from "react-native-elements";

const MainStack = createStackNavigator();
const MainStackScreen = () => (
    <MainStack.Navigator
     /*headerMode="screen" 
     initialRouteName="Navigation"*/>
        <MainStack.Screen name="Home" component = {Home} options={{ headerShown: false }}/>
        <MainStack.Screen name="Navigation" component = {Options} options={{headerShown: false}}/>
    </MainStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <MainStackScreen/>
    </NavigationContainer>
);
/*import BluetoothReal from './bluetooth';  AND    <MainStack.Screen name="Bluetooth" component = {BluetoothReal}/> */