let startTime;
let elapsedTime;
let pausedTime = 0;
let MideMap = [];
let checked = 0;
let score = 0;
let multiplayer = 1;
let StarsV = 0;
let KeyIcon = 0;
let Bar;

let colorUpdate1;
let colorUpdate2;
let colorUpdate3;
let colorUpdate4;
let colorUpdate5;

let dKeyPressed = false;
let fKeyPressed = false;
let jKeyPressed = false;
let kKeyPressed = false;
let lKeyPressed = false;

let isPaused = false;
let pauseButtonImg; // Image button for pause
let pauseButtonState = "pause"; // Variable to track button state
let countdown = 0;
let resumeAfterCountdown = false;
let countingDown = false;
let countdownTimestamp = 0;
let countdownText = "";
let countdownInterval = 1000; // Set countdown interval to 1000 milliseconds (1 second)
let showGO = false;
let prevElapsedTime = 0; // Added variable to store elapsed time before pausing

let pauseImage;
let playImage;

const canvasWidth = 1400;
const canvasHeight = 800;

let bar0, bar1, bar2, bar3, bar4, bar5, bar6;
let star0, star1, star2, star3, star4, star5;

let PerfectNotes = 0;
let GoodNotes = 0;
let LostNotes = 0;
let Streak = 1;
let BestStreak = 0;

let PreviousInput = false;
let NewInput = false;
let flag = false;
let statsImage;
let statsImageVisible = false;
let flagCh = true;

let victoryTextVisible = false;
let defeatTextVisible = false;
let messageImageV;
let messageImageF;

let exitButtonV; // Victory exit button
let exitButtonF; // Defeat exit button
let exitButtonImg;
let exitButton1;
let exitButton2;
let MenuBar;
let ChestImg;

let flg = 0;
let highway, highwayF;
let Press1, Press2, Press3, Press4, Press5;
let streakF = false;
let Won = false;
let valueToSend = false;
let pausedTime23;

let PressImageVisible = {
  "d": false,
  "f": false,
  "j": false,
  "k": false,
  "l": false
};

let startingPoints = [
  { x: 558, y: 180, moveSpeedX: -0.69, moveSpeedY: 1.5, sizeChangeSpeedX: 0.1, sizeChangeSpeedY: 0.1 },
  { x: 625, y: 170, moveSpeedX: -0.38, moveSpeedY: 1.5, sizeChangeSpeedX: 0.1, sizeChangeSpeedY: 0.1 },
  { x: 680, y: 160, moveSpeedX: -0.055, moveSpeedY: 1.5, sizeChangeSpeedX: 0.1, sizeChangeSpeedY: 0.1 },
  { x: 735, y: 170, moveSpeedX: 0.28, moveSpeedY: 1.5, sizeChangeSpeedX: 0.1, sizeChangeSpeedY: 0.1 },
  { x: 800, y: 180, moveSpeedX: 0.59, moveSpeedY: 1.5, sizeChangeSpeedX: 0.1, sizeChangeSpeedY: 0.1 },
];

let Spawns = [
  { lineX: 3, spawnTime: 4 },
  { lineX: 2, spawnTime: 6 },
  { lineX: 4, spawnTime: 6 },
  { lineX: 1, spawnTime: 8 },
  { lineX: 5, spawnTime: 8 },
  { lineX: 2, spawnTime: 11 },
  { lineX: 4, spawnTime: 11 },
  { lineX: 3, spawnTime: 14 },
  { lineX: 1, spawnTime: 17 },
  { lineX: 5, spawnTime: 17 },
  { lineX: 1, spawnTime: 19 },
  { lineX: 5, spawnTime: 19 },
  { lineX: 2, spawnTime: 21 },
  { lineX: 4, spawnTime: 21 },
  { lineX: 2, spawnTime: 22 },
  { lineX: 4, spawnTime: 22 },
  { lineX: 2, spawnTime: 24 },
  { lineX: 4, spawnTime: 24 },
  // Add more as needed
];

let WW = false;
let LL = false;
let RR = false; 
let miss = false;

let lost = false;
let MS = false;
let OF = false;
let FF = false;
let TM1 = false, TM2 = false, TM3 = false, TM4 = false, TM5 = false, TM6 = false;
let STR1 = false, STR2 = false, STR3 = false, STR4 = false, STR5 = false;
let FRM1 = false, FRM2 = false, FRM3 = false, FRM4 = false;

let movingNote1 = [];
let sizeNoteX = 40;
let sizeNoteY = 25;

// Line counters
let lineCounters = [0, 0, 0, 0, 0];

// Retrieve the value from localStorage
let Stage = localStorage.getItem('Stage');

if (Stage !== null && Stage !== undefined) {
    console.log("Received Stage:", Stage);
} else {
    console.log("Stage not found in localStorage");
}

let music;
let MenuOpen;
let MenuClose;
let Quit;
let Exit;
let Pause;
let Win;
let Lose;
let Frame1_2, Frame2_3, Frame3_4, Frame4_5;
let Star1, Star2, Star3, Star4, Star5;
let Time1_2, Time2_3, Time3_4, Time4_5, Time5_6, Time6_7;
let Press1PP, Press2N, Press7WW;
let Fire;
let ChestOpen;
let Equip;
let Rewind;
let countdown453;

let StageF1 = 521;
let StageF2 = 521;
let StageF3 = 521;
let StageF4 = 521;
let StageF5 = 521;
let StageF6 = 521;
let StageF7 = 521;

