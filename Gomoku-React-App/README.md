# Gomoku

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