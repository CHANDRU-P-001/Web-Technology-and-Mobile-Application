# 🤖 AI TOOLS HUB — Complete Setup Guide

## 📁 Project Structure
```
xampp_project/
├── app.py                   ← Main Flask application (Python)
├── requirements.txt         ← Python packages needed
├── database_setup.sql       ← Run in phpMyAdmin first!
├── templates/
│   ├── register.html        ← Registration page
│   ├── login.html           ← Login page
│   └── dashboard.html       ← Main dashboard + chatbot
└── static/
    ├── css/
    │   ├── auth.css         ← Register/Login styles
    │   └── dashboard.css    ← Dashboard styles
    └── js/
        ├── auth.js          ← Form validation & animations
        └── dashboard.js     ← Tools grid + AI chatbot
```

---

## ✅ STEP 1 — Start XAMPP
1. Open **XAMPP Control Panel**
2. Click **Start** on **Apache** (optional, for phpMyAdmin)
3. Click **Start** on **MySQL** ← THIS IS REQUIRED

---

## ✅ STEP 2 — Create Database (phpMyAdmin)
1. Open browser → go to `http://localhost/phpmyadmin`
2. Click **"SQL"** tab at the top
3. **Copy and paste** the contents of `database_setup.sql`
4. Click **"Go"** to run it
5. You should see `aitools_hub` database created

---

## ✅ STEP 3 — Install Python packages
Open **VS Code Terminal** (Ctrl + `) and run:
```bash
pip install flask mysql-connector-python
```

---

## ✅ STEP 4 — Run the Application
In VS Code Terminal:
```bash
cd path/to/xampp_project
python app.py
```

You should see:
```
=======================================================
  AI TOOLS HUB — Flask Server
=======================================================
  ⚠  Make sure XAMPP MySQL is RUNNING first!
  📦 Creating database tables...
  ✅ Database tables ready.
  🌐 Starting server at http://127.0.0.1:5000
=======================================================
```

---

## ✅ STEP 5 — Open in Browser
Go to: **http://127.0.0.1:5000** or **http://localhost:5000**

---

## 🎮 Features

### Register Page
- Animated orbit solar system on left
- Floating particle effects
- Real-time input validation (green ✅ / red ❌)
- Password strength meter (Weak → Ultra Strong)
- Password match checker
- Show/hide password toggle with 👁️ / 🙈
- Fun submit button with shimmer animation

### Login Page
- Same beautiful design
- Remember me checkbox
- Secure SHA-256 password verification

### Dashboard
- Sidebar navigation with animated logo
- Live clock display
- Stats row with 60+ tools, 20 categories
- All 20 AI tool category cards (clickable → opens tool)
- Search bar to filter tools
- Logout button

### 🦸 Superhero AI Chatbot (NEXUS)
- Animated superhero figure (floats, cape moves, eyes glow)
- Click to open/close chat
- Typing indicator animation
- Quick question buttons
- Knowledge base for ALL 20 categories
- Smart keyword detection (video, math, study, etc.)
- Gives top 3 tools with descriptions for any category
- Tells which are free vs subscription

---

## 🔧 Database Config
If you have custom MySQL settings, edit `app.py`:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',       # Your MySQL username
    'password': '',        # Your MySQL password (XAMPP default: empty)
    'database': 'aitools_hub',
    'port': 3306
}
```

---

## 🚀 Quick Test
1. Go to http://localhost:5000/register
2. Fill in the form and register
3. You'll be redirected to login
4. Login with your credentials
5. Explore the dashboard!
6. Click the superhero figure (bottom-right) to chat with NEXUS AI

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Database connection failed" | Start MySQL in XAMPP first! |
| "Module not found: flask" | Run `pip install flask mysql-connector-python` |
| Port 5000 in use | Change port in app.py: `app.run(port=5001)` |
| CSS not loading | Make sure you run `python app.py` from the project folder |

---

Made with ❤️ for AI enthusiasts!
