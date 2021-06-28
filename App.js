import { StatusBar } from 'expo-status-bar';
import React from 'react';

import firebase from 'firebase/app'

//this should be in a .env file
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCCKbDrmlox5Mo6y11pIO64oTXw8k4v7w",
  authDomain: "instagram-dev-7627d.firebaseapp.com",
  projectId: "instagram-dev-7627d",
  storageBucket: "instagram-dev-7627d.appspot.com",
  messagingSenderId: "725509779934",
  appId: "1:725509779934:web:486bcb271752e08845ed4f",
  measurementId: "G-NJSQ26LXPK"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}


