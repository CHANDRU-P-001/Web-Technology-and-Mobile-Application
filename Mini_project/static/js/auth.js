// ===========================
//  AI Tools Hub - Auth JS
//  Fun interactions & validation
// ===========================

// ---- PARTICLE SYSTEM ----
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#00e5ff', '#7c3aed', '#f59e0b', '#10b981', '#f43f5e'];
  const sizes = [2, 3, 4, 2, 3];

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle-dot';
    const size = sizes[i % sizes.length];
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[i % colors.length]};
      left: ${Math.random() * 100}%;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
      box-shadow: 0 0 ${size * 3}px ${colors[i % colors.length]};
    `;
    container.appendChild(p);
  }
})();

// ---- TOGGLE PASSWORD VISIBILITY ----
function togglePass(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = '🙈';
    input.style.letterSpacing = '0';
  } else {
    input.type = 'password';
    icon.textContent = '👁️';
    input.style.letterSpacing = '2px';
  }

  // wiggle animation
  icon.style.transform = 'scale(1.4) rotate(20deg)';
  setTimeout(() => { icon.style.transform = ''; }, 200);
}

// ---- PASSWORD STRENGTH ----
const strengthFill = document.getElementById('strengthFill');
const strengthLabel = document.getElementById('strengthLabel');

function checkStrength(password) {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  score = Object.values(checks).filter(Boolean).length;

  const levels = [
    { label: '', color: '', width: '0%' },
    { label: '🔴 Weak', color: '#f43f5e', width: '20%' },
    { label: '🟠 Fair', color: '#f59e0b', width: '40%' },
    { label: '🟡 Good', color: '#eab308', width: '60%' },
    { label: '🟢 Strong', color: '#10b981', width: '80%' },
    { label: '💪 Ultra Strong!', color: '#00e5ff', width: '100%' },
  ];

  const level = levels[score] || levels[0];
  if (strengthFill) {
    strengthFill.style.width = level.width;
    strengthFill.style.background = level.color;
    strengthFill.style.boxShadow = score > 0 ? `0 0 8px ${level.color}` : 'none';
  }
  if (strengthLabel) {
    strengthLabel.textContent = level.label;
    strengthLabel.style.color = level.color;
  }
  return score;
}

// ---- PASSWORD MATCH CHECK ----
const matchLabel = document.getElementById('matchLabel');

function checkMatch() {
  const pass = document.getElementById('password');
  const conf = document.getElementById('confirm_password');
  if (!pass || !conf || !matchLabel) return true;
  if (!conf.value) { matchLabel.textContent = ''; return false; }

  if (pass.value === conf.value) {
    matchLabel.textContent = '✅ Passwords match!';
    matchLabel.style.color = '#10b981';
    conf.classList.remove('invalid');
    conf.classList.add('valid');
    return true;
  } else {
    matchLabel.textContent = '❌ Passwords do not match';
    matchLabel.style.color = '#f43f5e';
    conf.classList.remove('valid');
    conf.classList.add('invalid');
    return false;
  }
}

// ---- REAL-TIME INPUT VALIDATION ----
function validateInput(input, checkFn, checkId) {
  const check = document.getElementById(checkId);
  const isValid = checkFn(input.value);
  if (input.value.length === 0) {
    input.classList.remove('valid', 'invalid');
    if (check) check.textContent = '';
    return;
  }
  if (isValid) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    if (check) { check.textContent = '✅'; check.style.animation = 'none'; }
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    if (check) check.textContent = '❌';
  }
}

// ---- SETUP EVENT LISTENERS ----
document.addEventListener('DOMContentLoaded', () => {
  // Full name
  const nameInput = document.getElementById('fullname');
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateInput(nameInput, v => v.trim().length >= 2, 'nameCheck');
    });
  }

  // Email
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateInput(emailInput, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'emailCheck');
    });
  }

  // Username
  const usernameInput = document.getElementById('username');
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      validateInput(usernameInput, v => v.length >= 3 && /^[a-zA-Z0-9_]+$/.test(v), 'usernameCheck');
    });
  }

  // Password strength
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      checkStrength(passwordInput.value);
      checkMatch();
    });
  }

  // Confirm password
  const confirmInput = document.getElementById('confirm_password');
  if (confirmInput) {
    confirmInput.addEventListener('input', checkMatch);
  }

  // Form submit animation
  const form = document.getElementById('registerForm') || document.getElementById('loginForm');
  const btn = document.getElementById('submitBtn');

  if (form && btn) {
    form.addEventListener('submit', (e) => {
      btn.classList.add('loading');
      btn.disabled = true;

      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;width:10px;height:10px;
        background:rgba(255,255,255,0.3);border-radius:50%;
        animation:rippleEffect 0.6s ease-out forwards;
        top:50%;left:50%;transform:translate(-50%,-50%);
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Input focus glow effect
  document.querySelectorAll('.input-wrap input').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.input-group').querySelector('.input-icon').style.filter = 
        'drop-shadow(0 0 8px rgba(0,229,255,0.8))';
    });
    input.addEventListener('blur', () => {
      input.closest('.input-group').querySelector('.input-icon').style.filter = '';
    });
  });
});

// ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    0% { transform: translate(-50%,-50%) scale(1); opacity:1; }
    100% { transform: translate(-50%,-50%) scale(20); opacity:0; }
  }
`;
document.head.appendChild(style);
