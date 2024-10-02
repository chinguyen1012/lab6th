

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/screens/HomeScreen';
// import ServiceFormScreen from './src/screens/ServiceFormScreen';
// import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
// import { RootStackParamList } from './src/navigation/StackParamList';

// const Stack = createStackNavigator<RootStackParamList>();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="ServiceForm" component={ServiceFormScreen} options={{ title: 'Thêm Dịch Vụ' }} />
//       <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: 'Chi Tiết Dịch Vụ' }} />
//       {/* Các màn hình khác... */}
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;



import React from 'react';
import { Platform } from 'react-native'; // Kiểm tra nền tảng
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserForm from './src/screens/UserForm';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import { RootStackParamList } from './src/navigation/StackParamList'; // Import RootStackParamList

// Web imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch for React Router v6
import ServiceFormScreen from './src/screens/ServiceFormScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
// import ServiceFormScreen_Update from './src/screens/ServiceFormScreen_Update';

// Create the stack navigator and pass in the type RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  // Kiểm tra xem ứng dụng đang chạy trên Web hay không
  if (Platform.OS === 'web') {
    return (
      <Router>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen navigation={{} as any} />} />
          <Route path="/user-form" element={<UserForm navigation={{} as any} route={{} as any} />} />
          <Route path="/reset-password" element={<ResetPasswordScreen navigation={{} as any} route={{} as any} />} />
          {/* Thêm các route khác nếu cần */}
        </Routes>
      </Router>
    );
  }

  // Điều hướng cho ứng dụng di động
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ServiceForm" component={ServiceFormScreen} options={{ title: 'Thêm Dịch Vụ' }} />
        {/* <Stack.Screen name="ServiceForm_Update" component={ServiceFormScreen_Update} options={{ title: 'Cập Nhật Dịch Vụ' }} /> */}
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: 'Chi Tiết Dịch Vụ' }} />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: 'User Form' }} // Optional: Custom header title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






// import React from 'react';
// import { Platform } from 'react-native'; // Kiểm tra nền tảng
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './src/screens/LoginScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import UserForm from './src/screens/UserForm';
// import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
// import { RootStackParamList } from './src/navigation/StackParamList'; // Import RootStackParamList

// // Web imports
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch for React Router v6

// // Create the stack navigator and pass in the type RootStackParamList
// const Stack = createStackNavigator<RootStackParamList>();

// export default function App() {
//   // Kiểm tra xem ứng dụng đang chạy trên Web hay không
//   if (Platform.OS === 'web') {
//     return (
//       <Router>
//         <Routes> {/* Use Routes instead of Switch */}
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="/register" element={<RegisterScreen />} />
//           <Route path="/home" element={<HomeScreen navigation={{} as any} />} />
//           <Route path="/user-form" element={<UserForm navigation={{} as any} route={{} as any} />} />
//           <Route path="/reset-password" element={<ResetPasswordScreen navigation={{} as any} route={{} as any} />} />
//           {/* Thêm các route khác nếu cần */}
//         </Routes>
//       </Router>
//     );
//   }

//   // Điều hướng cho ứng dụng di động
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen
//           name="UserForm"
//           component={UserForm}
//           options={{ title: 'User Form' }} // Optional: Custom header title
//         />
//         <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




