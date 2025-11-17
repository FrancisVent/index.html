# Globe IoT API - PostgreSQL Backend Setup

This directory contains the PHP backend for connecting to a PostgreSQL database.

## 📋 Prerequisites

- PHP 7.4+ with PDO PostgreSQL extension
- PostgreSQL 10+
- A running web server (Apache, Nginx, etc.)

## 🚀 Setup Instructions

### Step 1: Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE globe_iot;

# Connect to the new database
\c globe_iot

# Exit psql
\q
```

### Step 2: Import Database Schema

```bash
# Run the SQL schema file
psql -U postgres -d globe_iot -f database-schema.sql
```

Or manually run the SQL commands from `database-schema.sql` in your PostgreSQL admin tool.

### Step 3: Configure Database Credentials

Edit `config.php` and update the credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'globe_iot');
define('DB_USER', 'postgres');
define('DB_PASSWORD', 'your_password'); // ← Change this!
define('DB_PORT', 5432);
```

### Step 4: Verify API Connection

Test the API endpoint:

```bash
curl http://localhost/Globo_IoT/api/get-globe-data.php
```

Expected response:
```json
{
  "success": true,
  "arcsData": [...],
  "pontosAdicionais": [...],
  "count": {
    "arcs": 56,
    "pontos": 65
  }
}
```

## 📁 File Structure

```
api/
├── config.php              # Database configuration
├── get-globe-data.php      # Main API endpoint
├── database-schema.sql     # Database schema and sample data
└── README.md              # This file
```

## 🔄 Switching from JSON to PHP Backend

Your JavaScript code is already prepared to work with either JSON or PHP. To switch:

1. Keep the current `data/globe-data.json` as a backup
2. Update the fetch URL in `script.js` (optional - the code already supports dynamic loading):

```javascript
// Current (works with JSON):
const response = await fetch('data/globe-data.json');

// For future use with PHP endpoint:
const response = await fetch('api/get-globe-data.php');
```

## 🔐 Security Notes

- **Change the default password** in `config.php`
- Use prepared statements (already implemented with PDO)
- Use environment variables for sensitive data in production:

```php
// Better for production:
define('DB_PASSWORD', getenv('DB_PASSWORD'));
```

## 📊 Database Tables

### `arcs`
- Stores connection lines between locations
- Fields: id, startLat, startLng, endLat, endLng, name, color

### `pontos_adicionais`
- Stores additional points on the globe
- Fields: id, lat, lng, size, color

## 🛠️ Common Issues

### "Database connection failed"
- Check PostgreSQL is running
- Verify credentials in `config.php`
- Ensure database exists

### "CORS error in browser console"
- CORS headers are already set in `get-globe-data.php`
- If issues persist, check your web server configuration

### "No data showing"
- Verify sample data was inserted: `SELECT COUNT(*) FROM arcs;`
- Check browser console for fetch errors

## 📝 Adding More Data

Insert data via SQL:
```sql
INSERT INTO arcs (startLat, startLng, endLat, endLng, name, color) 
VALUES (38.7223, -9.1393, -33.8678, 151.2073, 'NEW', '#50B6E8');
```

Or create additional PHP endpoints for insert/update operations.

## ✅ Next Steps

1. Modify the JavaScript to point to the PHP endpoint when ready
2. Add more API endpoints for CRUD operations (create, read, update, delete)
3. Implement authentication if needed
4. Add logging and monitoring
