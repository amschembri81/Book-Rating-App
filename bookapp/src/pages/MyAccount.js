import React, { useState } from "react";

function MyAccount() {
  // State to manage user information
  const [user, setUser] = useState({
    name: "Jane Smith",
    email: "jsmith@example.com",
    biography: "",
    favoriteGenres: "",
    profilePicture: null,
  });

  // Handle changes to text inputs (name, email, biography, favorite genres)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,  // Keep the existing state
      [name]: value,  // Update the specific field
    });
  };

  // Handle changes to the profile picture file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];  // Get the first file from the input
    setUser({
      ...user,
      profilePicture: URL.createObjectURL(file),  // Create a preview URL for the image
    });
  };

  // Handle form submission to save changes
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here (e.g., send the data to an API)
    alert("Profile updated successfully!");
  };

  return (
    <div style={styles.container}>
      <h2>My Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.profilePictureContainer}>
          {/* Display the profile picture, or a placeholder if not available */}
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={styles.profilePicture}
          />
          <input type="file" name="profilePicture" onChange={handleFileChange} style={styles.fileInput} />
        </div>
        <div style={styles.accountDetails}>
          {/* Name input */}
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            style={styles.input}
          />
          {/* Email input */}
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            style={styles.input}
          />
          {/* Biography input */}
          <label style={styles.label}>Biography:</label>
          <textarea
            name="biography"
            value={user.biography}
            onChange={handleInputChange}
            style={styles.textarea}
            placeholder="Tell us about yourself..."
          />
          {/* Favorite Genres input */}
          <label style={styles.label}>Favorite Genres:</label>
          <input
            type="text"
            name="favoriteGenres"
            value={user.favoriteGenres}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="E.g., Fiction, Mystery, Romance"
          />
          {/* Save Changes button */}
          <button type="submit" style={styles.button}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'lightblue',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Center content in the form
  },
  profilePictureContainer: {
    marginBottom: '20px',
    textAlign: 'center',  // Center the profile picture container
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',  // Make the image round
    objectFit: 'cover',
    marginBottom: '10px',
  },
  fileInput: {
    display: 'block',
    margin: '10px auto',  // Center the file input
  },
  accountDetails: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Center content in the account details section
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',  // Align the label to the start of the input field
  },
  input: {
    width: '95%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '95%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#005254',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: "bold",
    marginTop: "20px",
    alignSelf: 'center',  // Center the button within the form
  },
};

export default MyAccount;