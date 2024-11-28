import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Login from "./screens/Login"
import Main from "./screens/Main"
import KakaoLogin from "./screens/KakaoLogin"
import CameraScreen from './screens/CameraScreen';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
          <Stack.Screen name='KakaoLogin' component={KakaoLogin} options={{headerShown: false,}}/>
          <Stack.Screen name='Main' component={Main} options={{headerShown: false,}}/>
          <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown: false,}}/>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
});
