-- ================================================
--  AI TOOLS HUB — Database Setup SQL
--  Run this in XAMPP phpMyAdmin
--  URL: http://localhost/phpmyadmin
-- ================================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS aitools_hub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Step 2: Use the database
USE aitools_hub;

-- Step 3: Create users table
CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    fullname    VARCHAR(120)  NOT NULL,
    email       VARCHAR(255)  NOT NULL UNIQUE,
    username    VARCHAR(80)   NOT NULL UNIQUE,
    password    VARCHAR(64)   NOT NULL,        -- SHA-256 hash (64 chars)
    created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
    last_login  DATETIME      DEFAULT NULL,
    is_active   TINYINT(1)    DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 4: Verify table created
DESCRIBE users;

-- ================================================
--  OPTIONAL: View all registered users
--  SELECT * FROM users;
-- ================================================
