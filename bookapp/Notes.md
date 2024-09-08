Planning Document for Express Server Endpoints

Base URL: /api

1. Books Endpoint

	•	Path: /books
	•	Description: Manages the collection of books in the library.

GET /books

	•	Description: Retrieve a list of all books in the library.
	•	Response: A JSON array containing all books.

POST /books

	•	Description: Add a new book to the library.
	•	Request Body: A JSON object containing the book’s title, author, genre, status, and other relevant information.
	•	Response: A confirmation message with the details of the added book.

GET /books/:id

	•	Description: Retrieve details of a specific book by its ID.
	•	Response: A JSON object containing the book’s details.

PUT /books/:id

	•	Description: Update the details of an existing book by its ID.
	•	Request Body: A JSON object containing the updated information for the book.
	•	Response: A confirmation message with the updated details of the book.

DELETE /books/:id

	•	Description: Delete a specific book by its ID from the library.
	•	Response: A confirmation message indicating that the book has been deleted.

2. Users Endpoint

	•	Path: /users
	•	Description: Manages user accounts in the application.

GET /users

	•	Description: Retrieve a list of all users.
	•	Response: A JSON array containing all users.

POST /users

	•	Description: Register a new user.
	•	Request Body: A JSON object containing the user’s details like username, password, email, etc.
	•	Response: A confirmation message with the user’s details.

GET /users/:id

	•	Description: Retrieve details of a specific user by their ID.
	•	Response: A JSON object containing the user’s details.

PUT /users/:id

	•	Description: Update the details of an existing user by their ID.
	•	Request Body: A JSON object containing the updated user information.
	•	Response: A confirmation message with the updated user details.

DELETE /users/:id

	•	Description: Delete a specific user by their ID.
	•	Response: A confirmation message indicating that the user has been deleted.

3. Auth Endpoint

	•	Path: /auth
	•	Description: Handles user authentication.

POST /auth/login

	•	Description: Authenticates a user and provides a token.
	•	Request Body: A JSON object containing username and password.
	•	Response: A JSON object containing the authentication token and user details.

POST /auth/register

	•	Description: Registers a new user.
	•	Request Body: A JSON object containing user registration details.
	•	Response: A confirmation message with user details and an authentication token.

4. Search Endpoint

	•	Path: /search
	•	Description: Manages the book search functionality, including searches via Google Books API.

GET /search/books

	•	Description: Search for books using the Google Books API based on a query parameter.
	•	Query Parameters: title (the title of the book to search for)
	•	Response: A JSON array containing search results from the Google Books API.

Setting Up the Express Server

1. Folder Structure:

	•	routes/
	•	node_modules/
	•	package.json
	•	.gitignore

2. Commands:

	•	Initialize a new Git repository.
	•	Create a .gitignore file and add node_modules.
	•	Install dependencies.

3. Router Module Files:

	•	Routes Folder: routes/
	•	books.js
	•	users.js
	•	auth.js
	•	search.js

4. Write Basic Code for Each Router

5. Final Steps:

	•	Create an Express server in server.js that uses these routers.
	•	Test the basic endpoints using Postman or another tool.

1. Design and Implementation

REST API Specification:

The REST API will support operations to manage the user’s book library, including adding books (manually or through the Google Books API), retrieving the current library, and updating book statuses. The key endpoints for the API are:

	•	POST /api/books: Adds a book to the user’s library.
	•	Request Body: { id, title, author, genre, status }
	•	Response: { success: true, message: 'Book added', book: { id, title, author, genre, status } }
	•	GET /api/books: Retrieves all books in the user’s library.
	•	Response: [ { id, title, author, genre, status }, ... ]
	•	PUT /api/books/:id: Updates the status of a book.
	•	Request Body: { status }
	•	Response: { success: true, message: 'Book status updated' }
	•	DELETE /api/books/:id: Removes a book from the library.
	•	Response: { success: true, message: 'Book removed' }

Database Schemas:

Each book in the library will have the following structure, stored in a NoSQL database (MongoDB):

	•	Book Schema:
	{
  	"id": "123456",
  	"title": "Book Title",
  	"author": "Author Name",
  	"genre": "Fiction",
  	"status": "Want to Read",
  	"addedFromAPI": true,
  	"thumbnail": "http://path/to/thumbnail.jpg"
	}

Business Logic on the Server Side:

The server will:

	•	Validate incoming data to ensure the required fields are present.
	•	Handle interactions with the Google Books API.
	•	Persist data in the database, ensuring no duplicate books are added.
	•	Support operations for book management (adding, updating, deleting).
	•	Provide API responses for front-end communication.

2. Communication Between Front-End and Back-End:

The communication between the front-end and the server will use RESTful API calls. When a user searches for a book using the Google Books API, the front-end sends a GET request to an external API. The back-end will handle CRUD operations for books using POST, GET, PUT, and DELETE requests to the server.

Message Structure:

Request to Add a Book:
	{
  	"id": "123456",
  	"title": "Book Title",
  	"author": "Author Name",
  	"genre": "Fiction",
  	"status": "Want to Read"
	}

Response When a Book is Successfully Added:
	{
  	"success": true,
  	"message": "Book added",
  	"book": {
    	"id": "123456",
    	"title": "Book Title",
    	"author": "Author Name",
    	"genre": "Fiction",
    	"status": "Want to Read"
  		}
	}

3. Conclusions:

This project will create a fully functioning book management application where users can search for books, manually add books, and organize them into categories like “Want to Read,” “Currently Reading,” and “Finished.” The back-end will support all CRUD operations, providing a flexible and seamless experience for the user.

	•	Expected Results: A responsive and intuitive book management app that seamlessly interacts with a REST API for book data persistence.

4. References:

	•	MongoDB: https://www.mongodb.com/docs/
	•	Google Books API: https://cloud.google.com/docs
	•	React: https://www.w3schools.com/REACT/DEFAULT.ASP
	•	Postman API Network: https://www.postman.com/explore/
