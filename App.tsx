import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserForm from './src/screens/UserForm';
import { RootStackParamList } from './src/navigation/StackParamList'; // Import RootStackParamList

// Create the stack navigator and pass in the type RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: 'User Form' }} // Optional: Custom header title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
