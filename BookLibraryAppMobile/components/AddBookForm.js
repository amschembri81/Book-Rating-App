import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddBookForm = ({ onAddBook, onSearchBook }) => {
  // State to manage the input fields for book details
  const [name, setName] = useState('');  // State for the book title
  const [author, setAuthor] = useState('');  // State for the book author
  const [category, setCategory] = useState('');  // State for the book category

  // Function to handle adding a book
  const handleAddBook = () => {
    onAddBook({ name, author, category });  // Call the onAddBook function with the book details
    // Reset the input fields after adding the book
    setName('');
    setAuthor('');
    setCategory('');
  };

  // Function to handle searching for a book
  const handleSearchBook = () => {
    onSearchBook(name);  // Call the onSearchBook function with the book title to search
  };

  return (
    <View style={styles.container}>
      {/* Form Title */}
      <Text style={styles.title}>Add a New Book</Text>
      
      {/* Input for Book Title */}
      <TextInput
        style={styles.input}
        placeholder="Enter book title"
        value={name}
        onChangeText={setName}
      />
      
      {/* Input for Author */}
      <TextInput
        style={styles.input}
        placeholder="Enter author"
        value={author}
        onChangeText={setAuthor}
      />
      
      {/* Input for Category */}
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      />
      
      {/* Button to Add Book */}
      <Button title="Add Book" onPress={handleAddBook} />
      
      {/* Button to Search Book */}
      <Button title="Search Book" onPress={handleSearchBook} />
    </View>
  );
};

// Styling for the form and its components
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default AddBookForm;