// Multiple players so use a factory function to create them (Can add more onto this later i.e. keeping a score will live here)
const playerFactory = (name, mark) => {
  return { name, mark };
};

// Singular gameboard so create this via a module -> can include things like add marker onto it

const gameBoard = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  return { boardArray };
})();

// Display contr - All Ui is generated here

const displayContr = (() => {
  const renderBoard = boardArray => {
    let html = ``;
    boardArray.forEach((box, index) => {
      html += `<div class="box">
                  <div data-box-position="${index}">
                    ${box}
                  </div>
                </div>`;
    });
    document.querySelector(".board-container").innerHTML = html;
  };

  const markBoard = (e, symbol) => {
    e.target.textContent = symbol;
  };

  const popup = document.querySelector(".winner-overlay");

  const resetGame = () => {
    const rstBtn = document.querySelector(".reset");
    rstBtn.addEventListener("click", () => {
      popup.classList.add("hide");
      document.querySelector(".board-container").innerHTML = "";
    });
  };

  const winnerPopup = message => {
    popup.querySelector("h2").textContent = message;
    popup.classList.remove("hide");
    resetGame();
  };

  return {
    renderBoard,
    markBoard,
    winnerPopup
  };
})();

// Controls the flow of the game
const gameFlow = (() => {
  let playerOneTurn = true;

  const getPlayers = () => {
    const playerOne = playerFactory(
      document.getElementById("user1").value,
      "X"
    );
    const playerTwo = playerFactory(
      document.getElementById("user2").value,
      "O"
    );

    return { playerOne, playerTwo };
  };

  const startGame = () => {
    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      displayContr.renderBoard(gameBoard.boardArray);
      updateArr(getPlayers().playerOne.name, getPlayers().playerTwo.name);
    });
  };

  const toggleTurn = () => {
    playerOneTurn = !playerOneTurn;
  };

  const updateArr = (playerOne, playerTwo) => {
    document.querySelectorAll(".box").forEach((box, index) => {
      box.addEventListener("click", e => {
        if (gameBoard.boardArray[index].length < 1) {
          if (playerOneTurn == true) {
            gameBoard.boardArray[index] = "X";
            displayContr.markBoard(e, "X");
            checkWinner(playerOne, playerTwo);
            toggleTurn();
          } else {
            gameBoard.boardArray[index] = "O";
            displayContr.markBoard(e, "O");
            checkWinner(playerOne, playerTwo);
            toggleTurn();
          }
        }
      });
    });
  };

  const endGame = message => {
    //launch the modal
    displayContr.winnerPopup(message);
    // empty the array
    gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
    // reset the game
  };

  // Can refactor this by displaying each combo as an object then seeing if it is equal to a slice of the gameboard
  const checkWinner = (playerOne, playerTwo) => {
    if (
      (gameBoard.boardArray[0] == "X" &&
        gameBoard.boardArray[1] == "X" &&
        gameBoard.boardArray[2] == "X") ||
      (gameBoard.boardArray[3] == "X" &&
        gameBoard.boardArray[4] == "X" &&
        gameBoard.boardArray[5] == "X") ||
      (gameBoard.boardArray[6] == "X" &&
        gameBoard.boardArray[7] == "X" &&
        gameBoard.boardArray[8] == "X") ||
      (gameBoard.boardArray[0] == "X" &&
        gameBoard.boardArray[4] == "X" &&
        gameBoard.boardArray[8] == "X") ||
      (gameBoard.boardArray[2] == "X" &&
        gameBoard.boardArray[4] == "X" &&
        gameBoard.boardArray[6] == "X") ||
      (gameBoard.boardArray[0] == "X" &&
        gameBoard.boardArray[3] == "X" &&
        gameBoard.boardArray[6] == "X") ||
      (gameBoard.boardArray[1] == "X" &&
        gameBoard.boardArray[4] == "X" &&
        gameBoard.boardArray[7] == "X") ||
      (gameBoard.boardArray[2] == "X" &&
        gameBoard.boardArray[5] == "X" &&
        gameBoard.boardArray[8] == "X")
    ) {
      endGame(`Congratulations ${playerOne} won!`);
    } else if (
      (gameBoard.boardArray[0] == "O" &&
        gameBoard.boardArray[1] == "O" &&
        gameBoard.boardArray[2] == "O") ||
      (gameBoard.boardArray[3] == "O" &&
        gameBoard.boardArray[4] == "O" &&
        gameBoard.boardArray[5] == "O") ||
      (gameBoard.boardArray[6] == "O" &&
        gameBoard.boardArray[7] == "O" &&
        gameBoard.boardArray[8] == "O") ||
      (gameBoard.boardArray[0] == "O" &&
        gameBoard.boardArray[4] == "O" &&
        gameBoard.boardArray[8] == "O") ||
      (gameBoard.boardArray[2] == "O" &&
        gameBoard.boardArray[4] == "O" &&
        gameBoard.boardArray[6] == "O") ||
      (gameBoard.boardArray[0] == "O" &&
        gameBoard.boardArray[3] == "O" &&
        gameBoard.boardArray[6] == "O") ||
      (gameBoard.boardArray[1] == "O" &&
        gameBoard.boardArray[4] == "O" &&
        gameBoard.boardArray[7] == "O") ||
      (gameBoard.boardArray[2] == "O" &&
        gameBoard.boardArray[5] == "O" &&
        gameBoard.boardArray[8] == "O")
    ) {
      endGame(`Congratulations ${playerOne} won!`);
    } else if (gameBoard.boardArray.every(item => item.length >= 1)) {
      endGame("It's a draw :(");
      // Thius needs updating
    }
  };

  return {
    startGame
  };
})();

gameFlow.startGame();
