"""
AI Tools Hub - Flask Application
Connect with XAMPP MySQL Database
Run: python app.py
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector
from mysql.connector import Error
import hashlib
import os
from datetime import datetime
import re

app = Flask(__name__)
app.secret_key = 'aitools_hub_secret_key_2025'

# ============================================================
#  DATABASE CONFIGURATION
#  Make sure XAMPP MySQL is running before starting!
# ============================================================
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',       # XAMPP default user
    'password': '',        # XAMPP default: empty password
    'database': 'aitools_hub',
    'port': 3306
}

# ============================================================
#  DATABASE CONNECTION
# ============================================================
def get_db():
    """Get a fresh DB connection."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"[DB ERROR] Could not connect: {e}")
        return None

def hash_password(password: str) -> str:
    """SHA-256 hash a password."""
    return hashlib.sha256(password.encode()).hexdigest()

# ============================================================
#  INITIALIZE DATABASE TABLES
# ============================================================
def init_db():
    """Create tables if they don't exist."""
    conn = get_db()
    if not conn:
        print("[INIT] ⚠ Cannot connect to database. Is XAMPP MySQL running?")
        return False
    try:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id          INT AUTO_INCREMENT PRIMARY KEY,
                fullname    VARCHAR(120) NOT NULL,
                email       VARCHAR(255) NOT NULL UNIQUE,
                username    VARCHAR(80)  NOT NULL UNIQUE,
                password    VARCHAR(64)  NOT NULL,
                created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login  DATETIME DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """)
        conn.commit()
        print("[INIT] ✅ Database tables ready.")
        return True
    except Error as e:
        print(f"[INIT ERROR] {e}")
        return False
    finally:
        cur.close()
        conn.close()

# ============================================================
#  ROUTES
# ============================================================

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


# ---- REGISTER ----
@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        fullname    = request.form.get('fullname', '').strip()
        email       = request.form.get('email', '').strip().lower()
        username    = request.form.get('username', '').strip()
        password    = request.form.get('password', '')
        confirm_pw  = request.form.get('confirm_password', '')

        # ---- Validation ----
        errors = []

        if len(fullname) < 2:
            errors.append("Full name must be at least 2 characters.")

        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
            errors.append("Please enter a valid email address.")

        if len(username) < 3 or not re.match(r'^[a-zA-Z0-9_]+$', username):
            errors.append("Username must be 3+ chars (letters, numbers, underscore).")

        if len(password) < 6:
            errors.append("Password must be at least 6 characters.")

        if password != confirm_pw:
            errors.append("Passwords do not match.")

        if errors:
            for err in errors:
                flash(err, 'error')
            return render_template('register.html')

        # ---- Save to DB ----
        conn = get_db()
        if not conn:
            flash("Database connection failed. Is XAMPP running?", 'error')
            return render_template('register.html')

        try:
            cur = conn.cursor()

            # Check duplicates
            cur.execute("SELECT id FROM users WHERE email=%s OR username=%s", (email, username))
            existing = cur.fetchone()
            if existing:
                flash("Email or username already exists. Please use another.", 'error')
                return render_template('register.html')

            # Insert user
            hashed = hash_password(password)
            cur.execute(
                "INSERT INTO users (fullname, email, username, password) VALUES (%s, %s, %s, %s)",
                (fullname, email, username, hashed)
            )
            conn.commit()
            flash("🎉 Account created successfully! Please login.", 'success')
            return redirect(url_for('login'))

        except Error as e:
            print(f"[REGISTER ERROR] {e}")
            flash("Registration failed. Please try again.", 'error')
            return render_template('register.html')
        finally:
            cur.close()
            conn.close()

    return render_template('register.html')


# ---- LOGIN ----
@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')

        if not email or not password:
            flash("Please fill in all fields.", 'error')
            return render_template('login.html')

        conn = get_db()
        if not conn:
            flash("Database connection failed. Is XAMPP running?", 'error')
            return render_template('login.html')

        try:
            cur = conn.cursor(dictionary=True)
            hashed = hash_password(password)
            cur.execute(
                "SELECT id, fullname, username FROM users WHERE email=%s AND password=%s",
                (email, hashed)
            )
            user = cur.fetchone()

            if user:
                # Update last_login
                cur.execute("UPDATE users SET last_login=%s WHERE id=%s", (datetime.now(), user['id']))
                conn.commit()

                session['user_id']  = user['id']
                session['username'] = user['username']
                session['fullname'] = user['fullname']

                flash(f"Welcome back, {user['username']}! 🚀", 'success')
                return redirect(url_for('dashboard'))
            else:
                flash("Invalid email or password. Please try again.", 'error')
                return render_template('login.html')

        except Error as e:
            print(f"[LOGIN ERROR] {e}")
            flash("Login failed. Please try again.", 'error')
            return render_template('login.html')
        finally:
            cur.close()
            conn.close()

    return render_template('login.html')


# ---- DASHBOARD ----
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash("Please login to access the dashboard.", 'info')
        return redirect(url_for('login'))
    return render_template('dashboard.html', username=session.get('username', 'Explorer'))


# ---- LOGOUT ----
@app.route('/logout')
def logout():
    username = session.get('username', '')
    session.clear()
    flash(f"See you soon, {username}! 👋", 'success')
    return redirect(url_for('login'))


# ---- API: Check username/email availability (optional AJAX) ----
@app.route('/api/check', methods=['POST'])
def check_availability():
    data = request.json or {}
    field = data.get('field')
    value = data.get('value', '').strip().lower()

    if field not in ('email', 'username') or not value:
        return {'available': False, 'message': 'Invalid request'}

    conn = get_db()
    if not conn:
        return {'available': True, 'message': 'DB offline'}

    try:
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM users WHERE {field}=%s", (value,))
        exists = cur.fetchone()
        if exists:
            return {'available': False, 'message': f'{field.capitalize()} already taken'}
        return {'available': True, 'message': f'{field.capitalize()} is available!'}
    except Error:
        return {'available': True, 'message': 'Could not check'}
    finally:
        cur.close()
        conn.close()


# ============================================================
#  MAIN
# ============================================================
if __name__ == '__main__':
    print("=" * 55)
    print("  AI TOOLS HUB — Flask Server")
    print("=" * 55)
    print("  ⚠  Make sure XAMPP MySQL is RUNNING first!")
    print("  📦 Creating database tables...")
    init_db()
    print("  🌐 Starting server at http://127.0.0.1:5000")
    print("=" * 55)
    app.run(debug=True, port=5000)
