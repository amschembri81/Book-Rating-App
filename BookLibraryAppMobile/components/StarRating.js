import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StarRating = () => {
  const [rating, setRating] = useState(0); // State to store the current rating

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        {/* Render 5 stars using an array map */}
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            {/* Change the star's appearance based on the rating */}
            <Text style={star <= rating ? styles.filledStar : styles.emptyStar}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Display the current rating below the stars */}
      <Text style={styles.text}>My rating is {rating} stars.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center the content horizontally
  },
  starContainer: {
    flexDirection: 'row', // Arrange stars in a row
  },
  filledStar: {
    fontSize: 30, // Set the size of filled stars
    color: '#ffd700', // Gold color for filled stars
  },
  emptyStar: {
    fontSize: 30, // Set the size of empty stars
    color: '#d3d3d3', // Light gray color for empty stars
  },
  text: {
    marginTop: 10, // Add space above the text
    fontSize: 16, // Set the font size for the text
  },
});

export default StarRating;