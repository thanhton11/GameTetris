const canvas = document.getElementById('tetris');
const nextCanvas = document.getElementById('nextPiece');
const hold = document.getElementById('holdPiece');
const tetris = new Tetris(canvas, nextPiece, hold);
const player = new Player(tetris);
document.addEventListener('keydown', event => {
  if(document.getElementById("start").style.display == 'none'){

  switch (event.keyCode) {
    case 80:
      if(!tetris.player.pauseGame){
        tetris.player.pause();
      } else{
        tetris.player.resume();
      }
      return;
    case 32:
      tetris.player.fall(true);
      return;
    case 40:
      tetris.player.fall();
      return;
    case 37:
      tetris.player.slide(-1);
      return;
    case 39:
      tetris.player.slide(1);
      return;
    case 88:
      tetris.player.spin(-1);
      return;
    case 38:
      tetris.player.spin(1);
      return;
    case 13:
        tetris.player.swap();
     
      return;
  }
}
});
