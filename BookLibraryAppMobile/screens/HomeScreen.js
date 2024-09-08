import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Lottie from 'lottie-react-native';
import animationData from '../assets/Lottie.json';
import { nytApiKey } from '../config'; 

// HomeScreen component displays the NYT Bestsellers and allows users to add books to their library
function HomeScreen({ onAddToLibrary }) {
  const [bestsellers, setBestsellers] = useState([]); // State to store the list of bestsellers

  useEffect(() => {
    // Function to fetch the NYT Bestsellers list
    const fetchBestsellers = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nytApiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch NYT Bestsellers');
        }
        const data = await response.json();
        setBestsellers(data.results.books.slice(0, 10)); // Store the top 10 books in state
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
      }
    };

    fetchBestsellers(); // Call the function to fetch data on component mount
  }, []);

  // Function to handle adding a book to the library
  const handleAddToLibrary = (book) => {
    const newBook = {
      id: book.rank, // Use the book's rank as a unique identifier
      title: book.title,
      author: book.author,
      genre: book.genre || 'Uncategorized', // Default to 'Uncategorized' if no genre is provided
      thumbnail: book.book_image,
      description: book.description,
      status: 'Want to Read', // Default status for added books
    };
    onAddToLibrary(newBook); // Add the book to the library
  };

  return (
    <View style={styles.container}>
      {/* Display a Lottie animation at the top */}
      <Lottie
        source={animationData}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />

      {/* Display a welcome message */}
      <Text style={styles.welcomeText}>Welcome to My Book App</Text>

      {/* Display the section title for NYT Bestsellers */}
      <Text style={styles.sectionTitle}>NYT Bestsellers</Text>

      {/* Render the list of NYT Bestsellers */}
      <FlatList
        data={bestsellers}
        keyExtractor={(item) => item.rank.toString()} // Use the book's rank as the key
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            {/* Display the book's cover image */}
            <Image
              source={{ uri: item.book_image }}
              style={styles.bookCover}
            />
            <View style={styles.bookInfo}>
              {/* Display the book's title */}
              <Text style={styles.bookTitle}>{item.title}</Text>
              {/* Display the book's author */}
              <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              {/* Display the book's genre */}
              <Text style={styles.bookGenre}>Genre: {item.genre || 'Uncategorized'}</Text>
              {/* Display the number of weeks the book has been on the list */}
              <Text style={styles.bookWeeks}>Weeks on list: {item.weeks_on_list}</Text>
              {/* Display the book's description */}
              <Text style={styles.bookDescription}>{item.description}</Text>
              {/* Button to add the book to the library */}
              <TouchableOpacity
                onPress={() => handleAddToLibrary(item)}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add to Library</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bookCover: {
    width: 60,
    height: 90,
    marginRight: 15,
    borderRadius: 4,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  bookGenre: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  bookWeeks: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#005254',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;