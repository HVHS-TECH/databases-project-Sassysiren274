/*******************************************************/
// setup()
/*******************************************************/
/* variables */
let player;
let floors = [];
let lastFloorX = 0;
let vel = 3
let coins = [];
let score = 0;
let gameOver = false;
let bottomWalls = [];
let topWalls = [];
let bg;
/* Loads the background image */
function preload() {
  bg = loadImage('Game-background2.png');
}
//
function setup() {
  console.log("setup");
  new Canvas(1284, 642);
  world.gravity.y = 10;
  //
  player = new Sprite(60, 0, 30, 30);
  player.color = '#ffffff';
  //
  camera.on();
  //
  for (let i = 0; i < 10; i++) {
    let coin = new Sprite(random(100, 400), random(0, 150), 10, 10);
    coin.color = '#ffd700';
    coin.type = 'coin';
    coins.push(coin);
  }
  //
  wallLH = new Sprite(-10, height / 2, 20, height, 'static');
  wallLH.color = 'black';

  // creating starting floor
  generateFloor();
}
//******************************************************
//draw()
// *****************************************************/
function draw() {
  camera.off();                  // Turn off camera for other elements
  image(bg, 0, 0, width, height); // Draw the background
  camera.on();                   // Turn camera back on for moving objects

  // movement
  if (kb.pressing('left')) {
    player.vel.x = -3;
  }
  else if (kb.pressing('right')) {
    player.vel.x = 3;
  }
  else {
    player.vel.x = 0;
  }

  if (kb.pressing('up')) {
    player.vel.y = -3;
  }

  if (kb.pressing('down')) {
    player.vel.y = 3;
  }
  // camera following player
  camera.x = player.x;

  // coins
  if (random() > 0.97) {
    let coin = new Sprite(player.x + random(200, 400), random(50, 200), 10, 10);
    coin.color = 'yellow';
    coin.type = 'coin';
    coins.push(coin);
  }

  if (player.x > lastFloorX - 300) {
    generateFloor();
  }
  // player overlapping the coins making coins disapear, increasing score
  for (let i = coins.length - 1; i >= 0; i--) {
    if (player.overlaps(coins[i])) {
      coins[i].remove();
      coins.splice(i, 1);
      score += 10;
    }
  }
  console.log(coins.length)
 
  // Draw score box (green button style)
push();

// Position (KEEP SAME POSITION — just adjust if needed)
let x = camera.x - width/2 + 20;
let y = 20;

// Button style
fill(0, 200, 0); // green color
stroke(0, 150, 0); // darker green border
strokeWeight(2);
rect(x, y, 180, 50, 15); // rounded corners

// Text style
fill(255); // white text
noStroke();
textSize(20);
textAlign(CENTER, CENTER);

// Draw score text
text("Score: " + score, x + 90, y + 25);

pop();

  // Save score when game ends, even after changing pages.
if (gameOver) {
  localStorage.setItem("score", score);
}
  // gameover if player hits this specific position
  if (player.y > height + 10) {
    gameOver = true;
  }
  // game over!!!
  if (gameOver) {
    player.vel.x = 0;
    player.vel.y = 0;

    textAlign(CENTER, CENTER);
    textSize(60);
    fill('red');
    text("GAME OVER", camera.x, height / 2 - 40);

    fill(255);
    textSize(24);
    text("Press R to Restart", camera.x, height / 2 + 20);

    if (kb.presses('r')) {
      location.reload();
    }

    return;
  }
  // player colliding with the bottom walland game being over
  for (let wall of bottomWalls) {
    if (player.overlaps(wall)) {
      gameOver = true;
    }
  }
  // player collision with top wall, gameover too
  if (player.y < 0) {
    gameOver = true;
  }
}
// generate infinity floor and top and bottom walls
function generateFloor() {

  for (let i = 0; i < 5; i++) {
    console.log("Wheeeee!")

    //Floor
    let floor = new Sprite(lastFloorX + 250, 200, 500, 40, 'static');
    floor.color = '#3ea010';
    floors.push(floor);

    //Bottomwall
    let bottomWall = new Sprite(lastFloorX + 250, height + 20, 500, 40, 'static');
    bottomWall.color = '#2c7a0b';
    //bottomWall.type = 'danger';
    bottomWalls.push(bottomWall);

    // TOP WALL (infinite too)
    let topWall = new Sprite(lastFloorX + 250, -50, 500, 40, 'static');
    topWall.color = 'black';
    topWall.type = 'danger';
    topWalls.push(topWall);
5
  }
  lastFloorX += 500 + random(300, 450);
}