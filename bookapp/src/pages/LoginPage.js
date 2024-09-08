import React, { useState } from "react";

function LoginPage() {
  // State variables for handling form data and validation messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for toggling the registration modal
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  // Handles the login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate the username (email format)
    if (!username.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate the password length
    if (password.length < 7) {
      setErrorMessage("Password must contain at least 7 characters.");
      return;
    }

    // If validation passes, clear the error message and log the user in
    setErrorMessage("");
    console.log("Logged in:", { username, password });
  };

  // Handles changes to the registration form inputs
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // Handles the registration form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate the email format
    if (!registerData.email.includes("@")) {
      setRegisterErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate the password length
    if (registerData.password.length < 7) {
      setRegisterErrorMessage("Password must contain at least 7 characters.");
      return;
    }

    // If validation passes, clear the error message, register the user, and close the modal
    setRegisterErrorMessage("");
    console.log("Registered:", registerData);
    setIsModalVisible(false);
  };

  // Toggles the visibility of the registration modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div style={styles.container}>
      <h1>Hello 👋 </h1>
      <h2> Please Login </h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {/* Display error message if there's a validation error */}
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {/* Submit button for login */}
        <button type="submit" style={styles.button}>Login</button>
      </form>

      {/* Button to open the registration modal */}
      <button onClick={toggleModal} style={styles.registerButton}>
        Register
      </button>

      {/* Registration modal */}
      {isModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterInputChange}
                required
                style={styles.input}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterInputChange}
                required
                style={styles.input}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="registerPassword"
                name="password"
                value={registerData.password}
                onChange={handleRegisterInputChange}
                required
                style={styles.input}
              />

              {/* Display error message if there's a validation error */}
              {registerErrorMessage && <p style={styles.errorMessage}>{registerErrorMessage}</p>}

              {/* Submit button for registration */}
              <button type="submit" style={styles.button}>Register</button>
              
              {/* Button to close the modal */}
              <button type="button" onClick={toggleModal} style={styles.closeButton}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxHeight: "450px",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '70%',
  },
  button: {
    padding: '10px',
    backgroundColor: 'darkblue',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '40%',
    fontWeight: "bold",
    fontSize: "18px", // Keep this fontSize and remove any duplicate fontSize key
  },
  registerButton: {
    padding: '10px',
    backgroundColor: 'lightcoral',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '40%',
    fontWeight: "bold",
    fontSize: "18px", // Keep this fontSize and remove any duplicate fontSize key
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '90%',
    maxWidth: '200px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  modalContent: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

export default LoginPage;