class Player {
  constructor(tetris) {
    this.pieces = 'ILJOSTZ';
    this.position = { x: null, y: null };
    this.nextPiece = this.randomP();
    this.currentPiece = this.randomP();
    this.score = 0;
    this.level = 1 ;
    this.tetris = tetris;
    this.board = tetris.board;
    this.hold = [];
    this.canSwap = true;
    this.dropCounter = 0;
    this.dropInterval = 1200;

    this.reset();
    this.updateScore();

  }


  createPiece(type) {

    switch (type) {
      case "I":
        return (
          [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
          ]
        );
      case "J":
        return (
          [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0],
          ]
        );
      case "L":
        return (
          [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
          ]
        );
      case "T":
        return (
          [
            [0, 4, 0],
            [4, 4, 4],
            [0, 0, 0]
          ]
        );
      case "S":
        return (
          [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0]
          ]
        );
      case "O":
        return (
          [
            [6, 6],
            [6, 6],
          ]
        );
      case "Z":
        return (
          [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
          ]
        );
    }
  }


  swap() {
    if (this.canSwap )
      if (this.hold.length === 0) {
        this.hold.push(this.currentPiece);
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.randomP();
        this.recenterPiece();
      } else if (this.hold.length === 1) {
        [this.currentPiece, this.nextPiece] =
          [this.hold.pop(), this.currentPiece];
        this.recenterPiece();
      }
    this.canSwap = false;

  }

  fall(instaDrop = false) {

    
    if (instaDrop) {
      while (!this.board.hit(this)) {
        this.position.y++;

      }
    } else {
      this.position.y++;
    }
    this.dropCounter = 0;


    if (this.board.hit(this)) {

      this.position.y--;

      this.board.update(this);
      this.reset();
      
      this.score += this.board.clearLines();
      this.updateScore();
      
    }
  
  }

  randomP() {
    return this.createPiece(this.pieces[this.pieces.length * Math.random() | 0]);
  }

  recenterPiece() {
    this.position.y = 0;
    this.position.x = (this.board.matrix[0].length / 2 | 0) - (this.currentPiece[0].length / 2 | 0);
  }

  reset() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.randomP();
    this.recenterPiece();
    this.canSwap = true;

    if (this.board.hit(this)) {
      this.board.clear();
      this.score = 0;
      
    }
  }

  rotatePiece(piece, dir) {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < y; x++) {
        [
          piece[x][y],
          piece[y][x]
        ] = [
            piece[y][x],
            piece[x][y]
          ];
      }
    }
    if (dir > 0) {
      piece.forEach(row => row.reverse());
    } else {
      piece.reverse();
    }
  }

  slide(dir) {
    this.position.x += dir;
    if (this.board.hit(this)) {
      this.position.x = this.position.x - dir;

    }
  }

  spin(dir) {
    const pos = this.position.x;
    let shift = 1;
    this.rotatePiece(this.currentPiece, dir);
    while (this.board.hit(this)) {
      this.position.x += shift;
      shift = -shift + shift > 0 ? 1 : -1;
      if (shift > this.currentPiece[0].length) {
        this.position.x = pos;
        this.rotatePiece(this.currentPiece, -dir);
        return;
      }
    }
  }
  
  update(time) {
    this.dropCounter += time;
    if( document.getElementById("start").style.display == 'none' ){
      if(!this.pauseGame == true){
      if (this.dropCounter > this.dropInterval ) {
        if(this.score > 3000){
        document.getElementById("time").style.display = 'block';
          this.board.countDown();
        }
        
          this.fall();
        }
      }
    }
  }
  pause(){
    document.getElementById("pause").style.display = 'block';
    this.pauseGame = true;
  }
  resume(){
    document.getElementById("pause").style.display = 'none';
    this.pauseGame =false;
  }
  updateScore() {

    if ( this.score <=1200) {
      this.dropInterval = 1000;
      this.level=1
    }
    else if (this.score <= 2000) {
      this.dropInterval = 500;
      this.level= 2;
    }
    else if(this.score <= 3600){
      this.dropInterval = 500;
      this.level =3

    } else{
      this.dropInterval = 500;
      this.level = 4
    }
    document.getElementById('score').innerText = "score: " + this.score;
    document.getElementById('level').innerText = "level: " + this.level;
  }
}
