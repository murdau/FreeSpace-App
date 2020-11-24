import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from 'react-native';

import Home from "./Home";
import Options from "./Options";
import { colors } from "react-native-elements";
import bluetooth from './bluetooth';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
    <MainStack.Navigator
     /*headerMode="screen" 
     initialRouteName="Navigation"*/>
        <MainStack.Screen name="Home" component = {Home} options={{ headerShown: false }}/>
        <MainStack.Screen name="Navigation" component = {Options} options={{headerShown: false}}/>
        <MainStack.Screen name="Bluetooth" component = {bluetooth} />
    </MainStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <MainStackScreen/>
    </NavigationContainer>
);
