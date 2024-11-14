document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const loginOverlay = document.getElementById("loginOverlay");
  const closeLogin = document.getElementById("closeLogin");
  const loginForm = document.getElementById("loginForm");
  const userSection = document.getElementById("userSection");
  const loginButtonContainer = document.getElementById("loginButtonContainer");
  const userEmail = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  // Show login form
  loginBtn.addEventListener("click", () => {
    loginOverlay.style.display = "block";
  });

  // Close login form
  closeLogin.addEventListener("click", () => {
    loginOverlay.style.display = "none";
  });

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccessfulLogin(email);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  });

  // Handle logout
  logoutBtn.addEventListener("click", () => {
    loginButtonContainer.style.display = "block";
    userSection.style.display = "none";
  });

  function handleSuccessfulLogin(email) {
    loginOverlay.style.display = "none";
    loginButtonContainer.style.display = "none";
    userSection.style.display = "flex";
    userEmail.textContent = email;
    loginForm.reset();
  }

  // Close overlay when clicking outside the form
  loginOverlay.addEventListener("click", (e) => {
    if (e.target === loginOverlay) {
      loginOverlay.style.display = "none";
    }
  });
});
