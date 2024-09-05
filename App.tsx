import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './page/home';
import Pj1 from './page/Project1';
import Pj2 from './page/Project2';
import Pj3 from './page/Project3';
import Pj4 from './page/Project4';
import Pj5 from './page/Project5';
import Pj6 from './page/Project6';
import Pj7 from './page/Project7';
import Pj8 from './page/Project8';
import Lab1 from './page/lab1';
import Lab2 from './page/LAB2_calculator';





// Định nghĩa kiểu cho các thông số điều hướng
export type RootStackParamList = {
  Home: undefined;
  Pj1: undefined;
  Pj2: undefined;
  Pj3: undefined;
  Pj4: undefined;
  Pj5: undefined;
  Pj6: undefined;
  Pj7: undefined;
  Pj8: undefined;
  Lab1: undefined;
  Lab2: undefined;



};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Stack.Screen name="Pj1" component={Pj1} options={{ title: 'PJ1' }} />
        <Stack.Screen name="Pj2" component={Pj2} options={{ title: 'PJ2' }} />
        <Stack.Screen name="Pj3" component={Pj3} options={{ title: 'PJ3' }} />
        <Stack.Screen name="Pj4" component={Pj4} options={{ title: 'PJ4' }} />
        <Stack.Screen name="Pj5" component={Pj5} options={{ title: 'PJ5' }} />
        <Stack.Screen name="Pj6" component={Pj6} options={{ title: 'PJ6' }} />
        <Stack.Screen name="Pj7" component={Pj7} options={{ title: 'PJ7' }} />
        <Stack.Screen name="Pj8" component={Pj8} options={{ title: 'PJ8' }} />
        <Stack.Screen name="Lab1" component={Lab1} options={{ title: 'LAB1' }} />
        <Stack.Screen name="Lab2" component={Lab2} options={{ title: 'LAB2' }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
