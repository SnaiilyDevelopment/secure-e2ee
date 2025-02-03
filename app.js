document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const chatSection = document.getElementById("chat-section");
  const loginSection = document.getElementById("login-section");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");

  let userName = "";
  let socket = null;

  // Simulate WebAuthn login
  loginButton.addEventListener("click", function () {
    // Simulating a login process. In a real implementation, use the WebAuthn API.
    loginButton.disabled = true;
    loginButton.textContent = "Authenticating...";
    setTimeout(function () {
      loginButton.disabled = false;
      loginButton.textContent = "Login with WebAuthn";
      proceedToChat();
    }, 1000);
  });

  // Logout handler
  logoutButton.addEventListener("click", function () {
    if(socket) {
      socket.disconnect();
      socket = null;
    }
    chatSection.style.display = "none";
    loginSection.style.display = "block";
    chatWindow.innerHTML = "";  // clear chat messages on logout
  });

  // Handle sending chat messages
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message !== "" && socket) {
      appendMessage(userName, message);
      socket.emit("chat message", { username: userName, message: message });
      chatInput.value = "";
    }
  });

  // Function to display chat section, prompt username, and initialize socket connection
  function proceedToChat() {
    userName = prompt("Enter your username:");
    if(!userName) {
      userName = "Anonymous";
    }
    loginSection.style.display = "none";
    chatSection.style.display = "block";
    // Initialize Socket.io connection
    socket = io();
    socket.on("connect", function() {
      console.log("Connected to server");
    });
    socket.on("chat message", function(data) {
      appendMessage(data.username, data.message);
    });
  }

  // Function to append a new message to the chat window
  function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "mb-2";
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(messageDiv);
    // Scroll to the latest message
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}); 