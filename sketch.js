let gameState = "logo";
let selectedSeason = "";
let selectedSex = "";

let seasonImages = {};

let 여자마네킹 = null;
let 남자마네킹 = null;
let logoImage = null;
let selectSeasonImage = null;
let backgroundImage = null;

// 레트로 배경 패턴 위치 (고정)
let retroPattern = [];

// 로딩 관련 변수
let loadingProgress = 0;
let loadingStartTime = 0;

// 옷 선택 모달 관련 변수
let isWardrobeOpen = false;
let selectedClothes = []; // 선택한 옷 목록
let availableClothes = []; // 사용 가능한 옷 목록 (예시 데이터)
let appliedClothes = []; // 마네킹에 입힌 옷 목록
let gameScore = 0; // 게임 점수
let showScoreResult = false; // 점수 결과 표시 여부
let scoreMessage = ""; // 점수 메시지
let isGameCompleted = false; // 게임 완료 여부

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
  selectSeasonImage = loadImage("image/select-season.png");
  backgroundImage = loadImage("image/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // 로딩 시작 시간 기록
  loadingStartTime = millis();

  // 옷 목록 초기화 (예시 데이터 - category와 season 포함)
  availableClothes = [
    // 봄 옷
    { id: 1, name: "봄 악세서리1", category: "accessory", season: "spring" },
    { id: 2, name: "봄 악세서리2", category: "accessory", season: "spring" },
    { id: 3, name: "봄 상의1", category: "top", season: "spring" },
    { id: 4, name: "봄 상의2", category: "top", season: "spring" },
    { id: 5, name: "봄 하의1", category: "skirt", season: "spring" },
    { id: 6, name: "봄 하의2", category: "skirt", season: "spring" },
    { id: 7, name: "봄 바지1", category: "pants", season: "spring" },
    { id: 8, name: "봄 바지2", category: "pants", season: "spring" },
    { id: 9, name: "봄 신발1", category: "shoes", season: "spring" },
    { id: 10, name: "봄 신발2", category: "shoes", season: "spring" },
    // 여름 옷
    { id: 11, name: "여름 악세서리1", category: "accessory", season: "summer" },
    { id: 12, name: "여름 악세서리2", category: "accessory", season: "summer" },
    { id: 13, name: "여름 상의1", category: "top", season: "summer" },
    { id: 14, name: "여름 상의2", category: "top", season: "summer" },
    { id: 15, name: "여름 하의1", category: "skirt", season: "summer" },
    { id: 16, name: "여름 하의2", category: "skirt", season: "summer" },
    { id: 17, name: "여름 바지1", category: "pants", season: "summer" },
    { id: 18, name: "여름 바지2", category: "pants", season: "summer" },
    { id: 19, name: "여름 신발1", category: "shoes", season: "summer" },
    { id: 20, name: "여름 신발2", category: "shoes", season: "summer" },
    // 가을 옷
    { id: 21, name: "가을 악세서리1", category: "accessory", season: "fall" },
    { id: 22, name: "가을 악세서리2", category: "accessory", season: "fall" },
    { id: 23, name: "가을 상의1", category: "top", season: "fall" },
    { id: 24, name: "가을 상의2", category: "top", season: "fall" },
    { id: 25, name: "가을 하의1", category: "skirt", season: "fall" },
    { id: 26, name: "가을 하의2", category: "skirt", season: "fall" },
    { id: 27, name: "가을 바지1", category: "pants", season: "fall" },
    { id: 28, name: "가을 바지2", category: "pants", season: "fall" },
    { id: 29, name: "가을 신발1", category: "shoes", season: "fall" },
    { id: 30, name: "가을 신발2", category: "shoes", season: "fall" },
    // 겨울 옷
    { id: 31, name: "겨울 악세서리1", category: "accessory", season: "winter" },
    { id: 32, name: "겨울 악세서리2", category: "accessory", season: "winter" },
    { id: 33, name: "겨울 상의1", category: "top", season: "winter" },
    { id: 34, name: "겨울 상의2", category: "top", season: "winter" },
    { id: 35, name: "겨울 하의1", category: "skirt", season: "winter" },
    { id: 36, name: "겨울 하의2", category: "skirt", season: "winter" },
    { id: 37, name: "겨울 바지1", category: "pants", season: "winter" },
    { id: 38, name: "겨울 바지2", category: "pants", season: "winter" },
    { id: 39, name: "겨울 신발1", category: "shoes", season: "winter" },
    { id: 40, name: "겨울 신발2", category: "shoes", season: "winter" },
  ];

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
  // 배경 이미지 표시
  if (backgroundImage && backgroundImage.width > 0) {
    let imgAspect = backgroundImage.width / backgroundImage.height;
    let screenAspect = width / height;

    if (imgAspect > screenAspect) {
      let scaledHeight = height;
      let scaledWidth = height * imgAspect;
      let offsetX = (width - scaledWidth) / 2;
      image(backgroundImage, offsetX, 0, scaledWidth, scaledHeight);
    } else {
      let scaledWidth = width;
      let scaledHeight = width / imgAspect;
      let offsetY = (height - scaledHeight) / 2;
      image(backgroundImage, 0, offsetY, scaledWidth, scaledHeight);
    }
  }

  // "계절을 선택하세요" 이미지 표시
  if (selectSeasonImage && selectSeasonImage.width > 0) {
    let imgWidth = (width * 0.5) / 3;
    let imgHeight =
      (selectSeasonImage.height / selectSeasonImage.width) * imgWidth;
    let imgX = (width - imgWidth) / 2;
    let imgY = height / 6;
    image(selectSeasonImage, imgX, imgY, imgWidth, imgHeight);
  }

  let buttonWidth = 180;
  let buttonHeight = 100;
  let spacing = 220;
  let startX = width / 2 - spacing * 1.5;
  let buttonY = height / 2;

  const seasons = ["spring", "summer", "fall", "winter"];
  const seasonNames = ["봄", "여름", "가을", "겨울"];

  for (let i = 0; i < seasons.length; i++) {
    let x = startX + i * spacing;
    let season = seasons[i];

    // 호버 감지
    let isHovered =
      mouseX > x - buttonWidth / 2 &&
      mouseX < x + buttonWidth / 2 &&
      mouseY > buttonY - buttonHeight / 2 &&
      mouseY < buttonY + buttonHeight / 2;

    // 호버 시 크기 및 위치 조정
    let hoverScale = isHovered ? 1.15 : 1.0;
    let hoverOffsetY = isHovered ? -8 : 0;
    let hoverShadow = isHovered ? 8 : 4;
    let hoverAlpha = isHovered ? 60 : 40;

    let currentWidth = buttonWidth * hoverScale;
    let currentHeight = buttonHeight * hoverScale;
    let currentX = x;
    let currentY = buttonY + hoverOffsetY;

    // 버튼 그림자 효과 (호버 시 더 강하게)
    fill(0, 0, 0, hoverAlpha);
    noStroke();
    rect(
      currentX - currentWidth / 2 + hoverShadow,
      currentY - currentHeight / 2 + hoverShadow,
      currentWidth,
      currentHeight,
      25
    );

    // 버튼 배경 (그라데이션 효과를 위한 상단/하단 색상)
    let btnColor = color(seasonColors[season].btn);
    let darkColor = color(
      red(btnColor) * 0.85,
      green(btnColor) * 0.85,
      blue(btnColor) * 0.85
    );

    // 호버 시 색상 밝게
    if (isHovered) {
      btnColor = color(
        min(255, red(btnColor) * 1.2),
        min(255, green(btnColor) * 1.2),
        min(255, blue(btnColor) * 1.2)
      );
      darkColor = color(
        min(255, red(darkColor) * 1.15),
        min(255, green(darkColor) * 1.15),
        min(255, blue(darkColor) * 1.15)
      );
    }

    // 상단 부분
    fill(btnColor);
    noStroke();
    rect(
      currentX - currentWidth / 2,
      currentY - currentHeight / 2,
      currentWidth,
      currentHeight / 2,
      25
    );

    // 하단 부분
    fill(darkColor);
    rect(
      currentX - currentWidth / 2,
      currentY,
      currentWidth,
      currentHeight / 2,
      25
    );

    // 버튼 테두리 (호버 시 더 밝게)
    noFill();
    stroke(255, 255, 255, isHovered ? 255 : 180);
    strokeWeight(isHovered ? 3 : 2.5);
    rect(
      currentX - currentWidth / 2,
      currentY - currentHeight / 2,
      currentWidth,
      currentHeight,
      25
    );

    // 텍스트 (중앙 배치, 호버 시 크기 증가)
    noStroke();
    fill(255, 255, 255);
    textSize(32 * hoverScale);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(seasonNames[i], currentX, currentY);
    textStyle(NORMAL);
  }
}

