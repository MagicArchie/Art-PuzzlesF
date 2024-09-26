let Bg_Img;
let nodeImages = [];
let nodeHoverImages = [];
let nodeGraphics = [];
let currentHoveredNode = -1;
const stageCount = 7; // Change the number of stages
const stages = [];
let  nodeRadius = 65;
let marginX;
let score = 0; 

let returnButtonImage;
let returnButtonSize = 80;
let returnButtonX = 20;
let returnButtonY = 20;

let firstNodeSound;
let lockedNodeSound;
let homeButtonSound; 

let backgroundMusic;
let ProgressL = 111;

// Array to store links for each node
const nodeLinks = [
  '../../Stages/STG1/index.html',
  'stage2.html',
  'stage3.html',
  'stage4.html',
  'stage5.html',
  'stage6.html',
  'stage7.html'
];

let LocationS = parseInt(localStorage.getItem('PageL'), 10);

function preload() {
  //loadFont('Granesta.otf');

  firstNodeSound = loadSound('materials/sounds/notification.mp3'); 
  lockedNodeSound = loadSound('materials/sounds/chain.mp3'); 
  homeButtonSound = loadSound('materials/sounds/interface.mp3'); 
  backgroundMusic = loadSound('materials/sounds/Mid-Page 1.2.mp3');
  clickedRs = loadSound('materials/sounds/light-switch-156813.mp3');

  for (let i = 0; i < stageCount; i++) {
    const imagePath = `materials/images/Stg_${i + 1}A.png`;
    try {
      nodeImages.push(loadImage(imagePath));
      nodeHoverImages.push(loadImage(imagePath));
      console.log(`Image loaded successfully: ${imagePath}`);
    } catch (error) {
      console.error(`Error loading image: ${imagePath}`);
      console.error(error);
    }
  }

  try {
    returnButtonImage = loadImage('materials/images/Rt_Button.png');
    console.log('Return button image loaded successfully');
  } catch (error) {
    console.error('Error loading return button image');
    console.error(error);
  }

  try {
    Bg_Img = loadImage('materials/images/Background_Md.jpg');
    console.log('Background image loaded successfully');
  } catch (error) {
    console.error('Error loading background image');
    console.error(error);
  }
}

function setup() {
  createCanvas(1400, 800);
  textSize(24);
  textAlign(CENTER, CENTER);
  marginX = width / (stageCount + 1);
  
  Restart = createImg("materials/images/RstBt.png", "resetButton");
  Restart.size(70, 70);
  Restart.position(20, 110);
  Restart.mousePressed(progressR);
  
  Return = createImg("materials/images/Rt_Button.png", "resetButton");
  Return.size(80, 80);
  Return.position(20, 20);
  Return.mousePressed(returnF);
  
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.7);

  // Initialize stages with adjusted random heights
for (let i = 0; i < stageCount; i++) {
  let nodeGraphic = createGraphics(nodeRadius * 2, nodeRadius * 2);
  nodeGraphic.image(nodeImages[i], 0, 0, nodeRadius * 2, nodeRadius * 2);
  nodeGraphics.push(nodeGraphic);

  // Limit the y value to a certain range (e.g. between 200 and 600)
  let minY = height * 0.6;
  let maxY = height * 0.95;
  let y = random(minY, maxY);

  stages.push({
    label: i + 1, // Display only the stage number
    link: nodeLinks[i], // Update the link for each stage
    y: y, // Use the limited y value
    x: marginX * (i + 1), // Distribute nodes evenly from left to right
    interactive: i === 0 // Set interactivity to true for the first node, false for others
  });
}

  noLoop();
  windowResized();
}

function progressR() {
  Restart.attribute('src', 'materials/images/RstBtB.png');
  clickedRs.setVolume(0.1);
  clickedRs.play();
  localStorage.clear();
  setTimeout(function () {
    window.location.href = "../../index.html";
  }, 400);
}

function returnF(){
  Return.attribute('src', 'materials/images/Rt_ButtonB.png');
  homeButtonSound.play();
  setTimeout(function () {
    window.location.href = "../../index.html";
  }, 500);
}

