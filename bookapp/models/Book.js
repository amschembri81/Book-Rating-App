// Import the mongoose library to define a schema and model for MongoDB
const mongoose = require('mongoose');

// Define the schema for a 'Book' document in the MongoDB database
// This specifies the structure and types for each book entry
const bookSchema = new mongoose.Schema({
  
  // 'title' stores the title of the book (String data type)
  title: String,

  // 'author' stores the name(s) of the author(s) (String data type)
  author: String,

  // 'genre' stores the genre or category of the book (String data type)
  genre: String,

  // 'status' stores the reading status of the book, such as 'Want to Read', 
  // 'Currently Reading', or 'Finished'. It uses an enum to restrict 
  // values to these specific options.
  status: {
    type: String, // The type is String
    enum: ['Want to Read', 'Currently Reading', 'Finished'], // Restrict values to these options
    default: 'Want to Read' // Default value if not provided is 'Want to Read'
  },

  // 'thumbnail' stores the URL of the book's thumbnail image (String data type)
  thumbnail: String,

  // 'addedFromAPI' is a Boolean that indicates whether the book was added from an external API 
  // (like Google Books) or manually added by the user
  addedFromAPI: Boolean
});

// Create a model for 'Book' using the schema defined above
// A model represents the 'Book' collection in the MongoDB database 
// and allows interaction with it (CRUD operations: Create, Read, Update, Delete)
const Book = mongoose.model('Book', bookSchema);

// Export the Book model to make it available for import in other parts of the application
module.exports = Book;