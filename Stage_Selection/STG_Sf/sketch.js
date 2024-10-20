let Bg_Img;
let nodeImages = [];
let nodeHoverImages = [];
let nodeGraphics = [];
let currentHoveredNode = -1;
const stageCount = 7; // Change the number of stages
const stages = [];
let nodeRadius = 65;
let marginX;
let score = 400;

let returnButtonImage;
let returnButtonSize = 80;
let returnButtonX = 20;
let returnButtonY = 20;

let firstNodeSound;
let lockedNodeSound;
let homeButtonSound;
let lightGlitch;

let codeEntryCounter;
let CodeCheckc = true;
let correctCodeEntered = true;
let Comp = true;

let backgroundMusic;
let ProgressL = 999;

// Array to store links for each node
const nodeLinks = [
  '../../Stages/STG1/index.html',
  '../../Stages/STG2/index.html',
  '../../Stages/STG3/index.html',
  '../../Stages/STG4/index.html',
  '../../Stages/STG5/index.html',
  '../../Stages/STG6/index.html',
  '../../Stages/STG7/index.html'
];

let LocationS = parseInt(localStorage.getItem('PageL'), 10);
let StageSend = 99;
localStorage.setItem('Stage', StageSend);

let secretButton;
let secretButtonSize = nodeRadius * 2; // Set the size to match nodeRadius
let secretButtonX;
let secretButtonY;

let oneUse = false;

let input;
let isEnteringCode = false;