function preload() {
  music = loadSound('Audio/Music/Music13.mp3');
  
  MenuOpen = loadSound("Audio/sounds/slide.mp3");
  MenuClose = loadSound("Audio/sounds/unslide.mp3");
  
  Quit = loadSound("Audio/sounds/Quit.mp3");
  Exit = loadSound("Audio/sounds/Exit.mp3");
  Pause1 = loadSound("Audio/sounds/pause.mp3");
  Pause2 = loadSound("Audio/sounds/pause2.mp3");
  Win = loadSound("Audio/sounds/crowd-cheer.mp3");
  Lose = loadSound("Audio/sounds/Lose1.mp3");
  Fire = loadSound("Audio/sounds/fire.mp3");
  ChestOpen = loadSound("Audio/sounds/Chest_-Open.wav");
  Equip = loadSound("Audio/sounds/item-equip.mp3");
  Rewind = loadSound("Audio/sounds/rewind.mp3");
  countdown453 = loadSound("Audio/sounds/countdown.mp3")
  
  Frame1_2 = loadSound("Audio/sounds/spotlight.mp3");
  Frame2_3 = loadSound("Audio/sounds/Step1.mp3");
  Frame3_4 = loadSound("Audio/sounds/Step2.mp3");
  Frame4_5 = loadSound("Audio/sounds/disappear.mp3");
  
  Star1 = loadSound("Audio/sounds/Star1.mp3");
  Star2 = loadSound("Audio/sounds/Star2.mp3");
  Star3 = loadSound("Audio/sounds/Star3.mp3");
  Star4 = loadSound("Audio/sounds/Star4.mp3");
  Star5 = loadSound("Audio/sounds/Star5.mp3");
  
  Time1_2 = loadSound("Audio/sounds/Time1.mp3");
  Time2_3 = loadSound("Audio/sounds/Time2.mp3");
  Time3_4 = loadSound("Audio/sounds/Time3.mp3");
  Time4_5 = loadSound("Audio/sounds/Time4.mp3");
  Time5_6 = loadSound("Audio/sounds/Time5.mp3");
  Time6_7 = loadSound("Audio/sounds/Time6.mp3");
  
  Press1PP = loadSound("Audio/sounds/rightanswer2.mp3");
  Press2N = loadSound("Audio/sounds/correct1.mp3");
  Press7WW = loadSound("Audio/sounds/wrong1.mp3");
  
  pauseImage = loadImage('images/buttons/pauseF.png');
  playImage = loadImage('images/buttons/play-buttonF.png');
  
  bar0 = loadImage('images/Bar/Bar0.png');
  bar1 = loadImage('images/Bar/Bar1.png');
  bar2 = loadImage('images/Bar/Bar2.png');
  bar3 = loadImage('images/Bar/Bar3.png');
  bar4 = loadImage('images/Bar/Bar4.png');
  bar5 = loadImage('images/Bar/Bar5.png');
  bar6 = loadImage('images/Bar/Bar6.png');
  
  star0 = loadImage('images/Stars/StarPF0.png');
  star1 = loadImage('images/Stars/StarPF1.png');
  star2 = loadImage('images/Stars/StarPF2.png');
  star3 = loadImage('images/Stars/StarPF3.png');
  star4 = loadImage('images/Stars/StarPF4.png');
  star5 = loadImage('images/Stars/StarPF5.png');
  
  statsImageV = loadImage('images/Borders/Stats3.png');
  statsImageF = loadImage('images/Borders/Stats2.png');
  messageImageV = loadImage('images/Messeges/Victory.png');
  messageImageF = loadImage('images/Messeges/Defeat.png');
  
  BackgroundB = loadImage('images/Background/StageB.jpg');
  BackgroundP = loadImage('images/Background/StageP.jpg');
  BackgroundN = loadImage('images/Background/Background.jpg');
  
  Grade1 = loadImage('images/Grade/F.png');
  Grade2 = loadImage('images/Grade/D.png');
  Grade3 = loadImage('images/Grade/C.png');
  Grade4 = loadImage('images/Grade/B.png');
  Grade5 = loadImage('images/Grade/A-.png');
  Grade6 = loadImage('images/Grade/A.png');
  Grade7 = loadImage('images/Grade/A+.png');
  
  Press1 = loadImage('images/Game/press1.png');
  Press2 = loadImage('images/Game/press2.png');
  Press3 = loadImage('images/Game/press3.png');
  Press4 = loadImage('images/Game/press4.png');
  Press5 = loadImage('images/Game/press5.png');
  
  Press1W = loadImage('images/Game/Press1W.png');
  Press2W = loadImage('images/Game/Press2W.png');
  Press3W = loadImage('images/Game/Press3W.png');
  Press4W = loadImage('images/Game/Press4W.png');
  Press5W = loadImage('images/Game/Press5W.png');
  
  Press1P = loadImage('images/Game/Press1P.png');
  Press2P = loadImage('images/Game/Press2P.png');
  Press3P = loadImage('images/Game/Press3P.png');
  Press4P = loadImage('images/Game/Press4P.png');
  Press5P = loadImage('images/Game/Press5P.png');
  
  Frame3 = loadImage('images/frame/Frame3.png');
  Frame2 = loadImage('images/frame/Frame2.png');
  Frame1 = loadImage('images/frame/Frame1.png');
  
  Keys = loadImage('images/Reward/KeyRing.png');
  
  movingNote1Image = loadImage('images/Game/note.png');
  
  exitButtonV = loadImage('images/buttons/exitB.png'); // Image for victory exit
  exitButtonF = loadImage('images/buttons/exitP.png'); // Image for defeat exit
  
  highwayF = loadImage('images/frame/paleteFF.png');
  OnFire = loadImage('images/Game/onFire.png');
}

function initializeMovingNote1(lineX) {
  let numberOfNotesToSpawn = 1; // Adjust the number of notes to spawn
  let startPoint = startingPoints[lineX - 1]; // Adjust index since array is 0-based

  let note1 = {
    x: startPoint.x,
    y: startPoint.y,
    sizeX: sizeNoteX,
    sizeY: sizeNoteY,
    visible: true,
    moveSpeedX: startPoint.moveSpeedX,
    moveSpeedY: startPoint.moveSpeedY,
    sizeChangeSpeedX: startPoint.sizeChangeSpeedX,
    sizeChangeSpeedY: startPoint.sizeChangeSpeedY,
    lineX: lineX, // Store the line number
  };

  movingNote1.push(note1);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  startTime = millis();
  frameRate(60);
  
  exitButton1 = createImg('images/buttons/exitB.png');
  exitButton1.size(120, 120);
  exitButton1.position(width / 2 - 60, height -194);
  exitButton1.mousePressed(exitGame);
  exitButton1.hide(); // Initially hide the button
  
  exitButton2 = createImg('images/buttons/exitP.png');
  exitButton2.size(120, 120);
  exitButton2.position(width / 2 - 60, height -194);
  exitButton2.mousePressed(exitGame);
  exitButton2.hide(); // Initially hide the button
  
  MenuBar2Img = createImg('images/Borders/MenuBar.png', 'Menu');
  MenuBar2Img.size(110, 450); // Set the size of the image
  MenuBar2Img.position(width - 128, -230);
  MenuBar2Img.mousePressed(menu2);
  MenuBar2Img.hide();

  pauseButtonImg = createImg('images/buttons/pauseF.png', 'Pause');
  pauseButtonImg.size(55, 55); // Set the size of the image
  pauseButtonImg.position(width - 100, 80);
  pauseButtonImg.mousePressed(togglePause);
  pauseButtonImg.hide();
  
  exitButtonImg = createImg('images/buttons/exit.png', 'Exit');
  exitButtonImg.size(55, 55); // Set the size of the image
  exitButtonImg.position(width - 100, 10);
  exitButtonImg.mousePressed(exit);
  exitButtonImg.hide();
  
  MenuBar1Img = createImg('images/Borders/MenuBar.png', 'Menu');
  MenuBar1Img.size(110, 450); // Set the size of the image
  MenuBar1Img.position(width - 128, -360);
  MenuBar1Img.mousePressed(menu1);
  
  ChestImg = createImg('images/Reward/ChestF.png', 'Chest');
  ChestImg.size(180, 180); // Set the size of the image
  ChestImg.position(900, 490);
  ChestImg.mousePressed(open);
  ChestImg.hide();
  
  KeyRing = createImg('images/Reward/KeyRing.png', 'Keys');
  KeyRing.size(150, 150); // Set the size of the image
  KeyRing.position(900, 490);
  KeyRing.mousePressed(claim);
  KeyRing.hide();
}

if (Stage == 11 || Stage == 22) {
  MideMap[0] = { note: "j", TimeS: 8.5, TimeE: 9.5 };
  MideMap[1] = { note: "fk", TimeS: 10.5, TimeE: 11.5 };
  MideMap[2] = { note: "dl", TimeS: 12.5, TimeE: 13.5 };
  MideMap[3] = { note: "fk", TimeS: 15.5, TimeE: 16.5 };
  MideMap[4] = { note: "j", TimeS: 18.5, TimeE: 19.5 };
  MideMap[5] = { note: "dl", TimeS: 21.5, TimeE: 22.5 };
  MideMap[6] = { note: "dl", TimeS: 23.5, TimeE: 24.5 };
  MideMap[7] = { note: "fk", TimeS: 25.5, TimeE: 26.5 };
  MideMap[8] = { note: "fk", TimeS: 26.5, TimeE: 27.5 };
  MideMap[9] = { note: "fk", TimeS: 28.5, TimeE: 29.5 };
  
} else if (Stage == 33 || Stage == 44) {
  MideMap[0] = { note: "j", TimeS: 8.5, TimeE: 9.5 };
  MideMap[1] = { note: "fk", TimeS: 10.5, TimeE: 11.5 };
  MideMap[2] = { note: "dl", TimeS: 12.5, TimeE: 13.5 };
  MideMap[3] = { note: "fk", TimeS: 15.5, TimeE: 16.5 };
  MideMap[4] = { note: "j", TimeS: 18.5, TimeE: 19.5 };
  MideMap[5] = { note: "dl", TimeS: 21.5, TimeE: 22.5 };
  MideMap[6] = { note: "dl", TimeS: 23.5, TimeE: 24.5 };
  MideMap[7] = { note: "fk", TimeS: 25.5, TimeE: 26.5 };
  MideMap[8] = { note: "fk", TimeS: 26.5, TimeE: 27.5 };
  MideMap[9] = { note: "fk", TimeS: 28.5, TimeE: 29.5 };
  
} else if (Stage == 55 || Stage == 66) {
  MideMap[0] = { note: "j", TimeS: 8.5, TimeE: 9.5 };
  MideMap[1] = { note: "fk", TimeS: 10.5, TimeE: 11.5 };
  MideMap[2] = { note: "dl", TimeS: 12.5, TimeE: 13.5 };
  MideMap[3] = { note: "fk", TimeS: 15.5, TimeE: 16.5 };
  MideMap[4] = { note: "j", TimeS: 18.5, TimeE: 19.5 };
  MideMap[5] = { note: "dl", TimeS: 21.5, TimeE: 22.5 };
  MideMap[6] = { note: "dl", TimeS: 23.5, TimeE: 24.5 };
  MideMap[7] = { note: "fk", TimeS: 25.5, TimeE: 26.5 };
  MideMap[8] = { note: "fk", TimeS: 26.5, TimeE: 27.5 };
  MideMap[9] = { note: "fk", TimeS: 28.5, TimeE: 29.5 };
  
} else if (Stage == 77) {
  MideMap[0] = { note: "j", TimeS: 8.5, TimeE: 9.5 };
  MideMap[1] = { note: "fk", TimeS: 10.5, TimeE: 11.5 };
  MideMap[2] = { note: "dl", TimeS: 12.5, TimeE: 13.5 };
  MideMap[3] = { note: "fk", TimeS: 15.5, TimeE: 16.5 };
  MideMap[4] = { note: "j", TimeS: 18.5, TimeE: 19.5 };
  MideMap[5] = { note: "dl", TimeS: 21.5, TimeE: 22.5 };
  MideMap[6] = { note: "dl", TimeS: 23.5, TimeE: 24.5 };
  MideMap[7] = { note: "fk", TimeS: 25.5, TimeE: 26.5 };
  MideMap[8] = { note: "fk", TimeS: 26.5, TimeE: 27.5 };
  MideMap[9] = { note: "fk", TimeS: 28.5, TimeE: 29.5 };
  
} else if (Stage == 88) {
  MideMap[0] = { note: "j", TimeS: 8.5, TimeE: 9.5 };
  MideMap[1] = { note: "fk", TimeS: 10.5, TimeE: 11.5 };
  MideMap[2] = { note: "dl", TimeS: 12.5, TimeE: 13.5 };
  MideMap[3] = { note: "fk", TimeS: 15.5, TimeE: 16.5 };
  MideMap[4] = { note: "j", TimeS: 18.5, TimeE: 19.5 };
  MideMap[5] = { note: "dl", TimeS: 21.5, TimeE: 22.5 };
  MideMap[6] = { note: "dl", TimeS: 23.5, TimeE: 24.5 };
  MideMap[7] = { note: "fk", TimeS: 25.5, TimeE: 26.5 };
  MideMap[8] = { note: "fk", TimeS: 26.5, TimeE: 27.5 };
  MideMap[9] = { note: "fk", TimeS: 28.5, TimeE: 29.5 };
} else {
  MideMap[0] = { note: "j", TimeS: 8.5, TimeE: 9.5 };
  MideMap[1] = { note: "fk", TimeS: 10.5, TimeE: 11.5 };
  MideMap[2] = { note: "dl", TimeS: 12.5, TimeE: 13.5 };
  MideMap[3] = { note: "fk", TimeS: 15.5, TimeE: 16.5 };
  MideMap[4] = { note: "j", TimeS: 18.5, TimeE: 19.5 };
  MideMap[5] = { note: "dl", TimeS: 21.5, TimeE: 22.5 };
  MideMap[6] = { note: "dl", TimeS: 23.5, TimeE: 24.5 };
  MideMap[7] = { note: "fk", TimeS: 25.5, TimeE: 26.5 };
  MideMap[8] = { note: "fk", TimeS: 26.5, TimeE: 27.5 };
  MideMap[9] = { note: "fk", TimeS: 28.5, TimeE: 29.5 };
}


function menu1() {
  MenuOpen.setVolume(0.7);
  MenuOpen.play();
  
  MenuBar1Img.hide();
  MenuBar2Img.show();
  pauseButtonImg.show();
  exitButtonImg.show();
}

function menu2() {
  MenuClose.setVolume(0.7);
  MenuClose.play();
  
  MenuBar1Img.show();
  MenuBar2Img.hide();
  pauseButtonImg.hide();
  exitButtonImg.hide();
}

function exit() {
  Quit.setVolume(0.5);
  Quit.play();
  setTimeout(function () {
    if (Stage == 11) {
      window.location.href = "https://magicarchie.github.io/Stage_1F/";
    } else if (Stage == 22) {
      window.location.href = "https://magicarchie.github.io/Stage_2F/";
    } else if (Stage == 33) {
      window.location.href = "https://magicarchie.github.io/Stage_3F/";
    } else if (Stage == 44) {
      window.location.href = "https://magicarchie.github.io/Stage_4F/";
    } else if (Stage == 55) {
      window.location.href = "https://magicarchie.github.io/Stage_5F/";
    } else if (Stage == 66) {
      window.location.href = "https://magicarchie.github.io/Stage_6F/";
    } else if (Stage == 77) {
      window.location.href = "https://magicarchie.github.io/Stage_7F/";
    } else if (Stage == 88) {
      window.location.href = "https://magicarchie.github.io/Stage_Selection_Secret/";
    } else if (Stage == 99) {
      window.location.href = "https://magicarchie.github.io/Stage_Selection_Finale/";
    }
  }, 1600);
}

function togglePause() {
  if (!isPaused) {
    music.setVolume(0.0);
    //pausedTime23 = music.currentTime();
    Pause1.setVolume(0.5);
    Pause1.play();
    
    isPaused = true;
    pausedTime = millis() - startTime;
    prevElapsedTime = elapsedTime; // Store elapsed time before pausing
  } else {
    setTimeout(function () {
      music.setVolume(1);
      //music.jump(pausedTime - 1200);
    }, 4400);
    Pause2.setVolume(0.5);
    Pause2.play();
    
    setTimeout(function () {
      countdown453.setVolume(0.5);
      countdown453.play();
    }, 800);
    
    startTime = millis() - pausedTime;
    countdown = 4;
    countingDown = true;
    resumeAfterCountdown = true;
    countdownTimestamp = millis();
    
    // Disable the pause button during the countdown
    pauseButtonImg.style('pointer-events', 'none');

    setTimeout(function () {
      // Enable the pause button after the countdown
      pauseButtonImg.style('pointer-events', 'auto');
      showGO = false;
    }, 4500); // Adjust the delay to match your countdown duration
  }

  // Toggle between "pause" and "play-button" images
  pauseButtonState = (pauseButtonState === "pause") ? "play-button" : "pause";
  updateButtonImage();
}

function UpdateExit() {
  if (score >= 150) {
    exitButton1.show();
  } else {
    exitButton2.show();
  }
}

function exitGame() {
  Exit.setVolume(1);
  Exit.play();
  setTimeout(function () {
    if (Stage == 11) {
      window.location.href = "https://magicarchie.github.io/Stage_1F/";
    } else if (Stage == 22) {
      window.location.href = "https://magicarchie.github.io/Stage_2F/";
    } else if (Stage == 33) {
      window.location.href = "https://magicarchie.github.io/Stage_3F/";
    } else if (Stage == 44) {
      window.location.href = "https://magicarchie.github.io/Stage_4F/";
    } else if (Stage == 55) {
      window.location.href = "https://magicarchie.github.io/Stage_5F/";
    } else if (Stage == 66) {
      window.location.href = "https://magicarchie.github.io/Stage_6F/";
    } else if (Stage == 77) {
      window.location.href = "https://magicarchie.github.io/Stage_7F/";
    } else if (Stage == 99) {
      window.location.href = "https://magicarchie.github.io/Stage_Selection_Finale/";
    } else if (Stage == 88) {
      if (victoryTextVisible) {
        window.location.href = "https://magicarchie.github.io/Stage_Selection_Finale/";
      } else {
        window.location.href = "https://magicarchie.github.io/Stage_Selection_Secret/";
      }
    }
  }, 1700);
}

function updateButtonImage() {
  if (pauseButtonState === "pause") {
    pauseButtonImg.attribute('src', 'images/buttons/pauseF.png'); // Refresh the image to "pause.png"
  } else {
    pauseButtonImg.attribute('src', 'images/buttons/play-buttonF.png'); // Change the image to "play-button.png"
  }

  // Enable the pause button after the countdown or when the game is resumed
  if (!countingDown && isPaused) {
    // Here we enable the pause button
    pauseButtonImg.style('pointer-events', 'auto');
  } else if (!isPaused) {
    // Ensure the pause button is enabled when not in a paused state
    pauseButtonImg.style('pointer-events', 'auto');
  }
}

function keyPressed() {
  if (key == "d" || key == "δ") {
    PressImageVisible["d"] = true;
  } else if (key == "f" || key == "φ") {
    PressImageVisible["f"] = true;
  } else if (key == "j" || key == "ξ") {
    PressImageVisible["j"] = true;
  } else if (key == "k" || key == "κ") {
    PressImageVisible["k"] = true;
  } else if (key == "l" || key == "λ") {
    PressImageVisible["l"] = true;
  }
  
  // Check which key is pressed and hide the note with the highest Y-coordinate for the corresponding line
  if (key === 'd') {
    hideHighestYNote(1); // Line 1
  } else if (key === 'f') {
    hideHighestYNote(2); // Line 2
  } else if (key === 'j') {
    hideHighestYNote(3); // Line 3
  } else if (key === 'k') {
    hideHighestYNote(4); // Line 4
  } else if (key === 'l') {
    hideHighestYNote(5); // Line 5
  }
}

function keyReleased() {
  let releaseDelay = 100; 
  
  if (key == "d" || key == "δ") {
    setTimeout(function() {
      PressImageVisible["d"] = false;
    }, releaseDelay);
  } else if (key == "f" || key == "φ") {
    setTimeout(function() {
      PressImageVisible["f"] = false;
    }, releaseDelay);
  } else if (key == "j" || key == "ξ") {
    setTimeout(function() {
      PressImageVisible["j"] = false;
    }, releaseDelay);
  } else if (key == "k" || key == "κ") {
    setTimeout(function() {
      PressImageVisible["k"] = false;
    }, releaseDelay);
  } else if (key == "l" || key == "λ") {
    setTimeout(function() {
      PressImageVisible["l"] = false;
    }, releaseDelay);
  }
}

function hideHighestYNote(line) {
  let lineIndex = line - 1; // Adjust index since array is 0-based
  let highestYIndex = -1;
  let highestY = -Infinity;

  // Find the note with the highest Y-coordinate in the specified line
  for (let i = 0; i < movingNote1.length; i++) {
    let currentNote = movingNote1[i];
    if (currentNote.visible && currentNote.y > highestY && currentNote.lineX === line) {
      highestY = currentNote.y;
      highestYIndex = i;
    }
  }

  // Hide the note with the highest Y-coordinate if found
  if (highestYIndex !== -1) {
    movingNote1[highestYIndex].visible = false;
  }
}

function stringContainsLetter(str, letter) {
  // Convert both the string and the target letter to lowercase for case-insensitive comparison
  str = str.toLowerCase();
  letter = letter.toLowerCase();

  // Check if the string contains the target letter
  return str.includes(letter);
}

function draw() {
  
  if (MS == false) {
    //music.setVolume(1);
    setTimeout(function() {
      music.play();
    }, 1200);
    MS = true;
  }
  
  if ((Math.floor(elapsedTime)) >= 130) {
    UpdateExit();
  }
  
  if ((Math.floor(elapsedTime)) >= 130) {
    statsImageVisible = true;
  }
  
  if ((Math.floor(elapsedTime)) >= 130 && statsImageVisible) { 
    if (StarsV >= 3) {
      if (WW == false) {
        Win.setVolume(0.3);
        Win.play();
        WW = true;
      }
      image(BackgroundB, 0, 0, canvasWidth, canvasHeight);
    } else {
      if (LL == false) {
        Lose.setVolume(0.8);
        Lose.play();
        LL = true;
      }
      image(BackgroundP, 0, 0, canvasWidth, canvasHeight);
    }
  } else {
    image(BackgroundN, 0, 0, canvasWidth, canvasHeight);
  }
  
  if ((Math.floor(elapsedTime)) >= 126) { 
    OF = true;
  } else {
    image(highwayF, 0, 0);
  }
  
  if ((Math.floor(elapsedTime)) >= 126 && (Math.floor(elapsedTime)) <= 127) { 
    if (FRM1 == false) {
      Frame1_2.setVolume(0.4);
      Frame1_2.play();
      FRM1 = true;
      if (BestStreak < Streak) {
        BestStreak = Streak;
      }
    }
    
    image(Frame3, 0, 0);
  } else if ((Math.floor(elapsedTime)) >= 127 && (Math.floor(elapsedTime)) <= 128) {
    if (FRM2 == false) {
      Frame2_3.setVolume(2);
      Frame2_3.play();
      FRM2 = true;
    }
    
    image(Frame2, 0, 0); 
  } else if ((Math.floor(elapsedTime)) >= 128 && (Math.floor(elapsedTime)) <= 129) {
    if (FRM3 == false) {
      Frame3_4.setVolume(2);
      Frame3_4.play();
      FRM3 = true;
    }
    
    image(Frame1, 0, 0); 
  }
  
   if (PressImageVisible["d"]) {
     if (colorUpdate1 == 1) {  
       image(Press1P, 0, -13);
     } else if ( colorUpdate1 == 2) {
       image(Press1, 0, -13);
     } else if (colorUpdate1 == 3) {
       image(Press1W, 0, -13);
     }      
  }

  if (PressImageVisible["f"]) {
     if (colorUpdate2 == 1) {
       image(Press2P, 0, -13);
     } else if ( colorUpdate2 == 2) {
       image(Press2, 0, -13);
     } else if (colorUpdate1 == 3) {
       image(Press2W, 0, -13);
     }      
  }
  
  if (PressImageVisible["j"]) {
     if (colorUpdate3 == 1) {
       image(Press3P, 0, -13);
     } else if ( colorUpdate3 == 2) {
       image(Press3, 0, -13);
     } else if (colorUpdate3 == 3) {
       image(Press3W, 0, -13);
     }      
  }
  
  if (PressImageVisible["k"]) {
     if (colorUpdate4 == 1) {
       image(Press4P, 0, -13);
     } else if ( colorUpdate4 == 2) {
       image(Press4, 0, -13);
     } else if (colorUpdate4 == 3) {
       image(Press4W, 0, -13);
     }      
  }
  
  if (PressImageVisible["l"]) {
     if (colorUpdate5 == 1) {
       image(Press5P, 0, -13);
     } else if ( colorUpdate5 == 2) {
       image(Press5, 0, -13);
     } else if (colorUpdate5 == 3) {
       image(Press5W, 0, -13);
     }      
  }
  
    if ((Math.floor(elapsedTime)) >= 126) {
      fill(60, 160); 
    } else {
      fill(40, 230); 
    }
    stroke(15);   
    strokeWeight(5);
    if (!statsImageVisible) {
      rect(10, 10, 200, 120, 10); 
    }

  if (!isPaused) {
    elapsedTime = (millis() - startTime) / 1000;

    if (checked < MideMap.length && elapsedTime > MideMap[checked].TimeE) {
      checked++;
    }

    if (keyIsPressed && (key == "d" || key == "δ") && !dKeyPressed) {
      console.log("D key is pressed at Elapsed Time: " + Math.floor(elapsedTime) + " seconds");
      dKeyPressed = true;

      // Check if the "D" key is pressed between TimeS and TimeE
      if (
        checked < MideMap.length &&
        elapsedTime >= MideMap[checked].TimeS &&
        elapsedTime <= MideMap[checked].TimeE &&
        (stringContainsLetter(MideMap[checked].note, "d"))
      ) {
        if (flag == true) {
          PreviousInput = NewInput;
        } else {
          flag = true;
        }
        if ((Math.floor(elapsedTime)) == (MideMap[checked].TimeS + MideMap[checked].TimeE) / 2) {
          Press1PP.setVolume(0.5);
          Press1PP.play();
          PerfectNotes++;
          NewInput = true;
          score = score + 10 * multiplayer;
          colorUpdate1 = 1;
        } else {
          Press2N.setVolume(0.05);
          Press2N.play();
          GoodNotes++;
          NewInput = true;
          score = score + 5 * multiplayer;
          colorUpdate1 = 2;
        }
      } else {
        Press7WW.setVolume(1);
        Press7WW.play();
        LostNotes++;
        NewInput = false;
        if (score != 0) {
          score = score - 5;
        }
        colorUpdate1 = 3;
      }
      
      if (PreviousInput == true && NewInput == true && (keyIsPressed && key == "d" || key == "δ")) {
        streakF = true;
        Streak++;
        multiplayer = 2;
    } else if (PreviousInput == false || NewInput == false && (keyIsPressed && key == "d" || key == "δ")) {
        streakF = false;
        multiplayer = 1;
      if (BestStreak >= Streak) {
        Streak = 1;
       } else {
        BestStreak = Streak;
        Streak = 1; 
       }
    }
      
    } else if (!keyIsPressed && (key !== "d" || key !== "δ")) {
      dKeyPressed = false;
    }
//----------------------------------------------------------------------//
    if (keyIsPressed && (key == "f" || key == "φ") && !fKeyPressed) {
      console.log("f key is pressed at Elapsed Time: " + Math.floor(elapsedTime) + " seconds");
      fKeyPressed = true;

      // Check if the "F" key is pressed between TimeS and TimeE
      if (
        checked < MideMap.length &&
        elapsedTime >= MideMap[checked].TimeS &&
        elapsedTime <= MideMap[checked].TimeE &&
        (stringContainsLetter(MideMap[checked].note, "f"))
      ) {
        if (flag == true) {
          PreviousInput = NewInput;
        } else {
          flag = true;
        }
        if ((Math.floor(elapsedTime)) == (MideMap[checked].TimeS + MideMap[checked].TimeE) / 2) {
          Press1PP.setVolume(0.5);
          Press1PP.play();
          PerfectNotes++;
          NewInput = true;
          score = score + 10 * multiplayer;
          colorUpdate2 = 1;
        } else {
          Press2N.setVolume(0.05);
          Press2N.play();
          GoodNotes++;
          NewInput = true;
          score = score + 5 * multiplayer;
          colorUpdate2 = 2;
        }
      } else {
        Press7WW.setVolume(1);
        Press7WW.play();
        LostNotes++;
        NewInput = false;
        if (score != 0) {
          score = score - 5;
        }
        colorUpdate2 = 3;
      }
      
      if (PreviousInput == true && NewInput == true && (keyIsPressed && key == "f" || key == "φ")) {
        streakF = true;
        Streak++;
        multiplayer = 2;
    } else if (PreviousInput == false || NewInput == false && (keyIsPressed && key == "f" || key == "φ")) {
        streakF = false;
        multiplayer = 1;
      if (BestStreak >= Streak) {
        Streak = 1;
       } else {
        BestStreak = Streak;
        Streak = 1; 
       }
    }
      
    } else if (!keyIsPressed && (key !== "f" || key !== "φ")) {
      fKeyPressed = false;
    }
//----------------------------------------------------------------------//
    if (keyIsPressed && (key == "j" || key == "ξ") && !jKeyPressed) {
      console.log("j key is pressed at Elapsed Time: " + Math.floor(elapsedTime) + " seconds");
      jKeyPressed = true;

      // Check if the "J" key is pressed between TimeS and TimeE
      if (
        checked < MideMap.length &&
        elapsedTime >= MideMap[checked].TimeS &&
        elapsedTime <= MideMap[checked].TimeE &&
        (stringContainsLetter(MideMap[checked].note, "j"))
      ) {
        if (flag == true) {
          PreviousInput = NewInput;
        } else {
          flag = true;
        }
        if ((Math.floor(elapsedTime)) == (MideMap[checked].TimeS + MideMap[checked].TimeE) / 2) {
          Press1PP.setVolume(0.5);
          Press1PP.play();
          PerfectNotes++;
          NewInput = true;
          score = score + 10 * multiplayer;
          colorUpdate3 = 1;
        } else {
          Press2N.setVolume(0.05);
          Press2N.play();
          GoodNotes++;
          NewInput = true;
          score = score + 5 * multiplayer;
          colorUpdate3 = 2;
        }
      } else {
        Press7WW.setVolume(1);
        Press7WW.play();
        LostNotes++;
        NewInput = false;
        if (score != 0) {
          score = score - 5;
        }
        colorUpdate3 = 3;
      }
      
      if (PreviousInput == true && NewInput == true && (keyIsPressed && key == "j" || key == "ξ")) {
        streakF = true;
        Streak++;
        multiplayer = 2;
    } else if (PreviousInput == false || NewInput == false && (keyIsPressed && key == "j" || key == "ξ")) {
        streakF = false;
        multiplayer = 1;
      if (BestStreak >= Streak) {
        Streak = 1;
       } else {
        BestStreak = Streak;
        Streak = 1; 
       }
    }
      
    } else if (!keyIsPressed && (key !== "j" || key !== "ξ")) {
      jKeyPressed = false;
    }
//----------------------------------------------------------------------//
    if (keyIsPressed && (key == "k" || key == "κ") && !kKeyPressed) {
      console.log("k key is pressed at Elapsed Time: " + Math.floor(elapsedTime) + " seconds");
      kKeyPressed = true;

      // Check if the "K" key is pressed between TimeS and TimeE
      if (
        checked < MideMap.length &&
        elapsedTime >= MideMap[checked].TimeS &&
        elapsedTime <= MideMap[checked].TimeE &&
        (stringContainsLetter(MideMap[checked].note, "k")) 
      ) {
        if (flag == true) {
          PreviousInput = NewInput;
        } else {
          flag = true;
        }
        if ((Math.floor(elapsedTime)) == (MideMap[checked].TimeS + MideMap[checked].TimeE) / 2) {
          Press1PP.setVolume(0.5);
          Press1PP.play();
          PerfectNotes++;
          NewInput = true;
          score = score + 10 * multiplayer;
          colorUpdate4 = 1;
        } else {
          Press2N.setVolume(0.05);
          Press2N.play();
          GoodNotes++;
          NewInput = true;
          score = score + 5 * multiplayer;
          colorUpdate4 = 2;
        }
      } else {
        Press7WW.setVolume(1);
        Press7WW.play();
        LostNotes++;
        NewInput = false;
        if (score != 0) {
          score = score - 5;
        }
        colorUpdate4 = 3;
      }
      
      if (PreviousInput == true && NewInput == true && (keyIsPressed && key == "k" || key == "κ")) {
        streakF = true;
        Streak++;
        multiplayer = 2;
    } else if (PreviousInput == false || NewInput == false && (keyIsPressed && key == "k" || key == "κ")) {
        streakF = false;
        multiplayer = 1;
      if (BestStreak >= Streak) {
        Streak = 1;
       } else {
        BestStreak = Streak;
        Streak = 1; 
       }
    }
      
    } else if (!keyIsPressed && (key !== "k" || key !== "κ")) {
      kKeyPressed = false;
    }
//----------------------------------------------------------------------//
    if (keyIsPressed && (key == "l" || key == "λ") && !lKeyPressed) {
      console.log("l key is pressed at Elapsed Time: " + Math.floor(elapsedTime) + " seconds");
      lKeyPressed = true;

      // Check if the "L" key is pressed between TimeS and TimeE
      if (
        checked < MideMap.length &&
        elapsedTime >= MideMap[checked].TimeS &&
        elapsedTime <= MideMap[checked].TimeE &&
        (stringContainsLetter(MideMap[checked].note, "l"))
      ) {
        if (flag == true) {
          PreviousInput = NewInput;
        } else {
          flag = true;
        }
        if ((Math.floor(elapsedTime)) == (MideMap[checked].TimeS + MideMap[checked].TimeE) / 2) {
          Press1PP.setVolume(0.5);
          Press1PP.play();
          PerfectNotes++;
          NewInput = true;
          score = score + 10 * multiplayer;
          colorUpdate5 = 1;
        } else {
          Press2N.setVolume(0.05);
          Press2N.play();
          GoodNotes++;
          NewInput = true;
          score = score + 5 * multiplayer;
          colorUpdate5 = 2;
        }
      } else {
        Press7WW.setVolume(1);
        Press7WW.play();
        LostNotes++;
        NewInput = false;
        if (score != 0) {
          score = score - 5;
        }
        colorUpdate5 = 3;
      }
      
      if (PreviousInput == true && NewInput == true && (keyIsPressed && key == "l" || key == "λ")) {
        streakF = true;
        Streak++;
        multiplayer = 2;
    } else if (PreviousInput == false || NewInput == false && (keyIsPressed && key == "l" || key == "λ")) {
        streakF = false;
        multiplayer = 1;
      if (BestStreak >= Streak) {
        Streak = 1;
       } else {
        BestStreak = Streak;
        Streak = 1; 
       }
    }
      
    } else if (!keyIsPressed && (key !== "l" || key !== "λ")) {
      lKeyPressed = false;
    }
//----------------------------------------------------------------------//
    
    if (Math.floor(elapsedTime) % 1 === 0) {
      console.log("Timer: " + Math.floor(elapsedTime) + " seconds");
    }
  }
  
if ((Math.floor(elapsedTime) < 130)) {
  if (streakF) {
    if (FF == false) {
      Fire.setVolume(0.2);
      Fire.play();
      FF = true;
    }
    if (OF == false) {
      image(OnFire, 0, 0);
    }
  }
      
  if (score >= 250) {
    if (STR1 == false) {
      Star5.setVolume(0.5);
      Star5.play();
      STR1 = true;
    }
    image(star5, 18, 80, 185, 35);
    StarsV = 5;
    KeyIcon = 5;
  } else if (score >= 200) {
    if (STR2 == false) {
      Star4.setVolume(0.3);
      Star4.play();
      STR2 = true;
    }
    image(star4, 18, 80, 185, 35);
    StarsV = 4;
    KeyIcon = 4;
  } else if (score >= 150) {
    if (STR3 == false) {
      Star3.setVolume(0.3);
      Star3.play();
      STR3 = true;
    }
    image(star3, 18, 80, 185, 35);
    StarsV = 3;
    KeyIcon = 3;
  } else if (score >= 100) {
    if (STR4 == false) {
      Star2.setVolume(0.3);
      Star2.play();
      STR4 = true;
    }
    image(star2, 18, 80, 185, 35);
    StarsV = 2;
    KeyIcon = 2;
  } else if (score >= 50) {
    if (STR5 == false) {
      Star1.setVolume(0.3);
      Star1.play();
      STR5 = true;
    }
    image(star1, 18, 80, 185, 35);
    StarsV = 1;
    KeyIcon = 1;
  } else {
    image(star0, 18, 80, 185, 35);
    StarsV = 0;
    KeyIcon = 0;
  }
    
    if ((Math.floor(elapsedTime)) >= 125) {
      if (TM1 == false) {
        Time6_7.setVolume(0.9);
        Time6_7.play();
        TM1 = true;
      }
    image(bar6, -35, 30, 290, 65);
    Bar = 6;
  } else if ((Math.floor(elapsedTime)) >= 100) {
    if (TM2 == false) {
      Time5_6.setVolume(0.9);
      Time5_6.play();
      TM2 = true;
    }
    image(bar5, -35, 30, 290, 65);
    Bar = 5;
  } else if ((Math.floor(elapsedTime)) >= 80) {
    if (TM3 == false) {
      Time4_5.setVolume(0.9);
      Time4_5.play();
      TM3 = true;
    }
    image(bar4, -35, 30, 290, 65);
    Bar = 4;
  } else if ((Math.floor(elapsedTime)) >= 60) {
    if (TM4 == false) {
      Time3_4.setVolume(0.9);
      Time3_4.play();
      TM4 = true;
    }
    image(bar3, -35, 30, 290, 65);
    Bar = 3;
  } else if ((Math.floor(elapsedTime)) >= 40) {
    if (TM5 == false) {
      Time2_3.setVolume(0.9);
      Time2_3.play();
      TM5 = true;
    }
    image(bar2, -35, 30, 290, 65);
    Bar = 2;
  } else if ((Math.floor(elapsedTime)) >= 20) {
    if (TM6 == false) {
      Time1_2.setVolume(0.9);
      Time1_2.play();
      TM6 = true;
    }
    image(bar1, -35, 30, 290, 65);
    Bar = 1;
  } else { 
    image(bar0, -35, 30, 290, 65);
    Bar = 0;
    }
}
  
if ((Math.floor(elapsedTime)) >= 129) {
  if (FRM4 == false) {
    setTimeout(function() {
      //Frame4_5.setVolume(0.2);
      //Frame4_5.play();
    }, 800);
    FRM4 = true; 
  }
}

  if ((Math.floor(elapsedTime)) >= 129 && statsImageVisible) { 
    
    MenuBar1Img.hide();
    MenuBar2Img.hide();
    pauseButtonImg.hide();
    exitButtonImg.hide();
    
    isPaused = true;
    statsImageVisible = true;
    pauseButtonImg.hide();
    fill(0, 0, 0, 150); 
    noStroke();
    rect(0, 0, canvasWidth, canvasHeight);
    
    if (StarsV >= 3) {

      if (Stage == 11) {
        StageF1 = 125;
        localStorage.setItem('Complete1', StageF1);
      } else if (Stage == 22) {
        StageF2 = 125;
        localStorage.setItem('Complete2', StageF2);
      } else if (Stage == 33) {
        StageF3 = 125;
        localStorage.setItem('Complete3', StageF3);
      } else if (Stage == 44) {
        StageF4 = 125;
        localStorage.setItem('Complete4', StageF4);
      } else if (Stage == 55) {
        StageF5 = 125;
        localStorage.setItem('Complete5', StageF5);
      } else if (Stage == 66) {
        StageF6 = 125;
        localStorage.setItem('Complete6', StageF6);
      } else if (Stage == 77) {
        StageF7 = 125;
        localStorage.setItem('Complete7', StageF7);
      }
      
      // Display Victory Text
      victoryTextVisible = true;
      image(messageImageV, width / 2 - 250, height / 2 - 510, 500, 500);
      image(statsImageV, width / 2 - 200, height / 2 - 200, 400, 400);
      if (Won == false && flagCh == true) {
        ChestImg.show();
        flagCh = false;
      }
      
      fill(0, 0, 0, 40); 
      noStroke();
      rect(0, 0, canvasWidth, canvasHeight);
    } else {
      
      // Display Defeat Text
      defeatTextVisible = true;
      image(statsImageF, width / 2 - 200, height / 2 - 200, 400, 400);
      
      fill(0, 0, 0, 70);
      noStroke();
      rect(0, 0, canvasWidth, canvasHeight);
      
      image(messageImageF, width / 2 - 250, height / 2 - 510, 500, 500);
    }
    
    pauseButtonImg.style('pointer-events', 'none');
    
    textSize(28);
    if (score >= 150) {
      fill(240);
    } else {
      fill(200);
    }
    noStroke();
    textAlign(CENTER);
    text("Stats ", width / 2, height / 2 - 95);

    textSize(18);
    text("Accurate Notes: " + GoodNotes, width / 2, height / 2 - 50);
    text("Precise Notes: " + PerfectNotes, width / 2, height / 2 - 20);
    text("Missed Notes: " + LostNotes, width / 2, height / 2 + 10);
    text("Highest Streak: " + BestStreak, width / 2, height / 2 + 40);
    
    if (statsImageVisible) {
      if (score >= 300) {
        image(Grade7, (width - 150) / 2, 430, 150, 150);
      } else if (score >= 250) {
        image(Grade6, (width - 150) / 2, 430, 150, 150);
      } else if (score >= 200) {
        image(Grade5, (width - 150) / 2, 430, 150, 150);
      } else if (score >= 150) {
        image(Grade4, (width - 150) / 2, 430, 150, 150);
      } else if (score >= 100) {
        image(Grade3, (width - 150) / 2, 430, 150, 150);
      } else if (score >= 50) {
        image(Grade2, (width - 150) / 2, 430, 150, 150);
      } else {
        image(Grade1, (width - 150) / 2, 430, 150, 150);
      }
    }
    
    if (
        mouseX > width / 2 - 200 &&
        mouseX < width / 2 + 200 &&
        mouseY > height / 2 - 200 &&
        mouseY < height / 2 + 200 &&
        mouseIsPressed
      ) {
        if (RR == false) {
          Rewind.setVolume(0.6);
          Rewind.play();
          RR = true;
        }
        setTimeout(function() {
          location.reload();
        }, 1400);
        //exitButton1.hide();
        //exitButton2.hide();
        //statsImageVisible = false;
        //elapsedTime = 0;
        //pauseButtonImg.show();
        //pauseButtonImg.style('pointer-events', 'auto');
      }
  }

  textSize(28);
  if (score >= 150 && statsImageVisible) {
    fill(50, 111, 168, 120);
  } else {
    fill(169, 135, 255, 120);
  }
  stroke(5);  
  textAlign(LEFT);
  strokeWeight(2); 
  text("Score: " + score, 25, 38);

  if (isPaused) {
    if (countingDown) {
      if (millis() - countdownTimestamp >= countdownInterval) {
        if (countdown > 1) {
          countdownText = countdown - 1;
          countdownTimestamp = millis();
          countdown--;
        } else if (countdown === 1 && !showGO) {
          countdownText = "GO";
          showGO = true;
          countdownTimestamp = millis();
          countdown--;
        } else if (countdown === 0 && millis() - countdownTimestamp >= countdownInterval) {
          countingDown = false;
          if (resumeAfterCountdown) {
            isPaused = false;
            resumeAfterCountdown = false;
            startTime = millis() - pausedTime; // Resume to the previous elapsed time
            elapsedTime = prevElapsedTime; // Set elapsedTime to the previous value
          }
        }
      }

      textSize(78);
      fill(225);
      let textWidthValue = textWidth(countdownText);
      text(countdownText, width / 2 - textWidthValue / 2, height / 2);
    } else {
        if (!statsImageVisible) {
          textSize(32);
          fill(225);
          text("Paused", width / 2 - 50, height / 2);
        }
    }
    return;
  }
  
  // Check for scheduled spawns
  for (let i = 0; i < Spawns.length; i++) {
    let spawn = Spawns[i];
    if ((Math.floor(elapsedTime)) >= spawn.spawnTime) {
      initializeMovingNote1(spawn.lineX);
      // Increment the line counter
      lineCounters[spawn.lineX - 1]++;
      // Remove the spawn entry to avoid repeated spawning
      Spawns.splice(i, 1);
      i--; // Adjust the loop counter since the array length has changed
    }
  }

  // Update and draw each moving image
  for (let i = 0; i < movingNote1.length; i++) {
    let currentMovingNote1 = movingNote1[i];

    // Update moving image properties based on speed variables
    currentMovingNote1.x += currentMovingNote1.moveSpeedX;
    currentMovingNote1.y += currentMovingNote1.moveSpeedY;
    currentMovingNote1.sizeX += currentMovingNote1.sizeChangeSpeedX;
    currentMovingNote1.sizeY += currentMovingNote1.sizeChangeSpeedY;

    // Check if the moving image has reached a certain y-coordinate
    let disappearY = 650; // Adjust the y-coordinate where the notes should disappear
    if (currentMovingNote1.y > disappearY) {
      if (miss == false) {
        //Press7WW.setVolume(1);
        //Press7WW.play();
        miss = true;
      }
      currentMovingNote1.visible = false;
    }

    // Draw the moving image only if it's visible
    if (currentMovingNote1.visible) {
      image(
        movingNote1Image,
        currentMovingNote1.x,
        currentMovingNote1.y,
        currentMovingNote1.sizeX,
        currentMovingNote1.sizeY
      );
    }
  }
}

function open() {
  ChestOpen.setVolume(0.5);
  ChestOpen.play();
  ChestImg.hide();
  KeyRing.show();
}

function claim() {
  Equip.setVolume(1);
  Equip.play();
  KeyRing.hide();
  Won = true;
}