function selectSex() {
  // 배경 이미지 표시
  if (backgroundImage && backgroundImage.width > 0) {
    let imgAspect = backgroundImage.width / backgroundImage.height;
    let screenAspect = width / height;

    if (imgAspect > screenAspect) {
      let scaledHeight = height;
      let scaledWidth = height * imgAspect;
      let offsetX = (width - scaledWidth) / 2;
      image(backgroundImage, offsetX, 0, scaledWidth, scaledHeight);
    } else {
      let scaledWidth = width;
      let scaledHeight = width / imgAspect;
      let offsetY = (height - scaledHeight) / 2;
      image(backgroundImage, 0, offsetY, scaledWidth, scaledHeight);
    }
  }

  let buttonWidth = 180;
  let buttonHeight = 100;
  let spacing = 250;
  let startX = width / 2 - spacing * 0.5;
  let buttonY = height / 2;

  const sexes = ["male", "female"];
  const sexNames = ["남자", "여자"];

  for (let i = 0; i < sexes.length; i++) {
    let x = startX + i * spacing;
    let sex = sexes[i];

    // 호버 감지
    let isHovered =
      mouseX > x - buttonWidth / 2 &&
      mouseX < x + buttonWidth / 2 &&
      mouseY > buttonY - buttonHeight / 2 &&
      mouseY < buttonY + buttonHeight / 2;

    // 호버 시 크기 및 위치 조정
    let hoverScale = isHovered ? 1.15 : 1.0;
    let hoverOffsetY = isHovered ? -8 : 0;
    let hoverShadow = isHovered ? 8 : 4;
    let hoverAlpha = isHovered ? 60 : 40;

    let currentWidth = buttonWidth * hoverScale;
    let currentHeight = buttonHeight * hoverScale;
    let currentX = x;
    let currentY = buttonY + hoverOffsetY;

    // 버튼 그림자 효과 (호버 시 더 강하게)
    fill(0, 0, 0, hoverAlpha);
    noStroke();
    rect(
      currentX - currentWidth / 2 + hoverShadow,
      currentY - currentHeight / 2 + hoverShadow,
      currentWidth,
      currentHeight,
      25
    );

    // 버튼 배경 (그라데이션 효과를 위한 상단/하단 색상)
    let btnColor = color(sexColors[sex].btn);
    let darkColor = color(
      red(btnColor) * 0.85,
      green(btnColor) * 0.85,
      blue(btnColor) * 0.85
    );

    // 호버 시 색상 밝게
    if (isHovered) {
      btnColor = color(
        min(255, red(btnColor) * 1.2),
        min(255, green(btnColor) * 1.2),
        min(255, blue(btnColor) * 1.2)
      );
      darkColor = color(
        min(255, red(darkColor) * 1.15),
        min(255, green(darkColor) * 1.15),
        min(255, blue(darkColor) * 1.15)
      );
    }

    // 상단 부분
    fill(btnColor);
    noStroke();
    rect(
      currentX - currentWidth / 2,
      currentY - currentHeight / 2,
      currentWidth,
      currentHeight / 2,
      25
    );

    // 하단 부분
    fill(darkColor);
    rect(
      currentX - currentWidth / 2,
      currentY,
      currentWidth,
      currentHeight / 2,
      25
    );

    // 버튼 테두리 (호버 시 더 밝게)
    noFill();
    stroke(255, 255, 255, isHovered ? 255 : 180);
    strokeWeight(isHovered ? 3 : 2.5);
    rect(
      currentX - currentWidth / 2,
      currentY - currentHeight / 2,
      currentWidth,
      currentHeight,
      25
    );

    // 텍스트 (중앙 배치, 호버 시 크기 증가)
    noStroke();
    fill(255, 255, 255);
    textSize(32 * hoverScale);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(sexNames[i], currentX, currentY);
    textStyle(NORMAL);
  }

  textSize(16);
  fill(100);
  text("스페이스바를 눌러 계절 선택으로 돌아가기", width / 2, height - 100);
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

  // 장롱 아이콘 그리기 (왼쪽 상단) - 배경 위에 표시
  drawWardrobeIcon();

  // 하단에 선택한 옷 조합 표시
  if (selectedClothes.length > 0) {
    drawSelectedClothesPreview();
  }

  // 선택된 성별에 따라 마네킹을 화면 중앙에 배치
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
    let sizeRatio = selectedSex === "male" ? 0.15 : 0.1;

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

  // 점수 결과 표시 (마네킹 위에 표시)
  if (showScoreResult) {
    drawScoreResult();
  }

  // 게임 완료 후 다시 하기 버튼 표시
  if (isGameCompleted) {
    drawRetryButton();
  }

  // 모달이 열려있으면 모달 그리기 (항상 최상위 - 마지막에 그리기)
  if (isWardrobeOpen) {
    drawWardrobeModal();
  }

  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(2);

  textSize(16);
  text("스페이스바를 눌러 계절 선택으로 돌아가기", width / 2, height - 100);
}

