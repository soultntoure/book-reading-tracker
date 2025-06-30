# Book Reading Tracker

A web application designed to help users track their personal book reading progress, manage their digital book collection, and share reviews with friends.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Book Management:** Add, edit, and delete books from a personal library.
*   **Reading Progress Tracking:** Mark books as "To Read," "Reading," or "Completed." Track pages read, start date, and completion date.
*   **Book Details:** Store book title, author, genre, ISBN, publication year, and cover image (optional).
*   **Book Search:** Search for books within the user's library.
*   **Review System:** Write and rate reviews for completed books.
*   **Friend System:** Connect with friends, see their reading progress, and view their reviews.
*   **Discover:** Explore books and reviews from other users.

## Technical Plan

### 1. Architecture Overview

The application will follow a standard Model-View-Controller (MVC) pattern, implemented using Python Flask for the backend, PostgreSQL for the database, and standard HTML, CSS, and JavaScript for the frontend.

```
+----------------+    +----------------+    +------------------+
|    Browser     |----| Flask Backend  |----| PostgreSQL DB    |
| (HTML/CSS/JS)  |    | (Python)       |    | (Data Storage)   |
+----------------+    +----------------+    +------------------+
        |                     |
        | Frontend (Views)    | Backend (Controllers/Models)
        |                     |
        +---------------------+
```

### 2. Backend (Flask - Python)

*   **Framework:** Flask
*   **Database ORM:** SQLAlchemy
*   **Authentication:** Flask-Login for session management, Werkzeug for password hashing.
*   **API Design:** RESTful API for interaction between frontend and backend.
*   **Core Modules:
    *   `auth.py`: User registration, login, logout.
    *   `models.py`: Database models (User, Book, ReadingProgress, Review, Friendship).
    *   `views.py` (or routes within `app.py`): Define API endpoints and render initial HTML templates.
    *   `config.py`: Application configuration (database URI, secret key).

#### API Endpoints (Examples):

*   `POST /api/register`
*   `POST /api/login`
*   `GET /api/books` (User's library)
*   `POST /api/books`
*   `GET /api/books/<id>`
*   `PUT /api/books/<id>`
*   `DELETE /api/books/<id>`
*   `POST /api/reading_progress`
*   `GET /api/reviews`
*   `POST /api/reviews`
*   `GET /api/users/<id>/friends`
*   `POST /api/users/<id>/friends`

### 3. Frontend (HTML, CSS, JavaScript)

*   **Templating:** Jinja2 (used by Flask) for initial page loads.
*   **JavaScript Framework/Library:** Vanilla JS or a lightweight library like Alpine.js/HTMX for dynamic interactions, or potentially React/Vue for a richer SPA experience (decide later based on complexity). Starting with vanilla JS.
*   **Styling:** Pure CSS, potentially a CSS framework like Bootstrap or Tailwind CSS for rapid development.
*   **Structure:
    *   `templates/`: HTML Jinja2 templates (e.g., `index.html`, `login.html`, `dashboard.html`).
    *   `static/css/`: Stylesheets (e.g., `style.css`).
    *   `static/js/`: JavaScript files (e.g., `app.js`, `auth.js`, `books.js`).

### 4. Database (PostgreSQL)

*   **Database System:** PostgreSQL
*   **Schema Design (Conceptual):**

    *   **Users Table:**
        *   `id` (PK)
        *   `username` (UNIQUE)
        *   `email` (UNIQUE)
        *   `password_hash`
        *   `created_at`

    *   **Books Table:**
        *   `id` (PK)
        *   `title`
        *   `author`
        *   `genre`
        *   `isbn` (UNIQUE, optional)
        *   `publication_year`
        *   `cover_image_url` (optional)

    *   **ReadingProgress Table:**
        *   `id` (PK)
        *   `user_id` (FK to Users)
        *   `book_id` (FK to Books)
        *   `status` (ENUM: 'To Read', 'Reading', 'Completed')
        *   `current_page` (for 'Reading' status)
        *   `start_date`
        *   `completion_date` (for 'Completed' status)

    *   **Reviews Table:**
        *   `id` (PK)
        *   `user_id` (FK to Users)
        *   `book_id` (FK to Books)
        *   `rating` (1-5 stars)
        *   `review_text`
        *   `created_at`

    *   **Friendships Table:**
        *   `id` (PK)
        *   `user_id1` (FK to Users)
        *   `user_id2` (FK to Users)
        *   `status` (ENUM: 'pending', 'accepted', 'blocked') - if implementing request/accept
        *   `created_at`

### 5. Development Environment

*   **Python Version:** Python 3.9+
*   **Virtual Environment:** `venv`
*   **Dependency Management:** `pip` and `requirements.txt`
*   **Database Setup:** Local PostgreSQL instance or Docker container.

### 6. Installation & Setup

1.  **Clone the repository:**
    `git clone https://github.com/yourusername/book-reading-tracker.git`
    `cd book-reading-tracker`
2.  **Create and activate a virtual environment:**
    `python -m venv venv`
    `source venv/bin/activate` (Linux/macOS)
    `venv\Scripts\activate` (Windows)
3.  **Install dependencies:**
    `pip install -r requirements.txt`
4.  **Set up PostgreSQL database:**
    *   Create a database (e.g., `book_tracker_db`).
    *   Configure database connection string in `config.py` (or environment variable).
5.  **Initialize database:**
    `flask db upgrade` (if using Flask-Migrate)
    or
    `python -c 'from app import db; db.create_all()'`
6.  **Run the application:**
    `flask run`

### 7. Future Enhancements

*   **Search Functionality:** Integrate with a public API (e.g., Google Books API) for easier book discovery and auto-population of book details.
*   **Recommendations:** Implement a basic recommendation system based on user's reading history and friends' reviews.
*   **Notifications:** Real-time notifications for friend requests, new reviews, etc.
*   **User Profiles:** More detailed public profiles for users.
*   **Admin Panel:** A simple interface for managing users and content.
*   **Containerization:** Dockerize the application for easier deployment.
*   **Testing:** Implement unit and integration tests.
