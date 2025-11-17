let gameState = "logo";
let selectedSeason = "";
let selectedSex = "";

let seasonImages = {};

let 여자마네킹 = null;
let 남자마네킹 = null;
let logoImage = null;

// 레트로 배경 패턴 위치 (고정)
let retroPattern = [];

// 로딩 관련 변수
let loadingProgress = 0;
let loadingStartTime = 0;

const seasonColors = {
  spring: { bg: "#E8F5E8", btn: "#90EE90", text: "#2E7D32" },
  summer: { bg: "#FFF8DC", btn: "#FFD700", text: "#FF6B35" },
  fall: { bg: "#FFF4E6", btn: "#FF8C00", text: "#8B4513" },
  winter: { bg: "#F0F8FF", btn: "#87CEEB", text: "#4682B4" },
};

const sexColors = {
  male: { btn: "#4A90E2", text: "#1E3A5F" },
  female: { btn: "#FF69B4", text: "#8B008B" },
};

function preload() {
  seasonImages.spring = loadImage("image/spring.png");
  seasonImages.summer = loadImage("image/summer.png");
  seasonImages.fall = loadImage("image/fall.png");
  seasonImages.winter = loadImage("image/winter.png");

  여자마네킹 = loadImage("image/마네킹여자.png");
  남자마네킹 = loadImage("image/남자마네킹.png");
  logoImage = loadImage("image/logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // 로딩 시작 시간 기록
  loadingStartTime = millis();

  // 레트로 배경 패턴 생성 (한 번만)
  randomSeed(42); // 고정된 시드로 항상 같은 패턴
  retroPattern = [];
  for (let i = 0; i < 20; i++) {
    retroPattern.push({
      x: random(width),
      y: random(height),
      size: random(50, 150),
      alpha: 30,
    });
  }
  for (let i = 0; i < 15; i++) {
    retroPattern.push({
      x: random(width),
      y: random(height),
      size: random(30, 100),
      alpha: 20,
    });
  }
}

function draw() {
  switch (gameState) {
    case "logo":
      drawLogo();
      break;
    case "seasonSelect":
      drawSeasonSelection();
      break;
    case "sexSelect":
      selectSex();
      break;
    case "game":
      drawGame();
      break;
  }
}

function drawLogo() {
  // 흰색 배경
  background(255);

  // 로고 이미지 표시
  if (logoImage && logoImage.width > 0) {
    let logoWidth = width * 0.4;
    let logoHeight = (logoImage.height / logoImage.width) * logoWidth;
    let logoX = (width - logoWidth) / 2;
    let logoY = height * 0.05;

    image(logoImage, logoX, logoY, logoWidth, logoHeight);
  }

  // 로딩 바
  let barWidth = width * 0.5;
  let barHeight = 20;
  let barX = (width - barWidth) / 2;
  let barY = height * 0.75;

  // 로딩 바 배경
  fill(100);
  noStroke();
  rect(barX, barY, barWidth, barHeight, 10);

  // 로딩 진행률 계산 (2초 동안 채워짐)
  let elapsed = millis() - loadingStartTime;
  loadingProgress = min(elapsed / 2000, 1); // 2초 = 2000ms

  // 로딩 바 채우기
  fill(255, 192, 203); // 핑크색
  rect(barX, barY, barWidth * loadingProgress, barHeight, 10);

  // 로딩 바 테두리
  noFill();
  stroke(255, 182, 193);
  strokeWeight(2);
  rect(barX, barY, barWidth, barHeight, 10);

  // 로딩 완료 시 계절 선택 화면으로 전환
  if (loadingProgress >= 1) {
    gameState = "seasonSelect";
  }
}

function drawSeasonSelection() {
  // 레트로 핑크 그라데이션 배경
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(
      color(255, 192, 203), // 핑크
      color(255, 182, 193), // 라이트 핑크
      inter
    );
    stroke(c);
    line(0, i, width, i);
  }

  // 레트로 패턴 추가 (고정된 원형)
  noStroke();
  for (let i = 0; i < retroPattern.length; i++) {
    let p = retroPattern[i];
    if (i < 20) {
      fill(255, 182, 193, p.alpha);
    } else {
      fill(255, 192, 203, p.alpha);
    }
    ellipse(p.x, p.y, p.size, p.size);
  }

  textSize(48);
  fill(139, 69, 19); // 갈색 텍스트로 레트로 느낌
  stroke(255, 255, 255);
  strokeWeight(2);
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

function selectSex() {
  background(240);

  textSize(48);
  fill(50);
  text("성별을 선택하세요", width / 2, height / 6);

  let buttonWidth = 200;
  let buttonHeight = 120;
  let spacing = 250;
  let startX = width / 2 - spacing * 0.5;
  let buttonY = height / 2;

  const sexes = ["male", "female"];
  const sexNames = ["남자", "여자"];

  for (let i = 0; i < sexes.length; i++) {
    let x = startX + i * spacing;
    let sex = sexes[i];

    fill(sexColors[sex].btn);
    stroke(50);
    strokeWeight(3);
    rect(
      x - buttonWidth / 2,
      buttonY - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      15
    );

    fill(sexColors[sex].text);
    textSize(24);
    text(sexNames[i], x, buttonY - 20);

    textSize(40);
    let icons = ["👨", "👩"];
    text(icons[i], x, buttonY + 20);
  }

  textSize(16);
  fill(100);
  text("스페이스바를 눌러 계절 선택으로 돌아가기", width / 2, height / 2 + 150);
}

function drawGame() {
  let season = selectedSeason;

  // 배경 설정
  background(seasonColors[season].bg);

  if (seasonImages[season] && seasonImages[season].width > 0) {
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
  }

  // 선택된 성별에 따라 마네킹을 화면 중앙에 배치 (가장 위에 표시)
  let currentMannequin = null;
  if (
    selectedSex === "male" &&
    남자마네킹 &&
    남자마네킹.width > 0 &&
    남자마네킹.height > 0
  ) {
    currentMannequin = 남자마네킹;
  } else if (
    selectedSex === "female" &&
    여자마네킹 &&
    여자마네킹.width > 0 &&
    여자마네킹.height > 0
  ) {
    currentMannequin = 여자마네킹;
  }

  if (currentMannequin) {
    let mannequinAspect = currentMannequin.width / currentMannequin.height;
    let screenAspect = width / height;
    let mannequinWidth, mannequinHeight, mannequinX, mannequinY;

    // 성별에 따라 크기 비율 설정
    let sizeRatio = selectedSex === "male" ? 0.4 : 0.1;

    if (mannequinAspect > screenAspect) {
      mannequinHeight = height * sizeRatio;
      mannequinWidth = mannequinHeight * mannequinAspect;
      mannequinX = (width - mannequinWidth) / 2;
      mannequinY = (height - mannequinHeight) / 2;
    } else {
      mannequinWidth = width * sizeRatio;
      mannequinHeight = mannequinWidth / mannequinAspect;
      mannequinX = (width - mannequinWidth) / 2;
      mannequinY = (height - mannequinHeight) / 2;
    }
    image(
      currentMannequin,
      mannequinX,
      mannequinY,
      mannequinWidth,
      mannequinHeight
    );
  }

  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(2);

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
        gameState = "sexSelect";
        break;
      }
    }
  } else if (gameState === "sexSelect") {
    let buttonWidth = 200;
    let buttonHeight = 120;
    let spacing = 250;
    let startX = width / 2 - spacing * 0.5;
    let buttonY = height / 2;

    const sexes = ["male", "female"];

    for (let i = 0; i < sexes.length; i++) {
      let x = startX + i * spacing;

      if (
        mouseX > x - buttonWidth / 2 &&
        mouseX < x + buttonWidth / 2 &&
        mouseY > buttonY - buttonHeight / 2 &&
        mouseY < buttonY + buttonHeight / 2
      ) {
        selectedSex = sexes[i];
        gameState = "game";
        break;
      }
    }
  }
}

function keyPressed() {
  if (key === " " && gameState === "game") {
    gameState = "seasonSelect";
    selectedSeason = "";
    selectedSex = "";
  } else if (key === " " && gameState === "sexSelect") {
    gameState = "seasonSelect";
    selectedSeason = "";
  }
}
