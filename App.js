import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import { FavoritesProvider } from './FavoritesContext';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import SearchResultsScreen from './SearchResultsScreen'; // Import the SearchResultsScreen

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
  };

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <LoginPage
                onLoginSuccess={() => {
                  handleLoginSuccess();
                  navigation.navigate('Home'); // Navigate to Home upon login
                }}
              />
            )}
          </Stack.Screen>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfilePage}
                options={{ title: 'Profile' }}
              />
              <Stack.Screen
                name="SearchResults"
                component={SearchResultsScreen}
                options={{ title: 'Search Results' }}
              />
            </>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

export default App;
