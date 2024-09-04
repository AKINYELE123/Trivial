import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import TrivalScreen from '../screens/Home/TrivalScreen'
import TrivialResult from '../screens/Home/TrivialResult'


const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator 
        screenOptions={({ route }) => ({
            headerShown: false, 
            gestureEnabled: false,
        })}
        initialRouteName="Dash"
    >
        <Stack.Screen name="Dash" component={HomeScreen} />
        <Stack.Screen name="Trival" component={TrivalScreen} options={{ tabBarVisible: false }} />
        <Stack.Screen name="Result" component={TrivialResult} options={{ tabBarVisible: false }} />
    </Stack.Navigator>
);

}

export default HomeNavigation