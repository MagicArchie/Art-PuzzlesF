let backgroundImage;
let buttonWidth, buttonHeight;
let buttonDiameterInfo, buttonDiameterMute;
let buttonX2, buttonY2, buttonX0, buttonY0, buttonX01, buttonY01;
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

let locationS = parseInt(localStorage.getItem('PageL'), 10);

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
  
  buttonWidth = width * 0.15;
  buttonHeight = height * 0.08;

  buttonDiameterInfo = min(width, height) * 0.07;
  buttonDiameterMute = min(width, height) * 0.1;
  
  buttonX2 = width * 0.05;  // Positioned 5% from the left
  buttonY2 = height * 0.05; // Positioned 5% from the top

  muteButton = createImg('materials/images/volume_button.png', 'Mute Music');
  muteButton.size(buttonDiameterMute, buttonDiameterMute);
  muteButton.position(buttonX2, buttonY2);
  muteButton.mousePressed(toggleMute);

  infoButton = createImg('materials/images/Info_Button.png', 'info-button');
  infoButton.size(buttonDiameterInfo, buttonDiameterInfo);
  
  // Place info button below the mute button with adequate spacing
  infoButton.position(buttonX2, buttonY2 + buttonDiameterMute + 20);  
  infoButton.mousePressed(toggleDialog);

  backgroundMusic1.setVolume(0.5);
  backgroundMusic2.setVolume(0.5);

  currentMusic = backgroundMusic1;
  currentMusic.play();
  
  windowResized();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  
  if (![111, 222, 333, 444, 555, 666, 777, 888, 999].includes(locationS)) {
    locationS = 1;
    localStorage.setItem('PageL', locationS);
  } else {
    localStorage.setItem('PageL', locationS);
  }

  textSize(width * 0.07);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(50);
  strokeWeight(3);
  text('Welcome!', width / 2, height * 0.4);

  textSize(width * 0.02);
  fill(255);
  text('Press the button below to get started..', width / 2, height * 0.50);

  let buttonX = width / 2 - buttonWidth / 2;
  let buttonY = height * 0.65;
  
  // Draw rectangular continue button with more rounded corners
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    fill(90, 90, 90, 190);
  } else {
    fill(130, 130, 130, 190);
  }
  
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 50);  // Increased corner radius to 50

  textSize(width * 0.02);
  fill(mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight ? 200 : 255);
  stroke(1);
  strokeWeight(4);
  text('Continue', width / 2, buttonY + buttonHeight / 2);
  
  if (!currentMusic.isPlaying()) {
    currentMusic = currentMusic == backgroundMusic1 ? backgroundMusic2 : backgroundMusic1;
    currentMusic.loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  buttonWidth = width * 0.15;
  buttonHeight = height * 0.1;

  buttonDiameterInfo = min(width, height) * 0.07;
  buttonDiameterMute = min(width, height) * 0.1;
  
  buttonX2 = width * 0.04;  // Keep consistent positioning buttonY2 = height * 0.04; // Keep consistent positioning
  buttonX0 = buttonX2 * 0.75;
  buttonY0 = buttonY2 * 0.65;

  muteButton.size(buttonDiameterMute, buttonDiameterMute);
  muteButton.position(buttonX2, buttonY2);

  infoButton.size(buttonDiameterInfo, buttonDiameterInfo);
  
  // Ensure info button is positioned below the mute button and centered
  infoButton.position(buttonX2 - (buttonDiameterInfo - buttonDiameterMute) / 2, buttonY2 + buttonDiameterMute + 20);  
}

function mousePressed() {
  let buttonX = width / 2 - buttonWidth / 2;
  let buttonY = height * 0.65;
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
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

  window.location.href = pages[locationS] || pages.default;
}

// Dialog functions
function toggleDialog() {
  playInfoButtonSound();
  if (dialogOpen) {
    closeDialog();
    infoButton.attribute('src', 'materials/images/Info_Button.png');
  } else {
    openDialog();
    infoButton.attribute('src', 'materials/images/Info_Button B.png');
  }
}

function openDialog() {
  buttonX01 = buttonX2 + buttonDiameterInfo;
  buttonY01 = buttonY2 * 4.8;
  
  dialog = createDiv('');
  dialog.position(buttonX01, buttonY01);
  dialog.size(300, 100);
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

// Sound functions
function playMuteSound() {
  muteSound.setVolume(0.3);
  muteSound.play();
}

function playInfoButtonSound() {
  infoButtonSound.setVolume(0.5);
  infoButtonSound.play();
}

function toggleMute() {
  playMuteSound();
  if (isMuted) {
    currentMusic.setVolume(0.5); // Unmute
    backgroundMusic1.setVolume(0.5); // Unmute
    backgroundMusic2.setVolume(0.5); // Unmute
    muteButton.html('Mute Music');
    muteButton.attribute('src', 'materials/images/volume_button.png');
  } else {
    currentMusic.setVolume(0.0); // Mute
    backgroundMusic1.setVolume(0.0); // Mute
    backgroundMusic2.setVolume(0.0); // Mute
    muteButton.html('Unmute Music');
    muteButton.attribute('src', 'materials/images/volume_button V2.png');
  }
  isMuted = !isMuted;
}
