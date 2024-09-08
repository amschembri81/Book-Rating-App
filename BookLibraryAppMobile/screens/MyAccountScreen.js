import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MyAccountScreen = () => {
  // State to manage user information
  const [user, setUser] = useState({
    name: "Jane Smith",
    email: "jsmith@example.com",
    biography: "",
    favoriteGenres: "",
    profilePicture: null,
  });

  // Handle changes to text inputs (name, email, biography, favorite genres)
  const handleInputChange = (name, value) => {
    setUser({
      ...user,  // Keep the existing state
      [name]: value,  // Update the specific field
    });
  };

  // Handle profile picture selection using ImagePicker from Expo
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({
        ...user,
        profilePicture: result.assets[0].uri,  // Set the selected image URI
      });
    }
  };

  // Handle form submission to save changes
  const handleSubmit = () => {
    // You can handle the form submission here (e.g., send the data to an API)
    Alert.alert("Profile updated successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <View style={styles.profilePictureContainer}>
        {/* Display the profile picture, or a placeholder if not available */}
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={{ uri: user.profilePicture || "https://via.placeholder.com/150" }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </View>
      <View style={styles.accountDetails}>
        {/* Name input */}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        {/* Email input */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />
        {/* Biography input */}
        <Text style={styles.label}>Biography:</Text>
        <TextInput
          style={styles.textarea}
          value={user.biography}
          onChangeText={(text) => handleInputChange('biography', text)}
          multiline
          numberOfLines={4}
          placeholder="Tell us about yourself..."
        />
        {/* Favorite Genres input */}
        <Text style={styles.label}>Favorite Genres:</Text>
        <TextInput
          style={styles.input}
          value={user.favoriteGenres}
          onChangeText={(text) => handleInputChange('favoriteGenres', text)}
          placeholder="E.g., Fiction, Mystery, Romance"
        />
        {/* Save Changes button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#005254',
  },
  accountDetails: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#005254',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;