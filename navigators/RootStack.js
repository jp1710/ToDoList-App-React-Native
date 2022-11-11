import React from 'react';
import { Colors } from './../components/styles';

const { darkLight, brand, primary, tertiary, secondary } = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Dashboard from '../screens/Dashboard';
import TaskCreator from '../screens/TaskCreator';

const Stack = createStackNavigator();

import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer style={{ backgroundColor: 'red' }}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: tertiary,
              headerTransparent: true,
              
              headerLeftContainerStyle: {
              paddingLeft: 20,
              },
            }}
          >
            
              <Stack.Screen
                options={{
                  headerTintColor: primary,
                }}
                name="Welcome"
                component={Welcome}
              />
              
              <>
                <Stack.Screen name="Login" component={Login} title='Login'/>
                <Stack.Screen name="Signup" component={Signup} title='Register' />
                <Stack.Screen name="Dashboard" component={Dashboard} title='Home'/>
                <Stack.Screen name="TaskCreator" component={TaskCreator} title='New Task'/>
              </>
              )
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
