import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { googleBooksApiKey } from '../config';

function SearchBook({ setSearchResults, onAddManualBook }) {
  // State to store the user's search query
  const [query, setQuery] = useState(""); 

  // State to store the details of a manually added book
  const [manualBook, setManualBook] = useState({
    title: "",
    author: "",
    genre: "",
  }); 

  // State to display a message when a book is successfully added
  const [bookAddedMessage, setBookAddedMessage] = useState(""); 

  // Function to fetch book data from the Google Books API based on the user's query
  const fetchBookData = async (bookTitle) => {
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&key=${googleBooksApiKey}`;
      const response = await fetch(url);

      // Handle unsuccessful API requests
      if (!response.ok) {
        throw new Error("Failed to fetch data from Google Books API");
      }
      
      const result = await response.json();
      
      // If books are found, update the search results
      if (result.items && result.items.length > 0) {
        const newBooks = result.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "No Title",
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No Author",
          genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "Uncategorized",
          thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
        }));
        setSearchResults(newBooks);
      } else {
        Alert.alert("No books found with that title.");
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
      Alert.alert("An error occurred while fetching book data. Please try again.");
    }
  };

  // Handle input change in the search bar and trigger the book data fetch
  const handleInputChange = (text) => {
    setQuery(text);
    if (!text) {
      setSearchResults([]); 
      setBookAddedMessage(""); 
      return;
    }
    fetchBookData(text); 
  };

  // Handle changes in the manual book input form
  const handleManualInputChange = (name, value) => {
    setManualBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle the submission of the manually added book
  const handleManualBookSubmit = () => {
    onAddManualBook({ ...manualBook, id: Date.now() });
    setManualBook({ title: "", author: "", genre: "" }); 
    setBookAddedMessage("Book added to library!");
  };

  return (
    <View style={styles.pageContainer}>
      {/* Title of the page */}
      <Text style={styles.pageTitle}>Add a Book to Your Library</Text>

      {/* Container for search and manual book entry */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Search For a Book</Text>

        {/* Search input field */}
        <TextInput
          placeholder="Search..."
          value={query}
          onChangeText={handleInputChange}
          style={styles.formInput}
          autoComplete="off"
        />

        <Text style={styles.sectionTitle}>Or Add a Book Manually</Text>

        {/* Form for manual book entry */}
        <View style={styles.form}>
          <TextInput
            placeholder="Book Title"
            value={manualBook.title}
            onChangeText={(text) => handleManualInputChange('title', text)}
            style={styles.formInput}
          />
          <TextInput
            placeholder="Author"
            value={manualBook.author}
            onChangeText={(text) => handleManualInputChange('author', text)}
            style={styles.formInput}
          />
          <TextInput
            placeholder="Genre"
            value={manualBook.genre}
            onChangeText={(text) => handleManualInputChange('genre', text)}
            style={styles.formInput}
          />
          <TouchableOpacity onPress={handleManualBookSubmit} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Book</Text>
          </TouchableOpacity>
        </View>

        {/* Display a message if the book is successfully added */}
        {bookAddedMessage ? (
          <Text style={styles.bookAddedMessage}>{bookAddedMessage}</Text>
        ) : null}
      </View>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#005254',
    textAlign: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    maxWidth: 575,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formInput: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    backgroundColor: '#fff',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#005254',
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookAddedMessage: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default SearchBook;