import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const BookCard = ({ book, onDeleteBook }) => {
  return (
    <View style={styles.card}>
      {/* Display the book title */}
      <Text style={styles.title}>{book.name}</Text>
      
      {/* Display the author of the book */}
      <Text style={styles.author}>by {book.author}</Text>
      
      {/* Display the category of the book */}
      <Text style={styles.category}>{book.category}</Text>
      
      {/* Display the book thumbnail if available */}
      {book.thumbnail && <Image source={{ uri: book.thumbnail }} style={styles.thumbnail} />}
      
      {/* Button to delete the book from the list */}
      <Button title="Delete" onPress={() => onDeleteBook(book.id)} color="red" />
    </View>
  );
};

// Styling for the BookCard component
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',  // White background for the card
    padding: 15,  // Padding inside the card
    marginBottom: 15,  // Space below the card
    borderRadius: 8,  // Rounded corners
    borderWidth: 1,  // Border around the card
    borderColor: '#ddd',  // Light grey border color
  },
  title: {
    fontSize: 18,  // Font size for the book title
    fontWeight: 'bold',  // Bold font for emphasis
    marginBottom: 5,  // Space below the title
  },
  author: {
    fontSize: 16,  // Font size for the author text
    marginBottom: 5,  // Space below the author
  },
  category: {
    fontSize: 14,  // Font size for the category text
    marginBottom: 10,  // Space below the category
    color: '#888',  // Grey color for the category text
  },
  thumbnail: {
    width: 50,  // Width of the thumbnail image
    height: 75,  // Height of the thumbnail image
    marginBottom: 10,  // Space below the thumbnail
  },
});

export default BookCard;