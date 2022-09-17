# Gomoku

GENERAL

  This is a Gomoku web application with both a client and server module. 

SETUP

  To setup this application, you must have npm installed. Then from both the Gomoku-React-App and
  Gomoku-Service directories, run npm install in-order to install the necessary dependencies for the application.

RUN

  [Gomoku-Service]
    In the command line from within the Gomoku-Service directoy, run the following command:
      npm run dev

  [Gomoku-React-App] 
    In the command line from within the Gomoku-React-App directoy, run the following command:
      npm start

  [Gomoku]
    To run the application, start the Gomoku-Service server application and then start the Gomoku-React-App application. 
    A Browser window will open the client application, but please ensure you keep the server application running whilst using 
    the client application. 
  
Info

  Note: This information is not necessary as you can simply create a user using the signup page or the provided Postman collection.
  Demo application user:
  user: Admin
  password: Admin

# Gomoku-React-App

GENERAL

  Gomoku is a 2 player board game, also known as "5 in a row" where players take turns
  in placing their stones on the board, in an attempt to obtain a chain of 5 consecutive stones.
  To win at Gomoku you must have exactly 5 stones in a row, otherwise the chain is ignored. If
  the board fills before a player is able to win, the game is deemed a draw. This gomoku game has
  been built as a react web app, using create-react-app and is written in Typescript.

RUN

  To run the Gomoku game, ensure you have npm installed and clone the Gomoku-React-App repository.
  Once you have cloned the repo, you can then run the app using npm start in the applications directory.

EXTRA FEATURES

  - The game makes use of error handling for the board selection size, where a pop-up message will display when
    a user attempts to navigate to the next page without selecting a size.

  - The game page will re-route the user back to the home page (or login if user is no longer logged in) if the
    game page is accessed directly via URL.

  - The ability to also logout the user and clear the current user context.

  - Application makes use of css modules.

CREDITS

  This game was written by Ashley Travaini to be used for Assignment 2 of COSC360 at UNE. 

# Gomoku-Service

GENERAL

  Gomoku-Service is a Nodejs backend server to support the Gomoku react app. In this implementaton, the game win logic
  and current player calculations have now been implemented on the Gomoku-Service. Aswell as calculating this logic, the service 
  is used to link in a MongoDB to to obtain persistant records allowing for continual game history for users of the react app.
  This server application is written in Nodejs using Typescript.

RUN

  To run the Gomoku Service, ensure you have npm installed and clone the Gomoku repository.
  Once you have cloned the repo, install the dependencies of the application using npm install and then
  you can then run the app using npm run dev in the Gomoku-Service directory.

CREDITS

  This server application was written by Ashley Travaini to be used for Assignment 3 of COSC360 at UNE. 