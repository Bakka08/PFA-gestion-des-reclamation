import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen'; 
import SignupScreen from './Screens/SignupScreen';
import AfterloginUser from './Screens/AfterloginUser';
import AfterloginAdmin from './Screens/AfterloginAdmin';

const Stack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const delay = 3000; 
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []); 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {isLoading ? (
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        )}

        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AfterloginUser" component={AfterloginUser} options={{ headerShown: false }} />
        <Stack.Screen name="AfterloginAdmin" component={AfterloginAdmin} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;