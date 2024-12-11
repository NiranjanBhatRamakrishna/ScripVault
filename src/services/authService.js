// src/services/authService.js

export const login = (username, password) => {
    // Simulating a network request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "user" && password === "password") {
          const token = "mockAuthToken"; // Replace this with a real token logic if needed
          localStorage.setItem("authToken", token);
          resolve({ success: true, token });
        } else {
          reject({ success: false, message: "Invalid username or password" });
        }
      }, 1000); // Simulating delay
    });
  };
  
  export const logout = () => {
    localStorage.removeItem("authToken");
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };
  