function drawSkillTree() {
  for (let i = 0; i < stages.length - 1; i++) {
    const x = stages[i].x;
    const y = stages[i].y;

    const isMouseOver = dist(mouseX, mouseY, x, y) < nodeRadius;

    // Change the appearance based on mouse hover and interactivity
    if (isMouseOver && stages[i].interactive) {
      currentHoveredNode = i;
      image(nodeGraphics[i], x - nodeRadius, y - nodeRadius);
    } else {
      currentHoveredNode = -1;
      image(nodeGraphics[i], x - nodeRadius, y - nodeRadius);
    }

    const nextX = stages[i + 1].x;
    const nextY = stages[i + 1].y;

    if (i === 0) {
      // Make the first line a different color
      stroke(255); // white color
    } else {
      stroke(0); // Black color for all other lines
    }

    const lineStartX = x + nodeRadius * cos(atan2(nextY - y, nextX - x));
    const lineStartY = y + nodeRadius * sin(atan2(nextY - y, nextX - x));
    const lineEndX = nextX - nodeRadius * cos(atan2(nextY - y, nextX - x));
    const lineEndY = nextY - nodeRadius * sin(atan2(nextY - y, nextX - x));

    strokeWeight(5);
    line(lineStartX, lineStartY, lineEndX, lineEndY);
    strokeWeight(1);
  }

  const lastNode = stages[stages.length - 1];
  const lastX = lastNode.x;
  const lastY = lastNode.y;
  image(nodeGraphics[stages.length - 1], lastX - nodeRadius, lastY - nodeRadius);
}

function draw() {
  background(Bg_Img);
  
  // Calculate the positions of the rectangles based on the new screen size
  let rect1X = 60;
  let rect1Y = -65; // 5% from the top
  let rect1Width = width *0.05;
  let rect1Height = height * 0.28; // 25% of the height
  
  let rect2X = width / 2;
  let rect2Y = height * 0.07; // 10% from the top
  let rect2Width = width * 0.2; // 30% of the width
  let rect2Height = height * 0.07; // 10% of the height
  
  // Calculate the text size as a percentage of the rectangle's height
  let textSizeValue = rect2Height * 0.5; // 50% of the height
  
  // Calculate the size and position of the buttons based on the window size
  let buttonSize = Math.min(width, height) / 12;
  rect1Width = buttonSize + 20;
  Restart.size(buttonSize /1.2, buttonSize / 1.2);
  Restart.position(75, 45 + buttonSize);

  Return.size(buttonSize, buttonSize);
  Return.position(70, 20);
  
  // Draw the rectangles
  fill(290, 120);
  strokeWeight(3);
  rect(rect1X, rect1Y, rect1Width, rect1Height, 130);
  
  fill(255, 150);
  strokeWeight(3);
  rectMode(CENTER);
  rect(rect2X, rect2Y, rect2Width, rect2Height, 130);
  
  //textFont('Granesta', 100);
  if (ProgressL > LocationS) {
    LocationS = ProgressL;
    localStorage.setItem('PageL', LocationS); 
  }

  // Draw score text
  fill(0);
  textSize(textSizeValue);
  textStyle(BOLD);
  text(`Score: ${score}`, rect2X, rect2Y);

  // Draw the skill tree
  drawSkillTree();
}

function mouseClicked() {
  if (
    mouseX > returnButtonX &&
    mouseX < returnButtonX + returnButtonSize &&
    mouseY > returnButtonY &&
    mouseY < returnButtonY + returnButtonSize
  ) {
    //...
  } else {
    for (let i = 0; i < stages.length; i++) {
      const x = stages[i].x;
      const y = stages[i].y;
      const distance = dist(mouseX, mouseY, x, y);

      if (distance < nodeRadius && !stages[i].interactive) {
        lockedNodeSound.setVolume(0.3);
        lockedNodeSound.play();
        console.log(`Clicked Locked Node ${i + 1}`);
        break; // Exit the loop after playing the sound
      }

      if (distance < nodeRadius && stages[i].interactive) {
        console.log(`Clicked Node ${i + 1}: ${stages[i].link}`);
        if (i === 0) {
          firstNodeSound.setVolume(0.1);
          firstNodeSound.play();
        }
        setTimeout(function () {
        window.location.href = stages[i].link;
        }, 1100);
      }
    }
  }
}

