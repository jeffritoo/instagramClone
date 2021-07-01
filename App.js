import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native';
import firebase from 'firebase/app'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


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
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }

    })
  }
  render() {
    const{ loggedIn,loaded} = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if (!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Add" component={AddScreen} options={{ headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>

        
      </Provider>
    )
  }
}

export default App




