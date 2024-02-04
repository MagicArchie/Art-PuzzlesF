let backgroundImage;
let buttonWidth1 = 200;
let buttonHeight1 = 80;
let buttonWidth2 = 70;
let buttonHeight2 = 70;
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
  createCanvas(1400, 800);
  buttonX2 = width / 20 - buttonWidth2 / 2;
  buttonY2 = 120;

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
  image(backgroundImage, 0, 0, width, height);
  
  if (LocationS != 111 || LocationS != 222 || LocationS != 333 || LocationS != 444 || LocationS != 555 || LocationS != 666 || LocationS != 777 || LocationS != 888 || LocationS != 999) {
    LocationS = 1
    localStorage.setItem('PageL', LocationS);
  } else {
    localStorage.setItem('PageL', LocationS);
  }

  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  //textFont('Granesta', 100);
  stroke(50);
  strokeWeight(3);
  text('Welcome!', width / 2, 375);

  textSize(30);
  textAlign(CENTER, CENTER);
  fill(255);
  text('Press the button below to get started..', width / 2, 450);

  let buttonX = width / 2 - buttonWidth1 / 2;
  let buttonY = 500;
  
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonWidth1 &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonHeight1
  ) {
  fill(90, 90, 90, 190);
  } else {
  fill(130, 130, 130, 190);
  }
  
  rect(buttonX, buttonY, buttonWidth1, buttonHeight1, 500);

  textSize(30);
    if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonWidth1 &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonHeight1
  ) {
  fill(200);
  } else {
  fill(255);
  }
  stroke(1);
  strokeWeight(4);
  text('Continue', width / 2, buttonY + buttonHeight1 / 2);
  
  // Check if the current music has ended
  if (!currentMusic.isPlaying()) {
    // Switch to the other music
    if (currentMusic == backgroundMusic1) {
      currentMusic = backgroundMusic2;
    } else {
      currentMusic = backgroundMusic1;
    }

    // Start playing the new music
    currentMusic.loop();
  }
}

function mousePressed() {
  let buttonX = width / 2 - buttonWidth1 / 2;
  let buttonY = 500;
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonWidth1 &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonHeight1
  ) {
    console.log('Continue Button clicked!');
    continueButtonSound.setVolume(0.5);
    continueButtonSound.play();
    setTimeout(function () {
      goToMainPage();
    }, 3000);
  }
}

function goToMainPage() {
  if (LocationS == 111) {
        window.location.href = "Stage_Selection/STG_S1/index.html";
      } else if (LocationS == 222) {
        window.location.href = "Stage_Selection/STG_S2/index.html";      
      } else if (LocationS == 333) {
        window.location.href = "Stage_Selection/STG_S3/index.html";       
      } else if (LocationS == 444) {
        window.location.href = "Stage_Selection/STG_S4/index.html";      
      } else if (LocationS == 555) {
        window.location.href = "Stage_Selection/STG_S5/index.html";    
      } else if (LocationS == 666) {
        window.location.href = "Stage_Selection/STG_S6/index.html";       
      } else if (LocationS == 777) {
        window.location.href = "Stage_Selection/STG_S7/index.html";     
      } else if (LocationS == 888) {
        window.location.href = "Stage_Selection/STG_Ss/index.html";   
      } else if (LocationS == 999) {
        window.location.href = "Stage_Selection/STG_Sf/index.html";
      } else {
        window.location.href = "Stage_Selection/STG_S1/index.html";
      }
}

function toggleDialog() {
  playInfoButtonSound();
  if (dialogOpen) {
    closeDialog();
  } else {
    openDialog();
  }
}

function openDialog() {
  dialog = createDiv('');
  dialog.position(100, 165);
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

function toggleMute() {
  playMuteSound();
  if (isMuted) {
    currentMusic.setVolume(0.5); // Unmute
    muteButton.html('Mute Music');
    muteButton.attribute('src', 'materials/images/volume_button.png');
  } else {
    currentMusic.setVolume(0.0); // Mute
    muteButton.html('Unmute Music');
    muteButton.attribute('src', 'materials/images/volume_button V2.png');
  }
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