function preload() {
  //loadFont('Granesta.otf');
  
  loadImage('materials/images/Stg_Secret.png');
  loadImage('materials/images/Stg_Secret_Off.png');
  backgroundImage = loadImage('materials/images/Background14.jpg')
  
  firstNodeSound = loadSound('materials/sounds/notification.mp3');
  lockedNodeSound = loadSound('materials/sounds/chain.mp3');
  homeButtonSound = loadSound('materials/sounds/interface.mp3');
  lightGlitch = loadSound('materials/sounds/lightGlitch.wav');
  backgroundMusic = loadSound('materials/sounds/Mid-Page 1.2.mp3');
  youWin = loadSound('materials/sounds/success-fanfare-trumpets-6185.mp3');
  clickedRs = loadSound('materials/sounds/light-switch-156813.mp3');

  for (let i = 0; i < stageCount; i++) {
    const imagePath = `materials/images/Stg_${i + 1}I.png`;
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
    secretButton = createImg('materials/images/Stg_Secret.png', 'Secret Button');
    secretButton.size(secretButtonSize, secretButtonSize);

    console.log('Secret button loaded successfully');
  } catch (error) {
    console.error('Error loading secret button');
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

  backgroundMusic.loop();
  backgroundMusic.setVolume(0.7); 
  
  Complete1 = createImg("materials/images/Background14.jpg", "completeImg");
  Complete1.size(1400, 800);
  Complete1.position(0, 0);
  Complete1.mousePressed(hideComplition);
  //Complete1.hide();
  
  Complete2 = createImg("materials/images/Completion8.png", "completeImg");
  Complete2.size(450, 680);
  Complete2.position(475, 60);
  Complete2.mousePressed(hideComplition);
  //Complete2.hide();
  
  Restart = createImg("materials/images/RstBt.png", "resetButton");
  Restart.size(70, 70);
  Restart.position(25, 110);
  Restart.mousePressed(progressR);
  Restart.hide();
  
  Return = createImg("materials/images/Rt_Button.png", "resetButton");
  Return.size(80, 80);
  Return.position(20, 20);
  Return.mousePressed(returnF);
  //Return.mousePressed(hideComplition);
  Return.hide();

  // Initialize stages with adjusted random heights
  for (let i = 0; i < stageCount; i++) {
    let nodeGraphic = createGraphics(nodeRadius * 2, nodeRadius * 2);
    nodeGraphic.image(nodeImages[i], 0, 0, nodeRadius * 2, nodeRadius * 2);
    nodeGraphics.push(nodeGraphic);
    
    // Limit the y value to a certain range
    let minY = height * 0.6;
    let maxY = height * 0.95;
    let y = random(minY, maxY);

    stages.push({
      label: i + 1, // Display only the stage number
      link: nodeLinks[i], // Update the link for each stage
      y: y, // Use the limited y valueand 80% of canvas height
      x: marginX * (i + 1), // Distribute nodes evenly from left to right
      interactive: true // Set interactivity to true for all nodes
    });
  }
  
  for (let i = 0; i < stages.length; i++) { 
    toggleNodeInteractivity(i, false);
  }

  // Position the secret button
  secretButtonX = random(secretButtonSize, width - secretButtonSize);
  secretButtonY = random(secretButtonSize, height - secretButtonSize);

  // Create the input field
  input = createInput();
  input.size(80, 30);

  // Center the input field horizontally
  const inputX = (width - input.width) / 2;
  input.position(inputX, height - 40);

  // Center the text inside the input field
  input.style('text-align', 'center');

  input.hide(); // Hide the input initially

  
  noLoop();
  windowResized();
}

function hideComplition() {
  Complete1.hide();
  Complete2.hide();
  Restart.show();
  Return.show();
  secretButton.show();
  
  setTimeout(function () {
    Comp = false;
    for (let i = 0; i < stages.length; i++) {
      toggleNodeInteractivity(i, true);
    }
  }, 400);
}

function progressR() {
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
  // Draw the lines first
  for (let i = 0; i < stages.length - 1; i++) {
    const x = stages[i].x;
    const y = stages[i].y;

    const nextX = stages[i + 1].x;
    const nextY = stages[i + 1].y;

    if (i <= 5) {
      // Make the first line a different color
      stroke(255); // White color
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

  // Draw the images after the lines
  for (let i = 0; i < stages.length; i++) {
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
  }
}

function draw() {
  background(Bg_Img);
  
  youWin.setVolume(0.1);
  youWin.play();
  
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
  
  if (oneUse == false) {
    secretButton.hide();
    oneUse = true;
  }

  // Draw score text
  fill(0);
  textSize(textSizeValue);
  textStyle(BOLD);
  text(`Score: ${score}`, rect2X, rect2Y);

  // Draw the skill tree
  drawSkillTree();

  // Attempt to place the secret button without overlap
  placeSecretButton();

  // Check if the secret button is clicked
  const distanceToSecretButton = dist(mouseX, mouseY, secretButtonX + secretButtonSize / 2, secretButtonY + secretButtonSize / 2);

  if (isEnteringCode) {
    // Draw the "Code" label above the input window when the code window is open
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Code', input.x + input.width / 2, input.y - 50); 
  }

  if (distanceToSecretButton < secretButtonSize / 2) {
    // Show the input field
    input.show();
    isEnteringCode = true;
  } else {
    // Hide the input field and "Code" text if not clicking the secret button
    input.hide();
    isEnteringCode = false;
  }
}

function placeSecretButton() {
  let isOverlapping = true;

  while (isOverlapping) {
    isOverlapping = false;

    // Update the secret button size based on the node radius
    secretButtonSize = nodeRadius * 2.1;

    // Move the secret button to a new random position
    secretButtonX = random(secretButtonSize + 50, width - secretButtonSize - 50);
    secretButtonY = random(secretButtonSize + 50, height - secretButtonSize - 50);

    // Check for collisions with nodes
    for (let i = 0; i < stages.length; i++) {
      const x = stages[i].x;
      const y = stages[i].y;
      const distance = dist(secretButtonX, secretButtonY, x, y);

      // Ensure a larger minimum distance to avoid touching nodes
      if (distance < nodeRadius + secretButtonSize / 2 + 100) {
        isOverlapping = true;
        break; // Break out of the loop if overlap is found
      }
    }

    // Check for collisions with the return button
    const returnButtonDistance = dist(secretButtonX, secretButtonY, returnButtonX + returnButtonSize / 2, returnButtonY + returnButtonSize / 2);
    if (returnButtonDistance < returnButtonSize / 2 + secretButtonSize / 2 + 50) {
      isOverlapping = true;
    }

    // Check the distance from the secret button to each node and ensure it's not too close
    for (let i = 0; i < stages.length; i++) {
      const x = stages[i].x;
      const y = stages[i].y;
      const distanceToNode = dist(secretButtonX, secretButtonY, x, y);

      // Ensure a larger minimum distance to avoid touching nodes
      if (distanceToNode < nodeRadius + secretButtonSize / 2 + 100) {
        isOverlapping = true;
        break;
      }
    }
  }

  // Draw the secret button at the final position
  secretButton.size(secretButtonSize, secretButtonSize);
  secretButton.position(secretButtonX, secretButtonY);
}

function mouseClicked() {
  if (
    mouseX > returnButtonX &&
    mouseX < returnButtonX + returnButtonSize &&
    mouseY > returnButtonY &&
    mouseY < returnButtonY + returnButtonSize &&
    Comp == false
  ) {
    //...
  } else {
    if (CodeCheckc == false) {
      // Check if the secret button is clicked
      const distanceToSecretButton = dist(mouseX, mouseY, secretButtonX + secretButtonSize / 2, secretButtonY + secretButtonSize / 2);
      if (distanceToSecretButton < secretButtonSize / 2) {
        // Show the input field
        input.show();
        isEnteringCode = true;
        clickSecret.setVolume(0.1);
        clickSecret.play();
      } else {
        // Check if the click is outside the input field
        const isClickOutsideInput = mouseX < input.x || mouseX > input.x + input.width || mouseY < input.y || mouseY > input.y + input.height;

        // Hide the input field if not clicking the secret button and outside the input field
        if (isClickOutsideInput) {
          input.hide();
          isEnteringCode = false;
        }
      }
    } else {
      // Check if the secret button is clicked after the correct code is entered
      const distanceToSecretButton = dist(mouseX, mouseY, secretButtonX + secretButtonSize / 2, secretButtonY + secretButtonSize / 2);
      if (distanceToSecretButton < secretButtonSize / 2) {
        lightGlitch.play();

        setTimeout(function () {
          secretButton.elt.src = 'materials/images/Stg_Secret_Off.png';
        }, 50);
        setTimeout(function () {
          secretButton.elt.src = 'materials/images/Stg_Secret.png';
        }, 200);
        setTimeout(function () {
          secretButton.elt.src = 'materials/images/Stg_Secret_Off.png';
        }, 350);
        setTimeout(function () {
          secretButton.elt.src = 'materials/images/Stg_Secret.png';
        }, 500);
        setTimeout(function () {
          secretButton.elt.src = 'materials/images/Stg_Secret_Off.png';
        }, 700);
        setTimeout(function () {
          secretButton.elt.src = 'materials/images/Stg_Secret.png';
        }, 800);

        setTimeout(function () {
          window.location.href = "../../Game/index.html";
        }, 1100);
      }
    }

    // Check if any skill node is clicked
    for (let i = 0; i < stages.length; i++) {
      const x = stages[i].x;
      const y = stages[i].y;
      const distance = dist(mouseX, mouseY, x, y);

      if (distance < nodeRadius && stages[i].interactive) {
        console.log(`Clicked Node ${i + 1}: ${stages[i].link}`);

        if (i < 7) {
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

function keyPressed() {
  // Check if the Enter key is pressed
  if (isEnteringCode && keyCode === ENTER) {
    const event = arguments[0] || window.event;
    if (event) {
      event.preventDefault();
    }

    if (input.value() === '7259') {
      lighton.play();
      console.log('Code is correct!');
      correctCodeEntered = true;
      codeEntryCounter++;

      secretButton.elt.src = 'materials/images/Stg_Secret.png';
      CodeCheckc = true;
      
      if (codeEntryCounter === 1) {
        console.log('First time the correct code is entered!');
      } else {
        console.log(`Correct code entered ${codeEntryCounter} times!`);
      }
    } else {
      console.log('Code is incorrect!');
    }

    input.hide();
    isEnteringCode = false;
    input.value('');
  }
}

// Function to toggle interactivity of nodes
function toggleNodeInteractivity(nodeIndex, interactive) {
  if (nodeIndex >= 0 && nodeIndex < stages.length) {
    stages[nodeIndex].interactive = interactive;
  }
}

// Activate all nodes
for (let i = 0; i < stages.length; i++) {
  toggleNodeInteractivity(i, true);
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
  
  // Update the position of the input field
  const inputX = (width - input.width) / 2;
  input.position(inputX, height - 60);
  
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
    // Limit the y value to a certain range
    let minY = height * 0.6;
    let maxY = height * 0.95;
    let y;

    // Special case for the 4th stage
    if (i === 3) {
      minY = height * 0.45; // Adjust the minimum y-position to be a bit lower
      maxY = height * 0.65; // Adjust the maximum y-position to be a bit lower
    } else {
      minY = height * 0.2; // Use the original minimum y-position for other stages
      maxY = height * 0.8; // Use the original maximum y-position for other stages
    }

    y = constrain(stages[i].y, minY, maxY);
    stages[i].y = y;
  }

  // Update the size of the node graphics
  for (let i = 0; i < nodeGraphics.length; i++) {
    const nodeGraphic = createGraphics(nodeRadius * 2, nodeRadius * 2);
    nodeGraphic.image(nodeImages[i], 0, 0, nodeRadius * 2, nodeRadius * 2);
    nodeGraphics[i] = nodeGraphic;
  }
  
  // Resize the Background14 image
  Complete1.size(width, height);
  
  // Resize the Completion8 image
  const originalWidth = 450;
  const originalHeight = 680;
  const aspectRatio = originalWidth / originalHeight;
  const newWidth = Math.min(width, height) * 0.5;
  const newHeight = newWidth / aspectRatio;
  Complete2.size(newWidth, newHeight);
  Complete2.position(width / 2 - Complete2.width / 2, height * 0.07);
}
