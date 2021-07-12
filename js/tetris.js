class Tetris {

  constructor(canvas, nextPiece, hold) {

    this.canvas = canvas;
    this.colors = [
      null,
      "red",
      "green",
      "yellow",
      "purple",
      "blue",
      "grey",
      "orange",
    ];

    this.hold = hold;

    this.holdCtx = hold.getContext('2d');
    this.holdCtx.scale(14, 14);

    this.nextPiece = nextPiece;
    this.nextCtx = nextPiece.getContext('2d');
    this.nextCtx.scale(14, 14);

    this.ctx = canvas.getContext('2d');
    this.ctx.scale(20, 20);

    this.board = new Board(12, 20);
    this.player = new Player(this);


    let lastTime = 0;



    const update = (time = 0) => {

      let timeElapsed = time - lastTime;
      lastTime = time;

      this.player.update(timeElapsed);

      this.view();
      requestAnimationFrame(update);
      document.getElementById("play-button").addEventListener('click', event => {
        this.startGame();
        this.board.timeCountDown = 51;
      });
      

      if (this.board.over) {

        document.addEventListener('click', event => {
          this.reset();
        });
      }
    };

    update();
  }
  startGame() {
    document.getElementById("start").style.display = 'none';
  }
  blackFill(ctx, paintArea) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, paintArea.width, paintArea.height);
  }

  view() {
    this.blackFill(this.ctx, this.canvas);
    this.viewShape(this.player.currentPiece, this.player.position, this.ctx);
    this.viewShape(this.board.matrix, { x: 0, y: 0 }, this.ctx);
    this.viewHold();
    this.viewNextPiece();


  }

  viewHold() {
    this.blackFill(this.holdCtx, this.hold);
    this.viewShape(this.player.hold[0], { x: 2, y: 2 }, this.holdCtx);
  }

  viewNextPiece() {
    if (this.player.level != 3) {
      this.blackFill(this.nextCtx, this.nextPiece);
      this.viewShape(this.player.nextPiece, { x: 2, y: 2 }, this.nextCtx);
    } else {
      this.viewShape(this.player.nextPiece, { x: 2, y: 2 }, this.nextCtx);
      this.blackFill(this.nextCtx, this.nextPiece);
    }
  }


  viewShape(piece, location, area) {
    if (piece) {
      piece.forEach((row, yIndex) => {
        row.forEach((value, xIndex) => {
          if (value !== 0) {
            area.shadowBlur = 20;
            area.shadowColor = "black";
            area.fillStyle = this.colors[value];
            area.fillRect(xIndex + location.x,
              yIndex + location.y, 1, 1);
          }
        });
      });
    }
  }

  reset() {
    if (this.board.over) {
      
      this.board.clear();
      this.player.score = 0;
      this.player.level = 1;
      this.board.over = false;
      let gOver = document.getElementById("game-over");
      gOver.style.display = 'none';
    }
  }

}
