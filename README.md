#BookNest - Book Recommendation System

A full-stack web application for managing and recommending books using MongoDB, Express.js, React, and Node.js (MERN stack).

##Features

-**User Authentication**

- Sign up and sign in functionality
- JWT-based authentication
- Protected routes

-**Book Management**

- View all books with pagination
- Search books by title, author, series, etc.
- Advanced filtering options (rating, genres, format, etc.)
- CRUD operations for books (Create, Read, Update, Delete)

-**Book Recommendations**

- Get personalized book recommendations based on similarity scores
- TF-IDF based text analysis for recommendations
- Caching system for improved performance

-**User Interface**

- Responsive design using Ant Design components
- Book cards with detailed information
- User profile management
- Modern and intuitive navigation

##Tech Stack

###Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Natural language processing for recommendations
- LRU cache implementation

###Frontend

- React with Vite
- Redux for state management
- Ant Design component library
- Axios for API requests
- React Router for navigation

##Project Structure

├── backend/ │ ├── models/ # Database models │ ├── routes/ # API routes │ ├── utils/ # Utility functions │ └── [server.js](vscode-file://vscode-app/c:/Users/baris/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) # Express server setup │ └── frontend/ ├── src/ │ ├── components/ # React components │ ├── redux/ # State management │ ├── middleware/ # API client │ └── [App.jsx](vscode-file://vscode-app/c:/Users/baris/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) # Main application

**## Getting Started**

**1. Clone the repository:**

**```bash**

**git clone **https://github.com/bariscanatakli/BookNest

2. Install dependencies:

**# Install backend dependencies**

**cd** **backend**

**npm** **install**

**# Install frontend dependencies**

**cd** **../frontend**

**npm** **install**

3. Create a `.env` file in the backend directory with:

**MONGO_URI=your_mongodb_connection_string**

**JWT_SECRET=your_jwt_secret**

4. Start the servers:

**# Start backend server (from backend directory)**

**npm** **run** **dev**

**# Start frontend development server (from frontend** directory)

**npm** **run** **dev**

## API Endpoints

* `POST /users/register` - Register new user
* `POST /users/login` - User login
* `GET /books` - Get all books
* `GET /books/search` - Search books
* `GET /books/recommendations/:bookId` - Get book recommendations
* `POST /books` - Create new book
* `PUT /books/:id` - Update book
* `DELETE /books/:id` - Delete book

## License

This project is licensed under the MIT License - see the [LICENSE](vscode-file://vscode-app/c:/Users/baris/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) file for details.

## Author

Barış Can Ataklı - Software Engineering Student at Mugla Sitki Kocman University

**This README provides a comprehensive overview of y**our BookNest project, including its features, tech**nology stack, setup instructions, and API endpoint**s. Feel free to customize it further based on any **additional information you'd like to include!**
