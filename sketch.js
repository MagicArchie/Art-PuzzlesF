let backgroundImage;
let buttonWidth1, buttonHeight1;
let buttonWidth2, buttonHeight2;
let buttonX2;
let buttonY2;
let dialogOpen = false;
let dialog;
let infoButton;
let muteButton;
let isMuted = false;
let continueButtonSound;
let infoButtonSound;
let muteSound;

let backgroundMusic1;
let backgroundMusic2;
let currentMusic;

let LocationS = parseInt(localStorage.getItem('PageL'), 10);

function preload() {
  //loadFont('Granesta.otf');
  
  backgroundImage = loadImage('materials/images/Background10.jpg');
  //loadImage('materials/images/Info_Button.png');
  //loadImage('materials/images/volume_button.png');
  //loadImage('materials/images/volume_button V2.png');
  
  muteSound = loadSound('materials/sounds/Button S1.wav');
  infoButtonSound = loadSound('materials/sounds/start.mp3');
  continueButtonSound = loadSound('materials/sounds/interface5.mp3');
  backgroundMusic1 = loadSound('materials/sounds/Welcome-Page-F1.mp3');
  backgroundMusic2 = loadSound('materials/sounds/Welcome-Page-F2.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Adjust the canvas to the window size
  
  // Button sizes relative to the window size
  buttonWidth1 = width * 0.2;  // 20% of the window width
  buttonHeight1 = height * 0.1; // 10% of the window height
  buttonWidth2 = width * 0.05;  // 5% of the window width
  buttonHeight2 = height * 0.08; // 8% of the window height
  
  buttonX2 = width / 20 - buttonWidth2 / 2;
  buttonY2 = height * 0.15;

  infoButton = createImg('materials/images/Info_Button.png', 'info-button');
  infoButton.size(buttonWidth2 - 10, buttonHeight2 - 10);
  infoButton.position(buttonX2 + 10, buttonY2);
  infoButton.mousePressed(toggleDialog);

  muteButton = createImg('materials/images/volume_button.png', 'Mute Music');
  muteButton.size(buttonWidth2 + 10, buttonHeight2 + 10);
  muteButton.position(buttonX2, buttonY2 - 100);
  muteButton.mousePressed(toggleMute);

  backgroundMusic1.setVolume(0.5);
  backgroundMusic2.setVolume(0.5);

  // Start playing the first background music
  currentMusic = backgroundMusic1;
  currentMusic.play();
  
  continueButtonSound.setVolume(1.0);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);  // Adjust the background image to fit the canvas
  
  // Adjust for invalid LocationS values
  if (![111, 222, 333, 444, 555, 666, 777, 888, 999].includes(LocationS)) {
    LocationS = 1;
    localStorage.setItem('PageL', LocationS);
  } else {
    localStorage.setItem('PageL', LocationS);
  }

  textSize(width * 0.07);  // Scale text size to screen width (7%)
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(50);
  strokeWeight(3);
  text('Welcome!', width / 2, height * 0.4);  // 40% down from the top of the screen

  textSize(width * 0.02);  // Scale text for the instruction (2% of the screen width)
  fill(255);
  text('Press the button below to get started..', width / 2, height * 0.55);  // 55% down from the top

  let buttonX = width / 2 - buttonWidth1 / 2;
  let buttonY = height * 0.65;  // 65% down from the top
  
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth1 && mouseY > buttonY && mouseY < buttonY + buttonHeight1) {
    fill(90, 90, 90, 190);
  } else {
    fill(130, 130, 130, 190);
  }
  
  rect(buttonX, buttonY, buttonWidth1, buttonHeight1, 500);

  textSize(width * 0.02);  // Scale text size for the "Continue" button (2%)
  fill(mouseX > buttonX && mouseX < buttonX + buttonWidth1 && mouseY > buttonY && mouseY < buttonY + buttonHeight1 ? 200 : 255);
  stroke(1);
  strokeWeight(4);
  text('Continue', width / 2, buttonY + buttonHeight1 / 2);
  
  // Switch music when the current one ends
  if (!currentMusic.isPlaying()) {
    currentMusic = currentMusic == backgroundMusic1 ? backgroundMusic2 : backgroundMusic1;
    currentMusic.loop();
  }
}

function mousePressed() {
  let buttonX = width / 2 - buttonWidth1 / 2;
  let buttonY = height * 0.65;
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth1 && mouseY > buttonY && mouseY < buttonY + buttonHeight1) {
    console.log('Continue Button clicked!');
    continueButtonSound.setVolume(0.5);
    continueButtonSound.play();
    setTimeout(function () {
      goToMainPage();
    }, 1000);  // Reduced delay to 1 second for better user experience
  }
}

function goToMainPage() {
  const pages = {
    111: "Stage_Selection/STG_S1/index.html",
    222: "Stage_Selection/STG_S2/index.html",
    333: "Stage_Selection/STG_S3/index.html",
    444: "Stage_Selection/STG_S4/index.html",
    555: "Stage_Selection/STG_S5/index.html",
    666: "Stage_Selection/STG_S6/index.html",
    777: "Stage_Selection/STG_S7/index.html",
    888: "Stage_Selection/STG_Ss/index.html",
    999: "Stage_Selection/STG_Sf/index.html",
    default: "Stage_Selection/STG_S1/index.html",
  };

  window.location.href = pages[LocationS] || pages.default;
}

function toggleDialog() {
  playInfoButtonSound();
  dialogOpen ? closeDialog() : openDialog();
}

function openDialog() {
  dialog = createDiv('');
  dialog.position(width * 0.07, height * 0.2);  // 7% from the left, 20% from the top
  dialog.size(width * 0.3, height * 0.2);  // 30% width, 20% height
  dialog.style('background-color', '#FCFCFC');
  dialog.style('opacity', '0.8');
  dialog.style('padding', '10px');
  dialog.style('border', '2px solid #000000C4');
  dialog.style('border-radius', '15px');

  let dialogText = createP('This is some information in the dialog.');
  dialogText.style('color', '#000000');
  dialog.child(dialogText);

  dialogOpen = true;
}

function closeDialog() {
  if (dialog) {
    dialog.remove();
  }
  dialogOpen = false;
}

function toggleMute() {
  playMuteSound();
  isMuted ? currentMusic.setVolume(0.5) : currentMusic.setVolume(0.0);  // Toggle mute
  muteButton.attribute('src', isMuted ? 'materials/images/volume_button.png' : 'materials/images/volume_button V2.png');
  isMuted = !isMuted;
}

function playMuteSound() {
  muteSound.setVolume(0.3);
  muteSound.play();
}

function playInfoButtonSound() {
  infoButtonSound.setVolume(0.5);
  infoButtonSound.play();
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Recalculate button sizes and positions
  buttonWidth1 = width * 0.2;
  buttonHeight1 = height * 0.1;
  buttonWidth2 = width * 0.05;
  buttonHeight2 = height * 0.08;
  
  buttonX2 = width / 20 - buttonWidth2 / 2;
  buttonY2 = height * 0.15;

  infoButton.size(buttonWidth2 - 10, buttonHeight2 - 10);
  infoButton.position(buttonX2 + 10, buttonY2);

  muteButton.size(buttonWidth2 + 10, buttonHeight2 + 10);
  muteButton.position(buttonX2, buttonY2 - 100);
}