// Function to toggle interactivity of nodes
function toggleNodeInteractivity(nodeIndex, interactive) {
  if (nodeIndex >= 0 && nodeIndex < stages.length) {
    stages[nodeIndex].interactive = interactive;
  }
}

// Example: To turn off interactivity for all nodes except the first one
for (let i = 1; i < stages.length; i++) {
  toggleNodeInteractivity(i, false);
}

function keyPressed() {
  // Check for the "`" key
  if (key === '`') {
    console.log("Backtick key pressed!");

    // Ask the user for a code
    const userCode = prompt("Enter a code:");

    // Check the entered code and redirect the user
    if (userCode === "+Stg-1") {
      console.log("Code +Stg-1 entered. Redirecting to StageSelection 1");
      window.location.href = "../STG_S1/index.html";
    } else if (userCode === "+Stg-2") {
      console.log("Code +Stg-2 entered. Redirecting to StageSelection 2");
      window.location.href = "../STG_S2/index.html";
    } else if (userCode === "+Stg-3") {
      console.log("Code +Stg-3 entered. Redirecting to StageSelection 3");
      window.location.href = "../STG_S3/index.html";
    } else if (userCode === "+Stg-4") {
      console.log("Code +Stg-4 entered. Redirecting to StageSelection 4");
      window.location.href = "../STG_S4/index.html";
    } else if (userCode === "+Stg-5") {
      console.log("Code +Stg-5 entered. Redirecting to StageSelection 5");
      window.location.href = "../STG_S5/index.html";
    } else if (userCode === "+Stg-6") {
      console.log("Code +Stg-6 entered. Redirecting to StageSelection 6");
      window.location.href = "../STG_S6/index.html";
    } else if (userCode === "+Stg-7") {
      console.log("Code +Stg-7 entered. Redirecting to StageSelection 7");
      window.location.href = "../STG_S7/index.html";
    } else if (userCode === "+Stg-S") {
      console.log("Code +Stg-S entered. Redirecting to StageSelection S");
      window.location.href = "../STG_Ss/index.html";
    } else if (userCode === "+Stg-F") {
      console.log("Code +Stg-F entered. Redirecting to StageSelection F");
      window.location.href = "../STG_Sf/index.html";
    } else {
      console.log("Invalid code. No redirection.");
    }
  }
}

function windowResized() {
  
  // Update the size and position of the buttons based on the new window size
  let buttonSize = Math.min(width, height) / 20;
  Restart.size(buttonSize, buttonSize);
  Restart.position(25, 25 + buttonSize);

  Return.size(buttonSize, buttonSize);
  Return.position(20, 20);
  
  resizeCanvas(windowWidth, windowHeight);
  marginX = width / (stageCount + 1);

  // Update the node radius based on the new window size
  nodeRadius = Math.min(width, height) / (stageCount + 1) * 0.5;

  // Update the positions of the skill tree
  for (let i = 0; i < stages.length; i++) {
    stages[i].x = marginX * (i + 1);
    // Limit the y value to a certain range (e.g. between 200 and 600)
    let minY = 200;
    let maxY = height - 200; // Leave some space at the bottom
    stages[i].y = constrain(stages[i].y, minY, maxY);
  }

  // Update the size of the node graphics
  for (let i = 0; i < nodeGraphics.length; i++) {
    const nodeGraphic = createGraphics(nodeRadius * 2, nodeRadius * 2);
    nodeGraphic.image(nodeImages[i], 0, 0, nodeRadius * 2, nodeRadius * 2);
    nodeGraphics[i] = nodeGraphic;
  }
}