// 장롱 아이콘 그리기
function drawWardrobeIcon() {
  // 게임이 완료되면 장롱 아이콘 숨기기
  if (isGameCompleted) {
    return;
  }

  let iconSize = 70;
  let iconX = 50;
  let iconY = 50;

  // 호버 감지
  let isHovered =
    mouseX > iconX - iconSize / 2 &&
    mouseX < iconX + iconSize / 2 &&
    mouseY > iconY - iconSize / 2 &&
    mouseY < iconY + iconSize / 2;

  let scale = isHovered ? 1.15 : 1.0;

  // 배경 원 (더 눈에 띄게)
  fill(255, 255, 255, 220);
  stroke(100, 100, 100);
  strokeWeight(3);
  ellipse(iconX, iconY, iconSize * scale + 10, iconSize * scale + 10);

  // 그림자
  fill(0, 0, 0, 60);
  noStroke();
  ellipse(iconX + 4, iconY + 4, iconSize * scale, iconSize * scale);

  // 장롱 아이콘 배경
  fill(139, 69, 19); // 갈색
  noStroke();
  ellipse(iconX, iconY, iconSize * scale, iconSize * scale);

  // 장롱 문 (흰색)
  fill(255, 255, 255);
  rect(iconX - 18 * scale, iconY - 25 * scale, 36 * scale, 50 * scale, 5);

  // 손잡이
  fill(200, 200, 200);
  ellipse(iconX + 12 * scale, iconY, 10 * scale, 10 * scale);
}

