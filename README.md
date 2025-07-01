# 🎓 Edo-State-University-Iyamho-ICT-Report-System 🚀

> Report, track, and resolve technical issues efficiently. Our platform provides seamless incident management for the university community.

---

## 🗂️ Project Structure

- **Frontend**: React app (in `src/`, built with Vite)
- **Backend/API**: PHP (in `api/`)
- **Database**: MySQL (SQL file in `api/Sql/database.sql`)
- **Assets**: Images, icons, etc. in `public/`
- **.htaccess**: For Apache routing and security

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [XAMPP](https://www.apachefriends.org/) or any Apache + PHP + MySQL stack (for backend)
- [Git](https://git-scm.com/) (optional, for cloning)

---

## 🚦 Setup Instructions

### 1️⃣ Clone or Download the Project

Extract or clone the project into your XAMPP `htdocs` directory (usually `C:/xampp/htdocs/`):

```
C:/xampp/htdocs/Incident System/
```

### 2️⃣ Place the `.htaccess` File

- Ensure the provided `.htaccess` file is in the root of your backend directory (e.g., `C:/xampp/htdocs/Incident System/.htaccess`).
- This file is required for proper URL routing and security with Apache.

### 3️⃣ Database Setup

- Open **phpMyAdmin** (usually at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).
- Create a new database (e.g., `incident_system`).
- Import the SQL file:
  - Go to the new database.
  - Click **Import**.
  - Select `api/Sql/database.sql` from the project.
  - Click **Go** to upload.

### 4️⃣ Configure Database Connection

- Edit `api/lib/db.php` to match your MySQL credentials (host, username, password, database name).

### 5️⃣ Install Frontend Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

### 6️⃣ Run the Frontend (Development)

```bash
npm run dev
```

- The app will be available at the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### 7️⃣ Build for Production

```bash
npm run build
```

- The production-ready files will be generated in the `dist/` folder.

### 8️⃣ 🚚 Deploy to XAMPP htdocs (Production)

**Important:**
- After running `npm run build`, copy **all files and folders from the `dist` directory directly into your XAMPP `htdocs` root** (e.g., `C:/xampp/htdocs/`).
- **Do not** place the build output in a subfolder. The app will not work if it is inside a subfolder.
- Also, copy the `.htaccess` file and the entire `api` folder into the `htdocs` root, as shown in the image above.
- Your `htdocs` directory should look like this:

```
C:/xampp/htdocs/
  ├── api/
  ├── assets/
  ├── .htaccess
  ├── bg
  ├── favicon
  ├── index.html
  ├── logo
  ├── placeholder
  ├── robots
  └── ... (other files from dist)
```

- This structure is required for the application to work correctly with Apache and the PHP backend.

---

## 👑 Admin Login Credentials

To log in as an admin, use any of the following emails with the default password:

🔑 **Default Password:** `password`

📧 **Admin Emails:**
- `admin@edouniversity.edu.ng`
- `itsehhillary@edouniversity.edu.ng`

> ⚠️ You can change these credentials in the database after your first login for security.

---

## 💻 Common Commands

| 🏷️ Command         | 📝 Description                   |
|-------------------|----------------------------------|
| `npm install`     | Install frontend dependencies     |
| `npm run dev`     | Start frontend in dev mode        |
| `npm run build`   | Build frontend for production     |

---

## 📝 Notes

- **API Endpoints**: All backend PHP files are in the `api/` directory.
- **.htaccess**: Required for clean URLs and routing. Place it in the backend root.
- **Database**: Always import the provided SQL file before first use.
- **Uploads**: Ensure the `api/uploads/` directory is writable for file uploads.

---

## 🆘 Troubleshooting

- ❌ If you see blank pages or 404s, check that `.htaccess` is present and Apache's `mod_rewrite` is enabled.
- 🛑 If you get database errors, double-check your credentials in `api/lib/db.php` and that the database is imported.
- 🌐 For CORS/API issues, ensure the frontend is making requests to the correct backend URL.

---

## 🎉 Enjoy using the Edo State University ICT Incident System! 🎉

> Made with ❤️ for the Edo State University community.