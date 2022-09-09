var WIDTH = 640;
var HEIGHT = 400;


function preload() {
  bkgImg = loadImage('assets/pony.jpg');
  endImg = loadImage('assets/gameover.jpg');
  soundFormats('mp3', 'ogg');
  bleepSoundUp = loadSound('assets/up.ogg');
  bleepSoundDown = loadSound('assets/down.ogg');
  gameOverSound = loadSound('assets/gameover.ogg');
  hiScore = loadTable('assets/score.csv', 'csv', 'header');
}

function initTopLine() {
  fill(88, 81, 100); //limegreen
  rect(0, 0, WIDTH, 3);
}

function initBottomLine() {
  fill(88, 81, 100); //limegreen
  rect(0, HEIGHT - 3, WIDTH, 3);
}

function scoreTable() {
  clear();
  background(0);
  textSize(30);
  fill('white');
  textFont('Signika');
  // text('test', 40, 40);
  let posY = 40;
  let posX = 30;
  var scoreArray = {};

  for (let nameInCSV = 0; nameInCSV <= 4; nameInCSV++) {
    namePrint = hiScore.get(nameInCSV, 1);
    scorePrint = hiScore.get(nameInCSV, 2);

    // TODO
    // make a list, sort it and print it
    scoreArray[namePrint] = scorePrint;
    // print(scoreArray);
    // text(namePrint, posX, posY);
    // text(scorePrint, posX + 300, posY); 
    posY += 40;
  }
  
  print(scoreArray);
  text(String(scoreArray), posX, posY);
  // Array.scoreArray.sort();
  // text(scoreArray, 100, 200);

  noloop();
}


function setup() {
  fr = 60;
  frameRate(fr);
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
  colorMode(HSB);
  rx = 0;
  direction = 'right';
  incr = 10;
  finish = 'down';
  score = 0;
  speed = .2;
  clear();
  background(0);


  // initTopLine();
  initBottomLine();


  // print(hiScore.get(1, 1));
  // alert(hiScore.get(1, 1));
}

function draw() {
  image(bkgImg, 0, 3);
  fill(0, 100, 100);
  noStroke();
  
  // test directions
  if(direction == 'right') {
    rx += incr;
    if(rx >= WIDTH) {
      direction = 'left';
    } 
  } else {
    rx -= incr;
    if(rx < 0) {
      direction = 'right';
    }
  }

  // draw running square
  fill(0, 0, 100); //white
  rect(rx, ~~(HEIGHT / 2), 13, 13); //draw a square
  
  // draw mouse cursor
  cursor('assets/cursor.png', 4, 4);

  // tests:
  // text(mouseX, 10, 30);
  // text(mouseY, 10, 90);

  // collision
  if((mouseX == rx || (mouseX >= rx + 10 && mouseX <= rx + 20)) && (mouseY >= (~~(HEIGHT / 2) - 24) && mouseY <= (~~(HEIGHT / 2) + 34))) {
    gameOverSound.play();    
    alert("You Crashed! >:\nbad luck I'm crying for you\nThis is Game Over :c");
    // if touched show gameover pic & end
    // scoreTable();
    clear();
    image(endImg, 0, 0);
    noStroke();
    noloop();
  }

  // add score if up || down
  if((mouseY >= -34 && mouseY <= 30 && finish == 'up') && (mouseX > 27 && mouseX < WIDTH + 17)) {
    score++;
    incr += speed; //speed up
    fill(88, 81, 100); //limegreen
    rect(0, HEIGHT - 3, WIDTH, 3);
    fill(0,0,0); //black
    rect(0, 0, WIDTH, 3);
    finish = 'down';
    bleepSoundUp.play();
  } else if((mouseY <= HEIGHT + 77 && mouseY >= HEIGHT + 13 && finish == 'down') && (mouseX > 27 && mouseX < WIDTH + 17)) {
      score++;
      incr += speed; //speed up
      fill(88, 81, 100); //limegreen
      rect(0, 0, WIDTH, 3);
      fill(0,0,0); //black
      rect(0, HEIGHT - 3, WIDTH, 3);
      finish = 'up';
      bleepSoundDown.play();
     }

  // test for overriding playfield area
  if((mouseX >= WIDTH || mouseX <= 0) && (mouseY <= 240)) {
    if(finish == 'up') {
      finish = 'down';
    }
  } else if((mouseX >= WIDTH || mouseX <= 0) && (mouseY >= 240)) {
    if(finish == 'down') {
      finish = 'up';
    }
  }

  textSize(50);
  fill('white');
  textFont('Signika')
  text(score, 10, 50); 
}