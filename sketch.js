let gameState = "seasonSelect";
let selectedSeason = "";

let seasonImages = {};

const seasonColors = {
  spring: { bg: "#E8F5E8", btn: "#90EE90", text: "#2E7D32" },
  summer: { bg: "#FFF8DC", btn: "#FFD700", text: "#FF6B35" },
  fall: { bg: "#FFF4E6", btn: "#FF8C00", text: "#8B4513" },
  winter: { bg: "#F0F8FF", btn: "#87CEEB", text: "#4682B4" },
};

function preload() {
  seasonImages.spring = loadImage("image/spring.png");
  seasonImages.summer = loadImage("image/summer.png");

  seasonImages.fall = loadImage("image/fall.png");
  seasonImages.winter = loadImage("image/winter.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (gameState === "seasonSelect") {
    drawSeasonSelection();
  } else if (gameState === "game") {
    drawGame();
  }
}

function drawSeasonSelection() {
  background(240);

  textSize(48);
  fill(50);
  text("계절을 선택하세요", width / 2, height / 6);

  let buttonWidth = 200;
  let buttonHeight = 120;
  let spacing = 250;
  let startX = width / 2 - spacing * 1.5;
  let buttonY = height / 2;

  const seasons = ["spring", "summer", "fall", "winter"];
  const seasonNames = ["봄", "여름", "가을", "겨울"];

  for (let i = 0; i < seasons.length; i++) {
    let x = startX + i * spacing;
    let season = seasons[i];

    fill(seasonColors[season].btn);
    stroke(50);
    strokeWeight(3);
    rect(
      x - buttonWidth / 2,
      buttonY - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      15
    );

    fill(seasonColors[season].text);
    textSize(24);
    text(seasonNames[i], x, buttonY - 20);

    textSize(40);
    let icons = ["🌸", "☀️", "🍂", "❄️"];
    text(icons[i], x, buttonY + 20);
  }
}

function drawGame() {
  let season = selectedSeason;

  if (seasonImages[season]) {
    let imgAspect = seasonImages[season].width / seasonImages[season].height;
    let screenAspect = width / height;

    if (imgAspect > screenAspect) {
      let scaledHeight = height;
      let scaledWidth = height * imgAspect;
      let offsetX = (width - scaledWidth) / 2;
      image(seasonImages[season], offsetX, 0, scaledWidth, scaledHeight);
    } else {
      let scaledWidth = width;
      let scaledHeight = width / imgAspect;
      let offsetY = (height - scaledHeight) / 2;
      image(seasonImages[season], 0, offsetY, scaledWidth, scaledHeight);
    }
  } else {
    background(seasonColors[season].bg);
  }

  fill(0, 0, 0, 100);
  rect(0, 0, width, height);

  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(2);
  text(
    `${
      selectedSeason === "spring"
        ? "봄"
        : selectedSeason === "summer"
        ? "여름"
        : selectedSeason === "fall"
        ? "가을"
        : "겨울"
    } 게임 시작!`,
    width / 2,
    height / 2
  );

  textSize(16);
  text("스페이스바를 눌러 계절 선택으로 돌아가기", width / 2, height / 2 + 50);
}

function mousePressed() {
  if (gameState === "seasonSelect") {
    let buttonWidth = 200;
    let buttonHeight = 120;
    let spacing = 250;
    let startX = width / 2 - spacing * 1.5;
    let buttonY = height / 2;

    const seasons = ["spring", "summer", "fall", "winter"];

    for (let i = 0; i < seasons.length; i++) {
      let x = startX + i * spacing;

      if (
        mouseX > x - buttonWidth / 2 &&
        mouseX < x + buttonWidth / 2 &&
        mouseY > buttonY - buttonHeight / 2 &&
        mouseY < buttonY + buttonHeight / 2
      ) {
        selectedSeason = seasons[i];
        gameState = "game";
        break;
      }
    }
  }
}

function keyPressed() {
  if (key === " " && gameState === "game") {
    gameState = "seasonSelect";
  }
}
