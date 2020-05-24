# Note-Taker-React
A webapp for taking notes, made with ReactJS

------Starting the app------

In a non-production environment, you will need to spin up the React server (configured on localhost:3000) and the Express server (configured on localhost:5000):
1. Navigate to the working directory (Note-Taker-React) and use command 'node server.js' to spin up the Express server - this will give your app access to the database and the backend.
2. Navigate to the client folder (Note-Taker-React/client) and use command 'npm start' to spin up the React app.

The React app will use the Express server to interact with the database using a RESTful API.

------Future functionilty------

The next pieces of functionality to be developed (not necessarily in this order) would be:
1. Create user log-in functionality, including:
  1.1 User can log in using a username and password
  1.2 User can create a new username and password
  1.3 User can only view their saved note's if they are logged in
  1.4 Any CRUD operations to notes are only saved if a user is logged in (note: user can still make modifications locally, they just won't save to the backend)
2. Muliple note pages
  2.1 User can create a new 'page' to store notes on
  2.2 User can access all their 'pages'
  2.3 User can delete a 'page'

------Collaboration------

Feel free to make modifications and send a PR!
