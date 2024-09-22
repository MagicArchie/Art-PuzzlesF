let backgroundImage;
let buttonWidth1, buttonHeight1;  // Rectangular continue button
let buttonDiameterInfo, buttonDiameterMute;  // Info and mute button diameters
let buttonX2, buttonY2;
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
  backgroundImage = loadImage('materials/images/Background10.jpg');
  
  muteSound = loadSound('materials/sounds/Button S1.wav');
  infoButtonSound = loadSound('materials/sounds/start.mp3');
  continueButtonSound = loadSound('materials/sounds/interface5.mp3');
  backgroundMusic1 = loadSound('materials/sounds/Welcome-Page-F1.mp3');
  backgroundMusic2 = loadSound('materials/sounds/Welcome-Page-F2.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  buttonWidth1 = width * 0.15;
  buttonHeight1 = height * 0.1;

  buttonDiameterInfo = min(width, height) * 0.07;
  buttonDiameterMute = min(width, height) * 0.1;
  
  buttonX2 = width * 0.05;  // Info button positioned 5% from the left
  buttonY2 = height * 0.75; // Info button positioned 75% from the top

  infoButton = createImg('materials/images/Info_Button.png', 'info-button');
  infoButton.size(buttonDiameterInfo, buttonDiameterInfo);
  infoButton.position(buttonX2, buttonY2);

  muteButton = createImg('materials/images/volume_button.png', 'Mute Music');
  muteButton.size(buttonDiameterMute, buttonDiameterMute);
  
  // Adjust mute button placement to ensure visibility
  muteButton.position(buttonX2, buttonY2 + buttonDiameterInfo + 60);  // Keep it below the info button with adequate spacing
  muteButton.mousePressed(toggleMute);

  backgroundMusic1.setVolume(0.5);
  backgroundMusic2.setVolume(0.5);

  currentMusic = backgroundMusic1;
  currentMusic.play();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  
  if (![111, 222, 333, 444, 555, 666, 777, 888, 999].includes(LocationS)) {
    LocationS = 1;
    localStorage.setItem('PageL', LocationS);
  } else {
    localStorage.setItem('PageL', LocationS);
  }

  textSize(width * 0.07);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(50);
  strokeWeight(3);
  text('Welcome!', width / 2, height * 0.4);

  textSize(width * 0.02);
  fill(255);
  text('Press the button below to get started..', width / 2, height * 0.55);

  let buttonX = width / 2 - buttonWidth1 / 2;
  let buttonY = height * 0.65;
  
  // Draw rectangular continue button with more rounded corners
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth1 && mouseY > buttonY && mouseY < buttonY + buttonHeight1) {
    fill(90, 90, 90, 190);
  } else {
    fill(130, 130, 130, 190);
  }
  
  rect(buttonX, buttonY, buttonWidth1, buttonHeight1, 50);  // Increased corner radius to 50

  textSize(width * 0.02);
  fill(mouseX > buttonX && mouseX < buttonX + buttonWidth1 && mouseY > buttonY && mouseY < buttonY + buttonHeight1 ? 200 : 255);
  stroke(1);
  strokeWeight(4);
  text('Continue', width / 2, buttonY + buttonHeight1 / 2);
  
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

  buttonWidth1 = width * 0.15;
  buttonHeight1 = height * 0.1;

  buttonDiameterInfo = min(width, height) * 0.07;
  buttonDiameterMute = min(width, height) * 0.1;
  
  buttonX2 = width * 0.05;  // Keep consistent positioning
  buttonY2 = height * 0.75; // Keep consistent positioning

  infoButton.size(buttonDiameterInfo, buttonDiameterInfo);
  infoButton.position(buttonX2, buttonY2);

  muteButton.size(buttonDiameterMute, buttonDiameterMute);
  
  // Ensure mute button remains visible
  muteButton.position(buttonX2, buttonY2 + buttonDiameterInfo + 60);  // Position below info button
}
