import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LibraryScreen = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from AsyncStorage when the component is mounted
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const savedBooks = JSON.parse(await AsyncStorage.getItem('books')) || [];
        console.log('Fetched books:', savedBooks); // Add this line to log the fetched books
        setBooks(savedBooks);
      } catch (error) {
        console.error('Failed to load books from storage:', error);
      }
    };
  
    fetchBooks();
  }, []);

  
  // Function to delete a book from the library
  const deleteBook = async (bookId) => {
    try {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Library</Text>
      {books.length > 0 ? (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>by {item.author}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteBook(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBooksText}>No books in your library.</Text>
      )}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noBooksText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default LibraryScreen;