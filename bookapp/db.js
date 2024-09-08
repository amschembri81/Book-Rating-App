const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Load environment variables from the .env file (for secure configuration)

// The MongoDB URI is retrieved from the .env file, ensuring it's not hard-coded
const uri = process.env.MONGO_URI; 

// Create a new instance of MongoClient, specifying the server API version and configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Use stable MongoDB API version 1
    strict: true, // Strict mode enforces stricter validation of commands
    deprecationErrors: true, // Enable deprecation error messages for deprecated features
  }
});

// This function handles the connection to MongoDB
async function connectToMongoDB() {
  try {
    // Attempt to connect the MongoClient to the MongoDB server
    await client.connect();

    // Send a ping command to verify the connection to the database
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    // Return the connected client for further database interactions
    return client;
  } catch (err) {
    // If an error occurs, log the error message and exit the process
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit with an error status code (1 indicates an error)
  }
}

// Export the connectToMongoDB function so other parts of the application can use it
module.exports = connectToMongoDB;