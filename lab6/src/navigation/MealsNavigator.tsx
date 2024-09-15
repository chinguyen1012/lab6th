// src/navigation/MealsNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
// import {MealDetailScreen} from '../screens/MealDetailScreen'; // Import màn hình MealDetail

// Định nghĩa kiểu dữ liệu cho các tham số trong điều hướng
export type MealsStackParamList = {
    Categories: undefined;
    Meals: { categoryId: string };
    MealDetail: { mealId: string };  // Thêm MealDetail với mealId
};

const Stack = createStackNavigator<MealsStackParamList>();

const MealsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Categories">
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Meals" component={MealsScreen} />

        </Stack.Navigator>
    );
};

export default MealsNavigator;
