/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screen/home/index';
import Broadcaster from './screen/broadcaster/index';
import Viewer from './screen/viewer/index';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerTransparent: true,
          headerTintColor: '#f4f4f4'
        }} />
        <Stack.Screen name="Broadcaster" component={Broadcaster}/>
        <Stack.Screen name="Viewer" component={Viewer}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
