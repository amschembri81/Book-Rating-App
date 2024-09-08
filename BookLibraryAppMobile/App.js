import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import SearchBookScreen from './screens/SearchBookScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import LoginScreen from './screens/LoginScreen';
import Icon from 'react-native-vector-icons/Ionicons';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Wrap the entire app in a NavigationContainer to manage navigation state
    <NavigationContainer>
      {/* Define the bottom tab navigator with screen options for each route */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Define the icon to display for each tab based on the route name
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Determine the icon name based on the route name
            if (route.name === 'Home') {
              iconName = 'home-outline'; // Icon for the Home tab
            } else if (route.name === 'Library') {
              iconName = 'book-outline'; // Icon for the Library tab
            } else if (route.name === 'Search') {
              iconName = 'search-outline'; // Icon for the Search tab
            } else if (route.name === 'My Account') {
              iconName = 'person-outline'; // Icon for the My Account tab
            } else if (route.name === 'Login') {
              iconName = 'log-in-outline'; // Icon for the Login tab
            }

            // Return the icon component with the specified size and color
            return <Icon name={iconName} size={size} color={color} />;
          },
          // Set the active tab color
          tabBarActiveTintColor: '#005254',
          // Set the inactive tab color
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* Define each tab in the bottom tab navigator */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Search" component={SearchBookScreen} />
        <Tab.Screen name="My Account" component={MyAccountScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}