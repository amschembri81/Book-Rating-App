Book Rating App

Welcome to the Book Rating App repository! This repository contains three versions of the project, each progressively building on the last to offer enhanced functionality, better design, and a mobile version.

Project Versions

1. book-rating-app (Original Web Application)

	•	Description: The original version of the project, built as a web application using React.
	•	Features:
	•	Users can search for books and rate them.
	•	Basic CSS styling for layout and presentation.
	•	Technologies Used:
	•	React
	•	JavaScript
	•	CSS

2. bookapp (Iterated Web Application)

	•	Description: This version builds upon the original application, adding more advanced CSS styling and integrating two APIs for enhanced functionality.
	•	Features:
	•	Improved user interface with refined CSS styling.
	•	Integration with Google Books API for book searches.
	•	Integration with the New York Times API to display bestsellers.
	•	Users can search for books, view details, and rate them.
	•	Technologies Used:
	•	React
	•	JavaScript
	•	CSS
	•	Google Books API
	•	New York Times API

3. BookAppMobile (Mobile Application)

	•	Description: This is the mobile version of the iterated web application (#2), developed using React Native.
	•	Features:
	•	All the features from the web application, optimized for mobile devices.
	•	Users can search for books, view details, and add books to their library.
	•	Integration with Google Books API for book searches.
	•	Integration with the New York Times API to display bestsellers.
	•	Technologies Used:
	•	React Native
	•	JavaScript
	•	Google Books API
	•	New York Times API

Installation
To get started with any version of the project, follow the steps below:

Clone the Repository
  git clone https://github.com/amschembri81/Book-Rating-App.git
  cd Book-Rating-App

Install Dependencies
For the web versions:
  cd bookapp # or book-rating-app
  npm install

For the mobile version:
  cd BookAppMobile
  npm install

Run the Application
For the web versions:
  npm start

For the mobile version:
  npx react-native run-android # For Android
  npx react-native run-ios     # For iOS

Usage

	•	Web Applications: Accessible through a web browser after starting the development server.
	•	Mobile Application: Runs on an Android or iOS emulator or a physical device.

API Keys

This project requires API keys for Google Books and the New York Times. Store these keys in a 
.env file at the root directory for the web applications and the mobile app:

  REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
  REACT_APP_NYT_API_KEY=your_nyt_api_key

  Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your changes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For questions or feedback, feel free to contact Amanda Morrison or Sai Krupa.

This README provides a clear and structured overview of your project, including installation 
instructions, usage, and contribution guidelines.



