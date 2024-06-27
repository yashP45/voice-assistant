import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/home';
import WelcomeScreen from './src/screens/welcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import {apiCall} from './src/api/openapi';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    apiCall('how is you');
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
