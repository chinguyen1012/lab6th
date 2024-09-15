import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MealsScreen from '../screens/MealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const Stack = createStackNavigator();

const MealsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Meals" component={MealsScreen} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
    );
};

export default MealsNavigator;
