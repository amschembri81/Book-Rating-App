import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component for navigation

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        {/* Home Link */}
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        {/* Library Link */}
        <li style={styles.navItem}>
          <Link to="/library" style={styles.navLink}>Library</Link>
        </li>
        {/* Add Book Link - This was renamed from "Search Book" to "Add Book" */}
        <li style={styles.navItem}>
          <Link to="/search-book" style={styles.navLink}>Add Book</Link>
        </li>
        {/* My Account Link */}
        <li style={styles.navItem}>
          <Link to="/my-account" style={styles.navLink}>My Account</Link>
        </li>
        {/* Login Link */}
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333', // Dark background for the navbar
    padding: '10px 20px', // Padding for spacing inside the navbar
  },
  navList: {
    listStyle: 'none', // Remove bullet points from the list
    display: 'flex', // Display items in a row
    justifyContent: 'space-around', // Evenly space the items across the navbar
    margin: 0, // Remove default margin
    padding: 0, // Remove default padding
  },
  navItem: {
    margin: '0 10px', // Margin around each nav item for spacing
  },
  navLink: {
    color: '#fff', // White text color for links
    textDecoration: 'none', // Remove underline from links
    fontSize: '18px', // Set font size for nav links
  },
};

export default Navbar;