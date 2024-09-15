// src/navigation/MealsNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import LauScreen from '../screens/LauScreen';

export type MealsStackParamList = {
    Categories: undefined;
    Meals: { categoryId: string };

    MealDetail: { mealId: string };

};

const Stack = createStackNavigator<MealsStackParamList>();

const MealsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Categories">
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Meals" component={MealsScreen} />
            {/* <Stack.Screen name="Lau" component={LauScreen} /> */}

            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
    );
};

export default MealsNavigator;
