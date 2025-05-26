const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Theme Toggle
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  toggleBtn.textContent = '🌞';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  toggleBtn.textContent = isLight ? '🌞' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Auth Form Elements
const authContainer = document.getElementById('auth-container');
const loginBtn = document.querySelector('.login-btn');
const closeBtn = document.getElementById('close-auth');
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Show modal
loginBtn.addEventListener('click', () => {
  authContainer.classList.remove('auth-hidden');
});

// Close modal
closeBtn.addEventListener('click', () => {
  authContainer.classList.add('auth-hidden');
});

// Toggle forms
showLogin.addEventListener('click', () => {
  showLogin.classList.add('active');
  showSignup.classList.remove('active');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

showSignup.addEventListener('click', () => {
  showSignup.classList.add('active');
  showLogin.classList.remove('active');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

// Handle Signup
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const [name, email, password, confirmPassword] = signupForm.querySelectorAll('input');

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  const user = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('loggedIn', 'true');
  alert("Signup successful!");
  updateUI();
  authContainer.classList.add('auth-hidden');
});

// Handle Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const [emailInput, passwordInput] = loginForm.querySelectorAll('input');

  const savedUser = JSON.parse(localStorage.getItem('user'));

  if (
    savedUser &&
    savedUser.email === emailInput.value &&
    savedUser.password === passwordInput.value
  ) {
    localStorage.setItem('loggedIn', 'true');
    alert("Login successful!");
    updateUI();
    authContainer.classList.add('auth-hidden');
  } else {
    alert("Invalid credentials!");
  }
});

// UI Update
function updateUI() {
  const navControls = document.querySelector('.nav-controls');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  navControls.innerHTML = `
    <button id="theme-toggle" aria-label="Toggle Theme">${body.classList.contains('light') ? '🌞' : '🌙'}</button>
    ${
      isLoggedIn
        ? `
      <button class="nav-btn">Decks</button>
      <button class="nav-btn">Dashboard</button>
      <button class="nav-btn">Badges</button>
      <button class="nav-btn">Leadership</button>
      <button id="logout-btn">Logout</button>
    `
        : `<button class="login-btn">Login / Signup</button>`
    }
  `;

  // Re-bind necessary buttons
  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeToggleBtn.textContent = isLight ? '🌞' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.setItem('loggedIn', 'false');
      alert("Logged out successfully");
      updateUI();
    });
  }

  const loginBtnNew = document.querySelector('.login-btn');
  if (loginBtnNew) {
    loginBtnNew.addEventListener('click', () => {
      authContainer.classList.remove('auth-hidden');
    });
  }
}

// Load UI on page load
updateUI();
