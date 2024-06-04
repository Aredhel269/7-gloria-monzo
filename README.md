# sprint7

    Frontend (React App):
        The app.jsx file defines the React application structure and components.
        The index.js file renders the App component in the browser DOM.
        This part handles the user interface and interacts with the backend through API calls.

    Backend (Node.js server with Socket.IO):
        The server.ts file defines the Fastify server and Socket.IO integration.
        It handles user registration, login, and basic data access through routes defined in userRoutes.ts.
        The Socket.IO functionality allows real-time communication for chat features.

    docker-compose.yml:
        This file defines how to run both the frontend and backend services in Docker containers.
        It configures a separate container for the database (db) using MySQL.
        The app container builds your project code and defines the environment variable DATABASE_URL to connect to the database.

Starting the Project

    Make sure you have Docker installed and running.
    Navigate to your project directory in the terminal.
    Run docker-compose up -d to build and start both the frontend and backend containers in detached mode.
    By default, the frontend will be accessible on http://localhost:3000. You can access the chat or other functionalities provided by your application there.