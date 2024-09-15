// src/navigation/MealsNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import LauScreen from '../screens/LauScreen';

export type LauStackParamList = {
    Categories: undefined;
    Lau: { categoryId: string };
    MealDetail: { mealId: string };

};

const Stack = createStackNavigator<LauStackParamList>();

const LauNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Categories">
            <Stack.Screen name="Categories" component={CategoriesScreen} />

            <Stack.Screen name="Lau" component={LauScreen} />

            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
    );
};

export default LauNavigator;
