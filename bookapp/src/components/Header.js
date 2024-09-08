import React from "react";

function Header() {
  // The Header component returns a styled header with the app title
  return (
    <header style={styles.header}>
      {/* Main title of the application */}
      <h1 style={styles.headerTitle}>My Book App</h1>
    </header>
  );
}

// Define the inline styles for the header component
const styles = {
  header: {
    padding: '20px', // Adds spacing inside the header
    backgroundColor: '#f8f8f8', // Light gray background color
    borderBottomWidth: '1px', // Border width at the bottom
    borderBottomColor: '#ddd', // Light gray border color
    textAlign: 'center', // Centers the header text horizontally
  },
  headerTitle: {
    fontSize: '24px', // Sets a larger font size for the title
    fontWeight: 'bold', // Makes the title text bold
  },
};

export default Header;