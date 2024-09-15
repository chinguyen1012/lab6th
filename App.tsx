import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import CategoriesScreen from './src/screens/CategoriesScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MealsScreen from './src/screens/MealsScreen';

import LauScreen from './src/screens/LauScreen';

// Định nghĩa kiểu dữ liệu cho tham số
type RootStackParamList = {
  Favorites: { favoriteMeals: any[] };
};

// Stack Navigator cho Meals và Lau
const Stack = createStackNavigator();
const MealsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{ headerShown: false }} // Ẩn tiêu đề của Stack Navigator cho Categories
    />
    <Stack.Screen name="Meals" component={MealsScreen} />
    <Stack.Screen name="Lau" component={LauScreen} />
  </Stack.Navigator>
);
//okla
// Stack Navigator cho Favorites
const FavoritesStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        headerTitle: 'Favorites',
      }}
    />
  </Stack.Navigator>
);


// Stack Navigator cho Settings
const SettingsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerTitle: 'Settings', // Hiển thị tiêu đề khi chuyển sang trang cài đặt
      }}
    />
  </Stack.Navigator>
);

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Categories"
    screenOptions={{
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Categories" component={MealsStackNavigator} />
    <Tab.Screen name="Favorites" component={FavoritesStackNavigator} />
    <Tab.Screen name="Settings" component={SettingsStackNavigator} />
  </Tab.Navigator>
);

// Tạo Drawer Navigator nếu bạn muốn giữ Drawer Navigation
const Drawer = createDrawerNavigator();

const App = () => {
  return (

    <NavigationContainer>
      {/* Nếu bạn muốn giữ Drawer Navigation */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="Favorites" component={FavoritesStackNavigator} />
        <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
      </Drawer.Navigator>

      {/* Nếu bạn không cần Drawer Navigation, chỉ sử dụng TabNavigator */}
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
