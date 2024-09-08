import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchBookScreen = () => {
  // State to store the search query entered by the user
  const [query, setQuery] = useState('');
  // State to store the results from the Google Books API
  const [results, setResults] = useState([]);
  // State to manage manually added book details
  const [manualBook, setManualBook] = useState({ title: '', author: '', genre: '' });

  // Function to search for books using the Google Books API based on the query
  const searchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.items || []); // Update results with the fetched books or an empty array
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch books from Google Books API.');
    }
  };

  // Function to add a selected book to the library, saving it in AsyncStorage
  const addBook = async (book) => {
    try {
      const savedBooks = JSON.parse(await AsyncStorage.getItem('books')) || [];
      const newBooks = [...savedBooks, { 
        id: book.id, 
        title: book.volumeInfo.title, 
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No Author' 
      }];
      await AsyncStorage.setItem('books', JSON.stringify(newBooks));
      Alert.alert('Success', 'Book added to your library.');
    } catch (error) {
      Alert.alert('Error', 'Failed to add the book to your library.');
    }
  };

  // Function to handle manual book entry submission and save it to the library
  const handleManualBookSubmit = async () => {
    if (manualBook.title && manualBook.author) {
      try {
        const savedBooks = JSON.parse(await AsyncStorage.getItem('books')) || [];
        const newBooks = [...savedBooks, { 
          id: Date.now().toString(), 
          title: manualBook.title, 
          author: manualBook.author, 
          genre: manualBook.genre || 'Uncategorized' 
        }];
        await AsyncStorage.setItem('books', JSON.stringify(newBooks));
        Alert.alert('Success', 'Book added to your library.');
        setManualBook({ title: '', author: '', genre: '' }); // Clear the manual book form
      } catch (error) {
        Alert.alert('Error', 'Failed to add the book to your library.');
      }
    } else {
      Alert.alert('Validation Error', 'Please enter both title and author.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Book</Text>
      {/* Input field for the book search query */}
      <TextInput
        style={styles.input}
        placeholder="Enter book title"
        value={query}
        onChangeText={setQuery}
      />
      {/* Button to trigger the book search */}
      <Button title="Search" onPress={searchBooks} />
      
      {/* List to display search results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
              <Text style={styles.bookAuthor}>by {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author'}</Text>
            </View>
            {/* Button to add the selected book to the library */}
            <TouchableOpacity onPress={() => addBook(item)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Section to manually add a book to the library */}
      <Text style={styles.sectionTitle}>Or Add a Book Manually</Text>
      <View style={styles.form}>
        {/* Input fields for manual book entry */}
        <TextInput
          placeholder="Book Title"
          value={manualBook.title}
          onChangeText={(text) => setManualBook({ ...manualBook, title: text })}
          style={styles.formInput}
        />
        <TextInput
          placeholder="Author"
          value={manualBook.author}
          onChangeText={(text) => setManualBook({ ...manualBook, author: text })}
          style={styles.formInput}
        />
        <TextInput
          placeholder="Genre"
          value={manualBook.genre}
          onChangeText={(text) => setManualBook({ ...manualBook, genre: text })}
          style={styles.formInput}
        />
        {/* Button to submit the manual book entry */}
        <TouchableOpacity onPress={handleManualBookSubmit} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Book</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bookItem: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bookInfo: {
    flex: 1,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#005254',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  form: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formInput: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
});

export default SearchBookScreen;