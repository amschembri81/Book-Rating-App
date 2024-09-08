import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

function SearchResults({ searchResults, onSelectBook }) {
  return (
    <View style={styles.resultsContainer}>
      {/* Check if there are search results */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults} // Array of search results
          keyExtractor={(item) => item.id} // Unique key for each item in the list
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              {/* Display the book thumbnail if available */}
              {item.thumbnail && (
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              )}
              {/* Display book details (title, author, genre) */}
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>Author: {item.author}</Text>
                <Text style={styles.bookGenre}>Genre: {item.genre}</Text>
              </View>
              {/* Button to add the book to the library */}
              <TouchableOpacity onPress={() => onSelectBook(item)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        // Display a message if no search results are found
        <Text>No results found.</Text>
      )}
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnail: {
    width: 60,
    height: 90,
    marginRight: 15,
    borderRadius: 4,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flexWrap: 'wrap', 
  },
  bookAuthor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
    flexWrap: 'wrap', 
  },
  bookGenre: {
    fontSize: 16,
    color: '#888',
    flexWrap: 'wrap', 
  },
  addButton: {
    backgroundColor: '#005254',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchResults;