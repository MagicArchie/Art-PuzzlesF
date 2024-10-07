let backgroundImage;
let frame;
let title;
let descriptionButton;
let nightModeButton;
let zoomButton;
let unzoomButton;
let returnToFirstButton;
let goToLastButton;
let homeButton;
let Audio_Button;
let arrowLeft;
let arrowRight;
let keyButton;
let keyimg;

let margin = 80;

let descriptionRect;

let descriptionButtonSize = 80;
let descriptionFontSize = 30; 

let nightMode = false;
let score = 0;
let isAudioPlaying = false;
let lastClickTime = 0;
const doubleClickDelay = 250; // milliseconds
let staf = true;

const canvasWidth = 1400;
const canvasHeight = 800;

const nightModeButtonSize = 80;
const buttonSize = 80;
const homeButtonSize = 65;
const arrowButtonSize = 80;
const artistButtonSize = 40;

let nightModeButtonX,
  nightModeButtonY,
  zoomButtonX,
  zoomButtonY,
  unzoomButtonX,
  unzoomButtonY,
  returnToFirstButtonX,
  returnToFirstButtonY,
  goToLastButtonX,
  goToLastButtonY,
  homeButtonX,
  homeButtonY,
  Audio_ButtonX,
  Audio_ButtonY,
  descriptionButtonX,
  descriptionButtonY,
  arrowRightX,
  arrowRightY,
  arrowLeftX,
  arrowLeftY,
  keyButtonX,
  keyButtonY,
  artistBt;

let keySound;
let pageFlip;
let bigPageFlip;
let textAppear;
let infoBleep;
let zoom;
let light;
let backToHome;
let comingSoon;
let backgroundSound;
let clickG; 
let choice;
let transition;

let images = [];
let locked = [];
let visibility = [];

let imgDescriptions = [
  "Λάδι σε μουσαμά, 75 x 125 εκ. <br> Δωρεά Kathleen Βακαλό <br><br> Αρ. Έργου: Π.10404", 
  "Λάδι σε μουσαμά, 54,5 x 95 εκ. <br> Δωρεά Kathleen Bακαλό <br><br> Αρ. Έργου: Π.10402", 
  "Λάδι σε μουσαμά, 85 x 100 εκ. <br> Δωρεά Kathleen Βακαλό <br><br> Αρ. Έργου: Π.10403", 
  "Λάδι σε μουσαμά, 76,3 x 100 εκ. <br> Από τη σειρά των φεγγαριών, π. 1979 <br><br> Αρ. Έργου: Π.6045", 
  "Λάδι σε μουσαμά, 50 x 64,5 εκ. <br> Δωρεά Ελένης Βακαλό <br><br> Αρ. Έργου: Π.8975", 
  "Λάδι σε μουσαμά, 31,5 x 45,5 εκ. <br> Δωρεά Ελένης Βακαλό <br><br> Αρ. Έργου: Π.8974"
                      ];

let titles = ["Χωρίς τίτλο",
              "Χωρίς τίτλο",
              "Χωρίς τίτλο",
              "Από τη σειρά των φεγγαριών",
              "Δέντρα",
              "Τοπίο με φεγγάρι"
             ];

let descriptionSpans = [];
let counter = 0;
let level;

let keyButtonImages = [];
let currentKeyButtonIndex = 0; // Index to keep track of the current key button image

let scrollSpeed = 0.1;
let descriptionTextY; 
let targetDescriptionTextY;

let keyButtonPressedFlags = Array(imgDescriptions.length).fill(false);

let titleWidth;
let oneUse = false;
let oneUse2 = false;
let oneUse3 = false;
let oneUse4 = false;
let showMessage = false;
let rectVisible = true;

let StageSend = 22;
localStorage.setItem('Stage', StageSend);
let Unlock = parseInt(localStorage.getItem('Complete2'), 10);
let LocationS = parseInt(localStorage.getItem('PageL'), 10);

let titleWidth1;

function preload() {
  backgroundImage = loadImage("materials/images/Background11.jpg");
  backgroundImage2 = loadImage("materials/notifications/Background1-1.jpg");
  frame = loadImage("materials/images/frame (2).png");
  //loadFont("Granesta.otf");

  for (let i = 1; i <= 6; i++) {
    images.push(loadImage("materials/levels/Lvl_B" + i + ".2.jpg"));
    imgDescriptions.push("Description " + i);
    
    locked.push(loadImage("materials/lstages/Stg_Lkd_" + i + ".jpg"));
    visibility.push(true);
    
    loadImage('materials/keys/Key_D' + i + '.3.png');
    loadImage('materials/keys/Key_G' + i + '.png');
  }
    
    loadImage("materials/buttons/Day_Mode.png");
    loadImage("materials/buttons/Night_Mode.png");
    
    keySound = loadSound("materials/sounds/achive-sound.mp3");
    pageFlip = loadSound("materials/sounds/pageturn.mp3");
    bigPageFlip = loadSound("materials/sounds/BpageFlip.mp3");
    textAppear = loadSound("materials/sounds/appear-1.mp3");
    infoBleep = loadSound("materials/sounds/infobleep.mp3");
    zoom = loadSound("materials/sounds/zoom.mp3");
    backToHome = loadSound("materials/sounds/interface.mp3");
    comingSoon = loadSound("materials/sounds/comingSoon.mp3");
    backgroundSound = loadSound("materials/sounds/Main-Page.mp3");
    lvlUp = loadSound("materials/sounds/level-passed.mp3");
    clickG = loadSound("materials/sounds/mouse-click.mp3");
    choice = loadSound("materials/sounds/tap-notification.mp3");
    transition = loadSound("materials/sounds/transition.wav");
    light = loadSound("materials/sounds/light-switch-81967.mp3");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  descriptionTextY = height * 0.95;
  targetDescriptionTextY = height * 0.95;

  nightModeButtonX = canvasWidth - nightModeButtonSize - 53;
  nightModeButtonY = 15;
  zoomButtonX = nightModeButtonX + 10;
  zoomButtonY = nightModeButtonY + nightModeButtonSize + 30;
  unzoomButtonX = zoomButtonX;
  unzoomButtonY = zoomButtonY + buttonSize;

  Audio_ButtonX = 85;
  Audio_ButtonY = canvasHeight - 62;
  homeButtonX = 12;
  homeButtonY = canvasHeight - 75;
  descriptionButtonX = (canvasWidth - descriptionButtonSize) / 2;
  descriptionButtonY = 700;

  arrowRightX = descriptionButtonX + descriptionButtonSize + 10;
  arrowRightY = descriptionButtonY + descriptionButtonSize / 2 - arrowButtonSize / 2;
  arrowLeftX = descriptionButtonX - arrowButtonSize - 10;
  arrowLeftY = descriptionButtonY + descriptionButtonSize / 2 - arrowButtonSize / 2;

  returnToFirstButtonX = arrowLeftX - margin;
  returnToFirstButtonY = descriptionButtonY + descriptionButtonSize / 2 - arrowButtonSize / 2;
  goToLastButtonX = arrowRightX + margin;
  goToLastButtonY = descriptionButtonY + descriptionButtonSize / 2 - arrowButtonSize / 2;

  keyButtonX = 15;
  keyButtonY = 180;
  
  titleWidth1 = [];

  for (let i = 0; i < titles.length; i++) {
    titleWidth1.push(textWidth(titles[i]));
  }

  console.log(titleWidth1);

  //textFont("Granesta", 100);
  title = createSpan("");
  title.position((canvasWidth - titleWidth) / 2, 20);
  title.style("font-size", "32px");
  title.style("color", "#FFFFFF");
  
  level = createSpan("");
  level.position(30, height * 0.02);
  level.style("font-size", "32px");
  level.style("color", "#D1D1D1");

  Audio_Button = createImg("materials/buttons/Audio_Button.png", "Audio_Button");
  Audio_Button.size(50, 50);
  Audio_Button.position(Audio_ButtonX, Audio_ButtonY);
  Audio_Button.mousePressed(Audio_ButtonPressed);

  nightModeButton = createImg("materials/buttons/Night_Mode.png", "night-mode-button");
  nightModeButton.size(85, 85);
  nightModeButton.position(nightModeButtonX, nightModeButtonY);
  nightModeButton.mousePressed(toggleNightMode);

  zoomButton = createImg("materials/buttons/zoom_Button1.png", "zoom-button");
  zoomButton.size(buttonSize - 15, buttonSize - 15);
  zoomButton.position(zoomButtonX, zoomButtonY);
  zoomButton.mousePressed(zoomButtonPressed);

  unzoomButton = createImg("materials/buttons/Zoom_Button2.png", "unzoom-button");
  unzoomButton.size(buttonSize - 15, buttonSize - 15);
  unzoomButton.position(unzoomButtonX, unzoomButtonY);
  unzoomButton.mousePressed(unzoomButtonPressed);

  returnToFirstButton = createImg("materials/buttons/Arrow_4.png", "return-to-first");
  returnToFirstButton.size(buttonSize + 0, buttonSize + 0);
  returnToFirstButton.position(returnToFirstButtonX, returnToFirstButtonY);
  returnToFirstButton.mousePressed(returnToFirstButtonPressed);

  goToLastButton = createImg("materials/buttons/Arrow_3.png", "go-to-last");
  goToLastButton.size(buttonSize + 0, buttonSize + 0);
  goToLastButton.position(goToLastButtonX, goToLastButtonY);
  goToLastButton.mousePressed(goToLastButtonPressed);

  homeButton = createImg("materials/buttons/Home_Button.png", "home-button");
  homeButton.size(homeButtonSize, homeButtonSize);
  homeButton.position(homeButtonX, homeButtonY);
  homeButton.mousePressed(goToHomePage);

  descriptionButton = createImg("materials/buttons/DS_Button.png", "description-button");
  descriptionButton.size(descriptionButtonSize, descriptionButtonSize);
  descriptionButton.position(descriptionButtonX, descriptionButtonY);
  descriptionButton.mousePressed(descriptionButtonPressed);

  arrowRight = createImg("materials/buttons/Arrow_1.png", "arrow-right");
  arrowRight.size(arrowButtonSize, arrowButtonSize);
  arrowRight.position(arrowRightX, arrowRightY);
  arrowRight.mousePressed(pressedRight);

  arrowLeft = createImg("materials/buttons/Arrow_2.png", "arrow-left");
  arrowLeft.size(arrowButtonSize, arrowButtonSize);
  arrowLeft.position(arrowLeftX, arrowLeftY);
  arrowLeft.mousePressed(pressedLeft);
  
  artistBt = createImg("materials/buttons/information.png", "artistInfo");
  artistBt.size(artistButtonSize, artistButtonSize);
  artistBt.position((canvasWidth - artistButtonSize) / 2 + 470, 610);
  artistBt.mousePressed(artistInfo);
  
  keyimg = createImg("materials/keys/Key_D1.2.png", "key-img");
  keyimg.size(120, 250); // Set the size as needed
  keyimg.position(keyButtonX, keyButtonY);
  keyimg.mousePressed(keyButtonPressed);
  keyimg.style('pointer-events', 'none');
  
  notification = createImg("materials/notifications/KeysClaimed.png", "note");
  notification.size(300, 100);
  notification.position(1090, 690);
  
  Complete = createImg("materials/notifications/Completion2.png", "completeImg");
  Complete.size(450, 680);
  Complete.position(475, 60);
  Complete.mousePressed(hideComplition);
  Complete.hide();

  for (let i = 0; i < images.length; i++) {
    let span = createSpan("");
    span.position((canvasWidth - 1000) / 2 + 10, 480); // Adjust the position as needed
    span.style("font-size", descriptionFontSize + "px");
    span.style("color", "black"); // Set the text color to black
    span.style("display", i === counter ? "block" : "none"); // Set the display property
    span.style("width", 990 + "px" );
    descriptionSpans.push(span);
  }

  updateImageAndDescription();
  updateTitle();
  
  backgroundSound.loop();
  windowResized();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  
  if (Unlock == 125) {
    if (oneUse4 == false) {
      keyimg.style('pointer-events', 'auto');
      notification.show();
      oneUse4 = true;
    }
    setTimeout(() => {
      notification.hide();
    }, 5000);
  } else {
    notification.hide();
  }

  stroke(0);
  strokeWeight(3);
  fill(200, 50);
  
  let rectWidth1 = width * 0.45;
  let rectX1 = (width - rectWidth1) / 2;
  
  fill(200, 60);
  rect(rectX1, height * 0.85, rectWidth1, height * 0.1, 300);

  fill(25);
  rect((width - 850 * windowWidth / 1400) / 2 + 1, height * 0.14, 850 * windowWidth / 1400, 300 * windowHeight / 800); //000

  let rectWidth2 = width * 0.7;
  let rectX2 = (width - rectWidth2) / 2;
  
  fill(200, 200);
  rect(rectX2, height * 0.6, rectWidth2, height * 0.2, 20);

  fill(255, 120);
  rect(width * 0.89, -30, width * 0.05, height * 0.32, 30); // Update the width and height of the rectangle to match the canvas size
  
  fill(210);
  rect(width * 0.88, -30, width * 0.07, height * 0.14, 15); // Update the width and height of the rectangle to match the canvas size


  fill(235, 131, 52, 30);
  rect(-1, -1, width * 0.1, height + 1);
  
  if (rectVisible) {
    fill(255, 130);
    rect(descriptionButtonX + 5, descriptionButtonY + 5, descriptionButtonSize * windowWidth / 2000, descriptionButtonSize * windowWidth / 2000, 100);
  }

  if (score === 30) {
    if (!oneUse2) {
      lvlUp.setVolume(0.1);
      lvlUp.play();
      oneUse2 = true;
    }
    fill(255, 130);
    rect(homeButtonX, homeButtonY, homeButtonSize * windowWidth / 1600, homeButtonSize * windowWidth / 1600, 100);
    fill(255, 249, 74, 50);
  }else{
    fill(255, 50);
  }
  rect(width * 0.022, height * 0.09, width * 0.055, width * 0.055, 30);

  // Check if the image is visible, then draw the appropriate image
 if (visibility[counter]) {
    image(locked[counter], (width - 850 * windowWidth / 1400) / 2 + 1, height * 0.14, 850 * windowWidth / 1400, 300 * windowHeight / 800);
    keyimg.attribute('src', 'materials/keys/Key_D' + (counter + 1) + '.3.png'); // Update key image source dynamically
  } else {
    image(images[counter], (canvasWidth - 850) / 2 + 1, 110, 850, 300);
    keyimg.attribute('src', 'materials/keys/Key_G' + (counter + 1) + '.png'); // Update key image source dynamically
  }

  image(frame, width * 0.14, height * 0.075, width * 0.71, height * 0.5);
  if (score === 30) {
    fill(250, 205, 2, 190); // Green with alpha
  }else{
    fill(0);
  }
  textSize(28);
  textAlign(CENTER, CENTER);
  strokeWeight(1);
  text("Points", width * 0.05, height * 0.12);

  textSize(36);
  text(score, width * 0.05, height * 0.15); 

  fill(255);

  title.html(titles[counter]);
  if (oneUse == false){
    title.position((width - titleWidth1[counter]) / 2, height * 0.02);
    oneUse = true;
  }
  level.html("Level " + (counter + 1));
  level.position(width * 0.022, height * 0.02);
  
  // Move the description text towards the target position
  descriptionTextY += (targetDescriptionTextY - descriptionTextY) * 0.1;

  // Draw the description text at the updated position
  for (let i = 0; i < descriptionSpans.length; i++) {
    descriptionSpans[i].position((width - 1000) * 0.30, descriptionTextY);
  }
  
  if (score == 30) {
    if (staf == true) {
      image(backgroundImage2, 0, 0, width, height);
      fill(0, 0, 0, 150);
      noStroke();
      rect(0, 0, canvasWidth, canvasHeight); 
    }
    if (!oneUse3) {
        Completed();
      oneUse3 = true;
    }
  }
  
  if (showMessage) {
    displayMessageAndButtons();
  }
}

function updateImageAndDescription() {
  title.html(titles[counter]);

  // Clear the previous description span
  for (let i = 0; i < descriptionSpans.length; i++) {
    descriptionSpans[i].style("display", i === counter ? "block" : "none");
    descriptionSpans[i].html("");
  }

  descriptionSpans[counter].html(imgDescriptions[counter]); // Update the corresponding description span
}

function updateTitle() {
  title.html(titles[counter]);
  titleWidth = textWidth(titles[counter]);
  
  title.position((width - titleWidth1[counter]) / 2, height * 0.02);
}

function updateImageAndDescription() {
  title.html(titles[counter]);

  // Clear the previous description span
  for (let i = 0; i < descriptionSpans.length; i++) {
    descriptionSpans[i].style("display", i === counter ? "block" : "none");
    descriptionSpans[i].html("");
  }

  descriptionSpans[counter].html(imgDescriptions[counter]); // Update the corresponding description span
   updateTitle();
}

function descriptionButtonPressed() {
  // Toggle visibility of the description span
  textAppear.setVolume(0.1);
  textAppear.play();
  let currentDescriptionSpan = descriptionSpans[counter];
  currentDescriptionSpan.style(
    "display",
    currentDescriptionSpan.style("display") === "none" ? "block" : "none"
  );
  
  // Toggle the visibility of the rectangle
  rectVisible = !rectVisible;

  console.log("Description button pressed!");
}

function Audio_ButtonPressed() {
  const currentTime = millis();

  // Check if it's a double click
  if (currentTime - lastClickTime < doubleClickDelay) {
    // If double-clicked, restart the audio
    comingSoon.setVolume(0.4);
    comingSoon.stop();
    comingSoon.play();

    // Set the audio state to playing
    isAudioPlaying = true;

    console.log("Audio button double-clicked!");
  } else {
    // If not a double-click, toggle play/pause
    if (isAudioPlaying) {
      // If audio is playing, pause it
      comingSoon.pause();
    } else {
      // If not playing, play the audio
      comingSoon.setVolume(0.4);
      comingSoon.play();
    }

    // Toggle the audio state
    isAudioPlaying = !isAudioPlaying;

    console.log("Audio button pressed!");
  }

  // Update the last click time
  lastClickTime = currentTime;
}

function zoomButtonPressed() {
  // Implement this function if needed
  zoom.setVolume(0.3);
  zoom.play();
  console.log("Zoom button pressed!");

  // Increase the font size of the description span
  if (descriptionFontSize < 35) {
    descriptionFontSize += 5;
  }

  // Update the font size of all description spans
  for (let i = 0; i < descriptionSpans.length; i++) {
    descriptionSpans[i].style("font-size", descriptionFontSize + "px");
  }
}

function unzoomButtonPressed() {
  // Implement this function if needed
  zoom.setVolume(0.3);
  zoom.play();
  console.log("Unzoom button pressed!");

  // Decrease the font size of the description span
  if (descriptionFontSize > 25) {
    descriptionFontSize -= 5;
  }

  // Update the font size of all description spans
  for (let i = 0; i < descriptionSpans.length; i++) {
    descriptionSpans[i].style("font-size", descriptionFontSize + "px");
  }
}

function returnToFirstButtonPressed() {
  bigPageFlip.setVolume(0.2);
  bigPageFlip.play();
  counter = 0;
  updateImageAndDescription();
  console.log("Return to first button pressed!");
}

function goToLastButtonPressed() {
  bigPageFlip.setVolume(0.2);
  bigPageFlip.play();
  counter = images.length - 1;
  updateImageAndDescription();
  console.log("Go to last button pressed!");
}

function goToHomePage() {
  backToHome.play();
  setTimeout(function () {
    if (score == 30){
      console.log("Go to home page (Complete)!");  
      window.location.href = "../../Stage_Selection/STG_S3/index.html";
    }else{
      console.log("Go to home page (Not Complete)!");
      if (LocationS == 111) {
        window.location.href = "../../Stage_Selection/STG_S1/index.html";
      } else if (LocationS == 222) {
        window.location.href = "../../Stage_Selection/STG_S2/index.html";   
      } else if (LocationS == 333) {
        window.location.href = "../../Stage_Selection/STG_S3/index.html";  
      } else if (LocationS == 444) {
        window.location.href = "../../Stage_Selection/STG_S4/index.html";     
      } else if (LocationS == 555) {
        window.location.href = "../../Stage_Selection/STG_S5/index.html"; 
      } else if (LocationS == 666) {
        window.location.href = "../../Stage_Selection/STG_S6/index.html";    
      } else if (LocationS == 777) {
        window.location.href = "../../Stage_Selection/STG_S7/index.html";    
      } else if (LocationS == 888) {
        window.location.href = "../../Stage_Selection/STG_Ss/index.html";   
      } else if (LocationS == 999) {
        window.location.href = "../../Stage_Selection/STG_Sf/index.html";
      }
    }
  }, 100);
}

function pressedRight() {
  pageFlip.play();
  counter++;
  if (counter >= images.length) {
    counter = 0;
  }
  
  updateImageAndDescription();
}

function pressedLeft() {
  pageFlip.play();
  counter--;
  if (counter < 0) {
    counter = images.length - 1; 
  }

  keyButtonPressedFlag = false;

  updateImageAndDescription();
}

function toggleNightMode() {
  nightMode = !nightMode;
  light.setVolume(0.1);
  light.play();

  if (nightMode) {
    for (let i = 0; i < descriptionSpans.length; i++) {
      descriptionSpans[i].style("color", "#FFFFFF"); // Set text color to white
    }

    nightModeButton.attribute("src", "materials/buttons/Day_Mode.png");
  } else {
    for (let i = 0; i < descriptionSpans.length; i++) {
      descriptionSpans[i].style("color", "black"); // Set text color to black
    }
    nightModeButton.attribute("src", "materials/buttons/Night_Mode.png");
  }
}

function keyButtonPressed() {
  // Check if the key button is not pressed to avoid repeated changes
  if (!keyButtonPressedFlags[counter]) {
    // Check if the counter is within valid bounds
    if (counter >= 0 && counter < visibility.length) {
      // Toggle the visibility of the current image
      visibility[counter] = !visibility[counter];

      // Update the display based on the visibility status
      if (visibility[counter]) {
        // Display the unlocked image
        image(images[counter], (canvasWidth - 850) / 2 + 1, 110, 850, 300);
      } else {
        // Display the locked image
        keySound.setVolume(0.3);
        keySound.play();
        image(locked[counter], (canvasWidth - 850) / 2 + 1, 110, 850, 300);
        score += 5; // Update the score
      }

    } else {
      console.log("Invalid image index");
    }

    // Set the keyButtonPressedFlag to true to prevent repeated changes
    keyButtonPressedFlags[counter] = true;
  }
}

function mouseWheel(event) {
  // Update the target vertical position based on the mouse wheel delta
  targetDescriptionTextY += event.delta * scrollSpeed;
  
  // Constrain the target position to keep it within bounds
  targetDescriptionTextY = constrain(targetDescriptionTextY, height * 0.615, height * 0.66);

  // Move the description text towards the target position
  descriptionTextY += (targetDescriptionTextY - descriptionTextY) * 0.1;

  // Draw the description text at the updated position
  for (let i = 0; i < descriptionSpans.length; i++) {
    descriptionSpans[i].position((width - 1000) * 0.30, descriptionTextY);
  }
}

function artistInfo() {
  infoBleep.play();
  console.log("Getting artist information...");

  window.open("https://www.nationalgallery.gr/artist/vakalo-georgios/", "_blank");
}

function Completed() {
  keyimg.hide();
  arrowRight.hide();
  arrowLeft.hide();
  returnToFirstButton.hide();
  goToLastButton.hide();
  artistBt.hide();
  title.hide();
  level.hide();
  Complete.show();
}

function hideComplition() {
  Complete.hide();
  keyimg.show();
  arrowRight.show();
  arrowLeft.show();
  returnToFirstButton.show();
  goToLastButton.show();
  artistBt.show();
  title.show();
  level.show();
  staf = false;
}

function keyPressed() {
  // Check for the "`" key
  if (key === '`') {
    console.log("Backtick key pressed!");

    // Ask the user for a code
    const userCode = prompt("Enter a code:");

    // Check the entered code and redirect the user
    if (userCode === "KeyU") {
      Unlock = 125;
    } else if (userCode === "KeyL") {
      Unlock = 521;
    } 
  }
}

function mousePressed() {
  if (showMessage) {
    // Check if the mouse is over the "Yes" button
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 - 100 + 80 &&
      mouseY >= height / 3.05 &&
      mouseY <= height / 3.05 + 40
    ) {
      // Redirect to a new URL when "Yes" is clicked
      clickG.setVolume(0.1);
      clickG.play();
      setTimeout(function () {
        transition.setVolume(0.5);
        transition.play();
      }, 600);
      showMessage = false;
      setTimeout(function () {
        window.location.href = "../../Game/index.html";
      }, 2400);
    }

    // Check if the mouse is over the "No" button
    else if (
      mouseX >= width / 2 + 20 &&
      mouseX <= width / 2 + 20 + 80 &&
      mouseY >= height / 3.05 &&
      mouseY <= height / 3.05 + 40
    ) {
      // Reset showMessage to false if "No" is clicked
      clickG.setVolume(0.1);
      clickG.play();
      showMessage = false;
    }
  } else {
    if (
      mouseX >= (width - 850 * windowWidth / 1400) / 2 + 1 &&
  mouseX <= (width - 850 * windowWidth / 1400) / 2 + 1 + 850 * windowWidth / 1400 &&
  mouseY >= height * 0.14 &&
  mouseY <= height * 0.14 + 300 * windowHeight / 800 &&
  Unlock != 125

    ) {
       choice.setVolume(0.1);
       choice.play();
       showMessage = true; 
    }
  }
}

function displayMessageAndButtons() {
  fill(255, 40);
  stroke(2);
  rect(width / 2 - 200, height / 3.75, 400, 150, 20);
  
  textSize(28);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Do you want to play a game?", width / 2, height / 3.3);

  // "Yes" button
  fill(0, 255, 0, 150);
  rect(width / 2 - 100, height / 3.05, 80, 40, 9);
  fill(0);
  text("Yes", width / 2.113, height / 2.9);

  // "No" button
  fill(255, 0, 0, 150);
  rect(width / 2 + 20, height / 3.05, 80, 40, 9);
  fill(0);
  text("No", width / 1.893, height / 2.9);
}

function windowResized() {
  // Update the canvas size to match the new window size
  resizeCanvas(windowWidth, windowHeight);
  
  Audio_ButtonX = width * 0.055;
  Audio_ButtonY = height * 0.93;
  homeButtonX = width * 0.008;
  homeButtonY = height * 0.915;
  
  descriptionButtonX = (width - descriptionButton.width) / 2;
  descriptionButtonY = height / 1.16;
  
  arrowRightX = descriptionButtonX + descriptionButton.width + 10;
  arrowRightY =
    descriptionButtonY + descriptionButton.height / 2 - arrowRight.height / 2;
  arrowLeftX = descriptionButtonX - arrowLeft.width - 20;
  arrowLeftY =
    descriptionButtonY + descriptionButton.height / 2 - arrowLeft.height / 2;
  
  returnToFirstButtonX = arrowLeftX - margin;
  returnToFirstButtonY = descriptionButtonY + descriptionButton.height / 2 - returnToFirstButton.height / 2;
  goToLastButtonX = arrowRightX + margin;
  goToLastButtonY =
    descriptionButtonY + descriptionButton.height / 2 - goToLastButton.height / 2;
  
  keyButtonX = width * 0.01;
  keyButtonY = height * 0.2;
  
  nightModeButtonX = (width - nightModeButton.width) * 0.924;
  nightModeButtonY = height * 0.01;
  
  zoomButtonX = nightModeButtonX * 1.009;
  zoomButtonY = (nightModeButtonY + nightModeButton.height) * 1.65;
  unzoomButtonX = zoomButtonX;
  unzoomButtonY = zoomButtonY + buttonSize * windowWidth / 1700;
  
  
  Audio_Button.size(windowWidth / 32, windowWidth / 32);
  Audio_Button.position(Audio_ButtonX, Audio_ButtonY);
  homeButton.size(homeButtonSize * windowWidth / 1600, homeButtonSize * windowWidth / 1600);
  homeButton.position(homeButtonX, homeButtonY);
  
  descriptionButton.size(descriptionButtonSize * windowWidth / 1800, descriptionButtonSize * windowWidth / 1800);
  descriptionButton.position(descriptionButtonX, descriptionButtonY);
  
  arrowRight.size(arrowButtonSize * windowWidth / 1600, arrowButtonSize * windowWidth / 1800);
  arrowLeft.size(arrowButtonSize * windowWidth / 1600, arrowButtonSize * windowWidth / 1800);
  arrowRight.position(arrowRightX, arrowRightY);
  arrowLeft.position(arrowLeftX, arrowLeftY);
  
  returnToFirstButton.size(buttonSize * windowWidth / 1600, buttonSize * windowWidth / 1800);
  goToLastButton.size(buttonSize * windowWidth / 1600, buttonSize * windowWidth / 1800);
  returnToFirstButton.position(returnToFirstButtonX, returnToFirstButtonY);
  goToLastButton.position(goToLastButtonX, goToLastButtonY);
  
  keyimg.size(120 * windowWidth / 1600, 250 * windowWidth / 1600);
  keyimg.position(keyButtonX, keyButtonY);
  
  nightModeButton.size(windowWidth / 18, windowWidth / 18);
  nightModeButton.position(nightModeButtonX, nightModeButtonY);
  
  zoomButton.size(buttonSize * windowWidth / 2000, buttonSize * windowWidth / 2000);
  unzoomButton.size(buttonSize * windowWidth / 2000, buttonSize * windowWidth / 2000);
  zoomButton.position(zoomButtonX, zoomButtonY);
  unzoomButton.position(unzoomButtonX, unzoomButtonY);
  
  artistBt.size(artistButtonSize * windowWidth / 1600, artistButtonSize * windowWidth / 1600);
  artistBt.position(width * 0.82, height * 0.75)
  
  level.position(width * 0.022, height * 0.02);
  title.position((width - titleWidth1[counter]) / 2, height * 0.02);
  
  updateFontSize();
}

function updateFontSize() {
  let fontSize = height * 0.04;
  title.style("font-size", height * 0.035 + "px");
  level.style("font-size", height * 0.035 + "px");
}
