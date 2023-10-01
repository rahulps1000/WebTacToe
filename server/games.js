class Game {
  constructor() {
    this.admin = null;
    this.co_player = null;
    this.score = { admin: 0, co: 0 };
    this.names = { admin: null, co: null };
    this.player = 0;
    this.board = ["", "", "", "", "", "", "", "", ""];
  }

  checkWinner() {
    if (
      this.board[0] !== "" &&
      this.board[0] === this.board[1] &&
      this.board[1] === this.board[2]
    ) {
      return this.board[0];
    }
    if (
      this.board[3] !== "" &&
      this.board[3] === this.board[4] &&
      this.board[4] === this.board[5]
    ) {
      return this.board[3];
    }
    if (
      this.board[6] !== "" &&
      this.board[6] === this.board[7] &&
      this.board[7] === this.board[8]
    ) {
      return this.board[6];
    }
    if (
      this.board[0] !== "" &&
      this.board[0] === this.board[3] &&
      this.board[3] === this.board[6]
    ) {
      return this.board[0];
    }
    if (
      this.board[1] !== "" &&
      this.board[1] === this.board[4] &&
      this.board[4] === this.board[7]
    ) {
      return this.board[1];
    }
    if (
      this.board[2] !== "" &&
      this.board[2] === this.board[5] &&
      this.board[5] === this.board[8]
    ) {
      return this.board[2];
    }
    if (
      this.board[0] !== "" &&
      this.board[0] === this.board[4] &&
      this.board[4] === this.board[8]
    ) {
      return this.board[0];
    }
    if (
      this.board[2] !== "" &&
      this.board[2] === this.board[4] &&
      this.board[4] === this.board[6]
    ) {
      return this.board[2];
    }
    if (!this.board.includes("")) {
      return "draw";
    }
  }

  mark = (v) => {
    if (this.board[v] === "") {
      if (this.player % 2 === 0) {
        this.board[v] = "x";
      } else if (this.player % 2 === 1) {
        this.board[v] = "o";
      } else {
        return;
      }
      this.player++;
    }
  };
}

module.exports = { Game };
