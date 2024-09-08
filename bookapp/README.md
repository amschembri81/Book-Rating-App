My Book App

This is a personal book management application that allows users to search for books via the Google Books API, manually add books, and categorize them into “Want to Read,” “Currently Reading,” and “Finished” sections. It features a full-stack architecture with a React front-end, Express back-end, and MongoDB for data storage.

Table of Contents

	•	Getting Started
	•	Available Scripts
	•	API Endpoints
	•	Environment Variables
	•	Project Structure
	•	Technologies Used

Getting Started

To get started with the app, follow the instructions below.

Prerequisites

Make sure you have the following installed:

	•	Node.js (v14 or later)
	•	MongoDB
	•	npm or Yarn

Installation

	1.	Clone the repository:
        git clone https://github.com/your-username/book-app.git
    
    2.	Navigate into the project directory:
        cd book-app

    3.	Install the dependencies:
        npm install

    4.	Set up the environment variables. Create a .env file in the root   
        directory and add the following keys:
            PORT=5000
            REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
            REACT_APP_NYT_API_KEY=your_nyt_api_key
            JWT_SECRET_KEY=your_secret_key
            MONGO_URI=your_mongo_db_connection_string

    5.	Start the development server for the React front-end:
        npm start

    6. Start the backend server:
        npm run server

	7.	(Optional) If you have nodemon installed, you can use:
        npm run dev

        This will run both the front-end and back-end concurrently using concurrently.

Available Scripts

In the project directory, you can run the following:

npm start

	•	Runs the React front-end in the development mode.
	•	Open http://localhost:3000 to view it in the browser.

npm run server

	•	Runs the Express.js back-end server on http://localhost:5000.

npm run dev

	•	Runs both the React front-end and Express.js back-end concurrently.

npm test

	•	Launches the test runner.

npm run build

	•	Builds the React app for production to the build folder.
	•	Bundles React in production mode and optimizes the build for the best performance.

API Endpoints

GET /api/books

	•	Retrieves all books from the library.

POST /api/books

	•	Adds a new book to the library.
	•	Request Body Example:
        {
        "title": "Book Title",
        "author": "Author Name",
        "genre": "Fiction",
        "status": "Want to Read"
        }

PUT /api/books/:id

	•	Updates the status of a book by its ID.
	•	Request Body Example:
        {
        "status": "Currently Reading"
        }

DELETE /api/books/:id

	•	Deletes a book from the library by its ID.

GET /api/search/books

	•	Searches for books using the Google Books API by title.
	•	Query Parameters:
	•	title: The title of the book to search for.
	•	Example:
        GET /api/search/books?title=The+Great+Gatsby

Environment Variables

Make sure to create a .env file in the root directory of the project and add the following environment variables:
        PORT=5000
        REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
        REACT_APP_NYT_API_KEY=your_nyt_api_key
        JWT_SECRET_KEY=your_secret_key
        MONGO_URI=your_mongo_db_connection_string   

Project Structure

Here’s a general overview of the project structure:

/book-app
├── /src                  # React front-end source code
│   ├── /components        # Reusable components
│   ├── /pages             # Page components
│   ├── /styles            # CSS and styling files
├── /models                # Mongoose models (Book.js, User.js)
├── /routes                # Express.js API routes (books.js, users.js, auth.js, search.js)
├── /controllers           # Controllers for handling business logic
├── /config                # Configuration files (like environment settings)
├── /public                # Public assets (images, HTML files)
├── /build                 # Production-ready React build
├── .env                   # Environment variables file
├── package.json           # Node.js dependencies and scripts
└── README.md              # Project documentation

Technologies Used

	•	Front-End: React, Axios, React Router, React Toastify
	•	Back-End: Node.js, Express.js, Mongoose, JWT (JSON Web Tokens)
	•	Database: MongoDB
	•	External APIs: Google Books API, New York Times Books API
	•	Styling: CSS, Styled Components

Contributors: Amanda Morrison, Sai Krupa