// 장롱 모달 그리기
function drawWardrobeModal() {
  // 모달 배경 (반투명 검은색)
  fill(0, 0, 0, 200);
  noStroke();
  rect(0, 0, width, height);

  // 모달 창
  let modalWidth = width * 0.8;
  let modalHeight = height * 0.7;
  let modalX = (width - modalWidth) / 2;
  let modalY = (height - modalHeight) / 2;

  // 모달 배경
  fill(255, 255, 255);
  stroke(200, 200, 200);
  strokeWeight(3);
  rect(modalX, modalY, modalWidth, modalHeight, 20);

  // 모달 제목
  fill(50);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("옷 선택", width / 2, modalY + 40);

  // 안내 문구 (계절 정보는 표시하지 않음)
  fill(100);
  textSize(16);
  text("각 카테고리에서 하나씩 선택하세요", width / 2, modalY + 80);

  // 카테고리별 옷 표시
  let categories = [
    { name: "악세서리", key: "accessory" },
    { name: "상의", key: "top" },
    { name: "하의", key: "skirt" },
    { name: "바지", key: "pants" },
    { name: "신발", key: "shoes" },
  ];

  let startY = modalY + 120;
  let categoryHeight = (modalHeight - 200) / 5;
  let itemWidth = 120;
  let itemHeight = 80;
  let itemSpacing = 20;

  for (let catIdx = 0; catIdx < categories.length; catIdx++) {
    let catY = startY + catIdx * categoryHeight;
    let category = categories[catIdx];

    // 카테고리 제목
    fill(80);
    textSize(20);
    textAlign(LEFT, CENTER);
    text(category.name, modalX + 30, catY + 20);

    // 모든 계절의 옷 표시 (계절 정보 숨김)
    let categoryClothes = availableClothes.filter(
      (cloth) => cloth.category === category.key
    );

    // 옷 아이템 표시
    let startX = modalX + 150;
    for (let i = 0; i < categoryClothes.length; i++) {
      let itemX = startX + i * (itemWidth + itemSpacing);
      let cloth = categoryClothes[i];

      // 선택된 옷인지 확인
      let isSelected = selectedClothes.some((c) => c.id === cloth.id);
      let isCategorySelected = selectedClothes.some(
        (c) => c.category === category.key
      );

      // 버튼 배경
      if (isSelected) {
        fill(100, 200, 255); // 선택됨 - 파란색
      } else if (isCategorySelected) {
        fill(200, 200, 200); // 다른 옷이 선택됨 - 회색
      } else {
        fill(240, 240, 240); // 선택 가능 - 연한 회색
      }

      stroke(150, 150, 150);
      strokeWeight(2);
      rect(itemX, catY, itemWidth, itemHeight, 10);

      // 옷 이름 (계절 정보 제거)
      fill(50);
      textSize(14);
      textAlign(CENTER, CENTER);
      let displayName = cloth.name.replace(/^(봄|여름|가을|겨울)\s/, ""); // 계절 이름 제거
      text(displayName, itemX + itemWidth / 2, catY + itemHeight / 2);
    }
  }

  // 확인 버튼
  let confirmBtnWidth = 150;
  let confirmBtnHeight = 50;
  let confirmBtnX = width / 2 - confirmBtnWidth / 2;
  let confirmBtnY = modalY + modalHeight - 80;

  // 확인 버튼 호버
  let isConfirmHovered =
    mouseX > confirmBtnX &&
    mouseX < confirmBtnX + confirmBtnWidth &&
    mouseY > confirmBtnY &&
    mouseY < confirmBtnY + confirmBtnHeight;

  fill(isConfirmHovered ? 100 : 80, 200, 100);
  stroke(50, 150, 50);
  strokeWeight(2);
  rect(confirmBtnX, confirmBtnY, confirmBtnWidth, confirmBtnHeight, 10);

  fill(255, 255, 255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(
    "확인",
    confirmBtnX + confirmBtnWidth / 2,
    confirmBtnY + confirmBtnHeight / 2
  );

  // 닫기 버튼 (X)
  let closeBtnSize = 40;
  let closeBtnX = modalX + modalWidth - closeBtnSize - 20;
  let closeBtnY = modalY + 20;

  let isCloseHovered =
    mouseX > closeBtnX &&
    mouseX < closeBtnX + closeBtnSize &&
    mouseY > closeBtnY &&
    mouseY < closeBtnY + closeBtnSize;

  fill(isCloseHovered ? 200 : 150, 150, 150);
  noStroke();
  ellipse(
    closeBtnX + closeBtnSize / 2,
    closeBtnY + closeBtnSize / 2,
    closeBtnSize,
    closeBtnSize
  );

  fill(255, 255, 255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("×", closeBtnX + closeBtnSize / 2, closeBtnY + closeBtnSize / 2);
}

// 선택한 옷 조합 미리보기 (하단)
function drawSelectedClothesPreview() {
  let previewY = height - 120;
  let previewHeight = 100;
  let itemSize = 60;
  let itemSpacing = 80;
  let startX = width / 2 - (selectedClothes.length * itemSpacing) / 2;

  // 배경
  fill(255, 255, 255, 200);
  stroke(200, 200, 200);
  strokeWeight(2);
  rect(0, previewY, width, previewHeight);

  // 제목
  fill(50);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("선택한 옷:", 20, previewY + 20);

  // 선택한 옷 표시
  for (let i = 0; i < selectedClothes.length; i++) {
    let cloth = selectedClothes[i];
    let itemX = startX + i * itemSpacing;

    // 옷 아이템 박스
    fill(240, 240, 240);
    stroke(150, 150, 150);
    strokeWeight(1);
    rect(itemX - itemSize / 2, previewY + 30, itemSize, itemSize, 5);

    // 옷 이름
    fill(50);
    textSize(12);
    textAlign(CENTER, CENTER);
    let displayName = cloth.name.replace(/^(봄|여름|가을|겨울)\s/, "");
    text(displayName, itemX, previewY + 60);
  }
}

// 점수 결과 표시
function drawScoreResult() {
  let resultY = height / 2 - 100;

  // 배경
  fill(255, 255, 255, 240);
  stroke(100, 200, 100);
  strokeWeight(3);
  rect(width / 2 - 250, resultY - 50, 500, 100, 20);

  // 메시지
  fill(50);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(scoreMessage, width / 2, resultY);
}

// 다시 하기 버튼 그리기
function drawRetryButton() {
  let btnWidth = 200;
  let btnHeight = 60;
  let btnX = width / 2 - btnWidth / 2;
  let btnY = height - 150;

  // 호버 감지
  let isHovered =
    mouseX > btnX &&
    mouseX < btnX + btnWidth &&
    mouseY > btnY &&
    mouseY < btnY + btnHeight;

  // 그림자
  fill(0, 0, 0, 40);
  noStroke();
  rect(btnX + 4, btnY + 4, btnWidth, btnHeight, 15);

  // 버튼 배경
  fill(isHovered ? 100 : 80, 200, 100);
  stroke(50, 150, 50);
  strokeWeight(3);
  rect(btnX, btnY, btnWidth, btnHeight, 15);

  // 버튼 텍스트
  fill(255, 255, 255);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("다시 하기", btnX + btnWidth / 2, btnY + btnHeight / 2);
  textStyle(NORMAL);
}

// 배열 섞기 함수
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 점수 계산 함수
function calculateScore() {
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  for (let cloth of selectedClothes) {
    if (cloth.season === selectedSeason) {
      score += 10; // 맞는 계절 옷: +10점
      correctCount++;
    } else {
      score -= 5; // 틀린 계절 옷: -5점
      wrongCount++;
    }
  }

  // 5개 모두 선택했는지 확인
  if (selectedClothes.length === 5) {
    if (correctCount === 5) {
      scoreMessage = "완벽해요! 모든 옷이 계절에 맞습니다! (+" + score + "점)";
    } else if (correctCount > wrongCount) {
      scoreMessage = "좋아요! 대부분 맞았습니다. (+" + score + "점)";
    } else {
      scoreMessage =
        "아쉽네요. 계절에 맞지 않는 옷이 있습니다. (" + score + "점)";
    }
  } else {
    scoreMessage = "모든 카테고리에서 옷을 선택해주세요.";
    return;
  }

  gameScore += score;
  showScoreResult = true;
  appliedClothes = [...selectedClothes];
  selectedClothes = []; // 선택 초기화
  isWardrobeOpen = false; // 모달 닫기
  isGameCompleted = true; // 게임 완료 표시

  // 3초 후 점수 메시지 숨기기
  setTimeout(() => {
    showScoreResult = false;
  }, 3000);
}

function mousePressed() {
  // 게임 화면에서의 클릭 처리
  if (gameState === "game") {
    // 다시 하기 버튼 클릭
    if (isGameCompleted) {
      let btnWidth = 200;
      let btnHeight = 60;
      let btnX = width / 2 - btnWidth / 2;
      let btnY = height - 150;

      if (
        mouseX > btnX &&
        mouseX < btnX + btnWidth &&
        mouseY > btnY &&
        mouseY < btnY + btnHeight
      ) {
        // 게임 초기화
        isGameCompleted = false;
        selectedClothes = [];
        appliedClothes = [];
        gameScore = 0;
        showScoreResult = false;
        isWardrobeOpen = false;
        return;
      }
    }

    // 게임이 완료되지 않았을 때만 장롱 아이콘 클릭 가능
    if (!isGameCompleted) {
      // 장롱 아이콘 클릭
      let iconSize = 70;
      let iconX = 50;
      let iconY = 50;
      if (
        mouseX > iconX - iconSize / 2 &&
        mouseX < iconX + iconSize / 2 &&
        mouseY > iconY - iconSize / 2 &&
        mouseY < iconY + iconSize / 2
      ) {
        isWardrobeOpen = !isWardrobeOpen;
        if (!isWardrobeOpen) {
          selectedClothes = []; // 모달 닫을 때 선택 초기화
        }
        return;
      }
    }

    // 모달이 열려있을 때
    if (isWardrobeOpen) {
      let modalWidth = width * 0.8;
      let modalHeight = height * 0.7;
      let modalX = (width - modalWidth) / 2;
      let modalY = (height - modalHeight) / 2;

      // 닫기 버튼 클릭
      let closeBtnSize = 40;
      let closeBtnX = modalX + modalWidth - closeBtnSize - 20;
      let closeBtnY = modalY + 20;
      if (
        mouseX > closeBtnX &&
        mouseX < closeBtnX + closeBtnSize &&
        mouseY > closeBtnY &&
        mouseY < closeBtnY + closeBtnSize
      ) {
        isWardrobeOpen = false;
        selectedClothes = [];
        return;
      }

      // 확인 버튼 클릭
      let confirmBtnWidth = 150;
      let confirmBtnHeight = 50;
      let confirmBtnX = width / 2 - confirmBtnWidth / 2;
      let confirmBtnY = modalY + modalHeight - 80;
      if (
        mouseX > confirmBtnX &&
        mouseX < confirmBtnX + confirmBtnWidth &&
        mouseY > confirmBtnY &&
        mouseY < confirmBtnY + confirmBtnHeight
      ) {
        calculateScore();
        return;
      }

      // 옷 선택 클릭
      let categories = [
        { name: "악세서리", key: "accessory" },
        { name: "상의", key: "top" },
        { name: "하의", key: "skirt" },
        { name: "바지", key: "pants" },
        { name: "신발", key: "shoes" },
      ];
      let startY = modalY + 120;
      let categoryHeight = (modalHeight - 200) / 5;
      let itemWidth = 120;
      let itemHeight = 80;
      let itemSpacing = 20;

      for (let catIdx = 0; catIdx < categories.length; catIdx++) {
        let catY = startY + catIdx * categoryHeight;
        let category = categories[catIdx];

        let categoryClothes = availableClothes.filter(
          (cloth) => cloth.category === category.key
        );

        let startX = modalX + 150;
        for (let i = 0; i < categoryClothes.length; i++) {
          let itemX = startX + i * (itemWidth + itemSpacing);
          let cloth = categoryClothes[i];

          // 이미 다른 옷이 선택된 카테고리는 클릭 불가
          let isCategorySelected = selectedClothes.some(
            (c) => c.category === category.key
          );

          if (
            !isCategorySelected &&
            mouseX > itemX &&
            mouseX < itemX + itemWidth &&
            mouseY > catY &&
            mouseY < catY + itemHeight
          ) {
            // 기존 카테고리 옷 제거하고 새로 선택
            selectedClothes = selectedClothes.filter(
              (c) => c.category !== category.key
            );
            selectedClothes.push(cloth);
            break;
          }
        }
      }
      return;
    }
  }

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
