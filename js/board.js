class Board {
  constructor(w, h) {

    let matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    this.matrix = matrix;
    this.over = false;
    this.intervalId = null;
    this.timeCountDown = 51;
    }

  clear() {
    this.matrix.forEach(row => row.fill(0));
    this.gameOver();
  }


  clearLines() {
    let rowsCleared = 1;
    let score = 0;
    outer: for (let y = this.matrix.length - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      let currentRow = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(currentRow);
      ++y;
      if( document.getElementById("time").style.display == 'block'){
        this.timeCountDown += 10;

      }
      
      score += rowsCleared * 50;
      rowsCleared *= 2;
    }
    return score;
  }

  gameOver() {
    document.getElementById("game-over").style.display = 'block';
    let elScore = document.getElementById("final-score");
    let currentScore = document.getElementById('score').innerHTML;
    elScore.textContent = "Your " + currentScore;
    this.over = true;
    document.getElementById("time").style.display = 'none';
  

  }
 

  hit(player) {
    const [pieceShape, piecePos] = [player.currentPiece, player.position];
    for (let y = 0; y < pieceShape.length; ++y) {
      for (let x = 0; x < pieceShape[y].length; ++x) {
        if (pieceShape[y][x] !== 0 &&
          (this.matrix[y + piecePos.y] &&
            this.matrix[y + piecePos.y][x + piecePos.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  update(player) {
    player.currentPiece.forEach((row, yIndex) => {
      row.forEach((value, xIndex) => {
        if (value !== 0) {
          this.matrix[yIndex + player.position.y]
          [xIndex + player.position.x] = value;
        }
      });
    });
  }
  countDown(timeCountDown) {
    this.timeCountDown--;
    if (this.timeCountDown != 0) {
      document.getElementById("time").innerHTML = this.timeCountDown;
      setTimeout("countDown()", 1000);
    } else {
      this.gameOver();
    }


  }

}
