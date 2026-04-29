// doctorServices.js — API logic for Doctor entity

// import API Base URL
import { API_BASE_URL } from "../config/config.js";

// Define a constant for the doctor-related base endpoint.
// Base endpoint
const DOCTOR_API = `${API_BASE_URL}/api/doctors`;

// === Get All Doctors ===
export async function getDoctors() {
  try {
    // sends a GET request to the doctor endpoint
    const response = await fetch(DOCTOR_API);
    // awaits a response from the server
    const data = await response.json();
    // extracts and returns the list of doctors from the response JSON.
    // Returns an empty list ([]) if something goes wrong to avoid breaking the frontend.
    return data.doctors || [];
    // handles any errors using a try-catch block
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

// === Delete Doctor by ID (Admin) ===
/*
Takes the doctor’s unique id and an authentication token (for security).
Constructs the full endpoint URL using the ID and token.
Sends a DELETE request to that endpoint.
Parses the JSON response and returns a success status and message.
Catches and handles any errors to prevent frontend crashes.
*/
export async function deleteDoctor(doctorId, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/delete/${doctorId}/${token}`, {
      method: "DELETE"
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message
    };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return {
      success: false,
      message: "An unexpected error occurred."
    };
  }
}

/*
Accept a doctor object containing all doctor details (like name, email, availability).
Also take in a token for Admin authentication.
Send a POST request with headers specifying JSON data.
Include the doctor data in the request body (converted to JSON).
Return a structured response with success and message.
Catch and log any errors to help during debugging.
*/
// === Save New Doctor ===
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/create/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctor)
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message
    };
  } catch (error) {
    console.error("Error saving doctor:", error);
    return {
      success: false,
      message: "Unable to save doctor. Please try again."
    };
  }
}

/*
Accepts parameters like name, time, and specialty.
Constructs a GET request URL by passing these values as route parameters.
Sends a GET request to retrieve matching doctor records.
Returns the filtered list of doctors (or an empty list if none are found).
Handles cases where no filters are applied (pass null or empty strings appropriately).
Uses error handling to alert the user if something fails.
*/
// === Filter Doctors by Name, Time, and Specialty ===
export async function filterDoctors(name = "", time = "", specialty = "") {
  try {
    const response = await fetch(`${DOCTOR_API}/filter/${name}/${time}/${specialty}`);

    if (!response.ok) {
      console.error("Filter request failed");
      return { doctors: [] };
    }

    const data = await response.json();
    return data.doctors || [];
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Something went wrong while filtering doctors.");
    return { doctors: [] };
  }
}


/*
  Import the base API URL from the config file
  Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions


  Function: getDoctors
  Purpose: Fetch the list of all doctors from the API

   Use fetch() to send a GET request to the DOCTOR_API endpoint
   Convert the response to JSON
   Return the 'doctors' array from the response
   If there's an error (e.g., network issue), log it and return an empty array


  Function: deleteDoctor
  Purpose: Delete a specific doctor using their ID and an authentication token

   Use fetch() with the DELETE method
    - The URL includes the doctor ID and token as path parameters
   Convert the response to JSON
   Return an object with:
    - success: true if deletion was successful
    - message: message from the server
   If an error occurs, log it and return a default failure response


  Function: saveDoctor
  Purpose: Save (create) a new doctor using a POST request

   Use fetch() with the POST method
    - URL includes the token in the path
    - Set headers to specify JSON content type
    - Convert the doctor object to JSON in the request body

   Parse the JSON response and return:
    - success: whether the request succeeded
    - message: from the server

   Catch and log errors
    - Return a failure response if an error occurs


  Function: filterDoctors
  Purpose: Fetch doctors based on filtering criteria (name, time, and specialty)

   Use fetch() with the GET method
    - Include the name, time, and specialty as URL path parameters
   Check if the response is OK
    - If yes, parse and return the doctor data
    - If no, log the error and return an object with an empty 'doctors' array

   Catch any other errors, alert the user, and return a default empty result
*/
