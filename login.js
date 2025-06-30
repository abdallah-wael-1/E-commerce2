const loginForm = document.querySelector("form");
const togglePassword = document.getElementById("togglePassword");

const validCredentials = {
  username: "username",
  password: "123456",
};
// Toggle password visibility
togglePassword?.addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this.querySelector("i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // Show the password by changing input type to "text"
    icon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    passwordInput.type = "password";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  }
});

loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password");
    return;
  }

  if (
    username === validCredentials.username &&
    password === validCredentials.password
  ) {
    localStorage.setItem("username", username); // Store the username in localStorage

    alert(`✔️ Welcome, username! Your login was successful.`);
    window.location.href = "../Home/home.html";
  } else {
    alert("❌ Invalid username or password");
  }
});
