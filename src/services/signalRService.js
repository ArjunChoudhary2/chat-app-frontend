// src/signalRService.js
import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = null;
  }

  startConnection = async () => {
    // Create a connection to the SignalR hub
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7037/chathub") // Ensure the URL matches your backend
      .build();

    // Register the ReceiveMessage event listener
    this.connection.on("ReceiveMessage", (user, message) => {
      console.log(`${user} says: ${message}`);
      // You can update your UI here, e.g., using state management or triggering a re-render
    });

    // Start the connection
    try {
      await this.connection.start();
      console.log("SignalR connected.");
    } catch (err) {
      console.error("SignalR connection error: ", err);
      setTimeout(() => this.startConnection(), 5000); // Retry if connection fails
    }
  };

  // Function to send a message to all clients
  sendMessage = async (user, message) => {
    if (this.connection) {
      try {
        // Invoke the SendMessage method on the SignalR hub
        await this.connection.invoke("SendMessage", user, message);
        console.log("Message sent: ", message);
      } catch (err) {
        console.error("Error sending message: ", err);
      }
    }
  };

  // Optional: join and leave group logic can be removed if you're not handling groups yet
  // Keeping these methods for potential future usage

  joinGroup = async (groupName) => {
    if (this.connection) {
      try {
        await this.connection.invoke("JoinGroup", groupName);
        console.log("Joined group: ", groupName);
      } catch (err) {
        console.error("Error joining group: ", err);
      }
    }
  };

  leaveGroup = async (groupName) => {
    if (this.connection) {
      try {
        await this.connection.invoke("LeaveGroup", groupName);
        console.log("Left group: ", groupName);
      } catch (err) {
        console.error("Error leaving group: ", err);
      }
    }
  };
}

export default new SignalRService();
