// public/js/auth.js

const API_BASE = '/api';

// Helper to show messages
function showMessage(message, isError = false) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white text-sm shadow-lg z-50 ${isError ? 'bg-red-500' : 'bg-green-500'}`;
  msgDiv.textContent = message;
  document.body.appendChild(msgDiv);
  
  setTimeout(() => msgDiv.remove(), 4000);
}

// ==================== REGISTER ====================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();

      if (res.ok) {
        showMessage('✅ Registration successful! Redirecting to login...');
        setTimeout(() => window.location.href = '/login.html', 1500);
      } else {
        showMessage(data.error || 'Registration failed', true);
      }
    } catch (err) {
      showMessage('❌ Something went wrong', true);
    }
  });
}

// ==================== LOGIN ====================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        showMessage('✅ Login successful! Redirecting...');
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          setTimeout(() => window.location.href = '/admin/dashboard.html', 1200);
        } else {
          setTimeout(() => window.location.href = '/search.html', 1200);
        }
      } else {
        showMessage(data.error || 'Login failed', true);
      }
    } catch (err) {
      showMessage('❌ Something went wrong', true);
    }
  });
}