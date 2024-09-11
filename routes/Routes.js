import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/Splash';
import Home from '../pages/Home';
import NoteForm from '../pages/NoteForm';

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="NoteForm" component={NoteForm} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

export default Routes