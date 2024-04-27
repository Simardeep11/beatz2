import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import SearchResultsScreen from './SearchResultsScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} /> // Make sure this line is correct
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
