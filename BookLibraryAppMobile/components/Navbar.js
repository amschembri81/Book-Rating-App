import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  // Access the navigation object to navigate between screens
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Button to navigate to the Home screen */}
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      
      {/* Button to navigate to the Library screen */}
      <Button title="Library" onPress={() => navigation.navigate('Library')} />
      
      {/* Button to navigate to the Search screen */}
      <Button title="Search" onPress={() => navigation.navigate('SearchBook')} />
      
      {/* Button to navigate to the My Account screen */}
      <Button title="My Account" onPress={() => navigation.navigate('MyAccount')} />
    </View>
  );
};

// Styling for the Navbar component
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',  // Arrange buttons in a row
    justifyContent: 'space-around',  // Distribute buttons evenly
    padding: 10,  // Add padding around the navbar
    backgroundColor: '#333',  // Dark background color for the navbar
  },
});

export default Navbar;