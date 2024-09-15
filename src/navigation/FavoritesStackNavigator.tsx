// import React from 'react';
// import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
// import FavoritesScreen from '../screens/FavoritesScreen';  // Import FavoritesScreen

// // Định nghĩa kiểu dữ liệu cho tham số
// type RootStackParamList = {
//     Favorites: { favoriteMeals: any[] };
// };

// const Stack = createStackNavigator<RootStackParamList>();

// // Định nghĩa kiểu dữ liệu cho props
// type FavoritesScreenProps = StackScreenProps<RootStackParamList, 'Favorites'>;

// const FavoritesStackNavigator = () => (
//     <Stack.Navigator>
//         <Stack.Screen
//             name="Favorites"
//             // Sử dụng hàm bao bọc để truyền props đúng cách
//             component={(props: FavoritesScreenProps) => <FavoritesScreen {...props} />}
//             options={{ headerTitle: "Favorites" }} // Tiêu đề cho màn hình yêu thích
//         />
//     </Stack.Navigator>
// );

// export default FavoritesStackNavigator;
