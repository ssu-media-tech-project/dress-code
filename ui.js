// ui.js - UI 그리기 관련 함수들

// 시즌 컬러 설정
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

// 로고 화면 그리기
function drawLogo(logoImage, loadingStartTime) {
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
  let loadingProgress = min(elapsed / 2000, 1); // 2초 = 2000ms

  // 로딩 바 채우기
  fill(255, 192, 203); // 핑크색
  rect(barX, barY, barWidth * loadingProgress, barHeight, 10);

  // 로딩 바 테두리
  noFill();
  stroke(255, 182, 193);
  strokeWeight(2);
  rect(barX, barY, barWidth, barHeight, 10);

  return loadingProgress;
}

// 계절 선택 화면 그리기
function drawSeasonSelection(backgroundImage, selectSeasonImage) {
  // 배경 이미지 표시
  drawBackgroundImage(backgroundImage);

  // "계절을 선택하세요" 이미지 표시
  if (selectSeasonImage && selectSeasonImage.width > 0) {
    let imgWidth = (width * 0.5) / 3;
    let imgHeight = (selectSeasonImage.height / selectSeasonImage.width) * imgWidth;
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

    drawSeasonButton(x, buttonY, buttonWidth, buttonHeight, season, seasonNames[i]);
  }
}

// 성별 선택 화면 그리기
function drawSexSelection(backgroundImage) {
  // 배경 이미지 표시
  drawBackgroundImage(backgroundImage);

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

    drawSexButton(x, buttonY, buttonWidth, buttonHeight, sex, sexNames[i]);
  }

  textSize(16);
  fill(100);
  text("스페이스바를 눌러 계절 선택으로 돌아가기", width / 2, height - 100);
}

// 배경 이미지 그리기 함수
function drawBackgroundImage(backgroundImage) {
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
}

// 계절 버튼 그리기
function drawSeasonButton(x, y, width, height, season, seasonName) {
  // 호버 감지
  let isHovered = 
    mouseX > x - width / 2 &&
    mouseX < x + width / 2 &&
    mouseY > y - height / 2 &&
    mouseY < y + height / 2;

  // 호버 시 크기 및 위치 조정
  let hoverScale = isHovered ? 1.15 : 1.0;
  let hoverOffsetY = isHovered ? -8 : 0;
  let hoverShadow = isHovered ? 8 : 4;
  let hoverAlpha = isHovered ? 60 : 40;

  let currentWidth = width * hoverScale;
  let currentHeight = height * hoverScale;
  let currentX = x;
  let currentY = y + hoverOffsetY;

  // 버튼 그림자 효과
  fill(0, 0, 0, hoverAlpha);
  noStroke();
  rect(
    currentX - currentWidth / 2 + hoverShadow,
    currentY - currentHeight / 2 + hoverShadow,
    currentWidth,
    currentHeight,
    25
  );

  // 버튼 배경 (그라데이션 효과)
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

  // 버튼 테두리
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

  // 텍스트
  noStroke();
  fill(255, 255, 255);
  textSize(32 * hoverScale);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(seasonName, currentX, currentY);
  textStyle(NORMAL);
}

// 성별 버튼 그리기
function drawSexButton(x, y, width, height, sex, sexName) {
  // 호버 감지
  let isHovered =
    mouseX > x - width / 2 &&
    mouseX < x + width / 2 &&
    mouseY > y - height / 2 &&
    mouseY < y + height / 2;

  // 호버 시 크기 및 위치 조정
  let hoverScale = isHovered ? 1.15 : 1.0;
  let hoverOffsetY = isHovered ? -8 : 0;
  let hoverShadow = isHovered ? 8 : 4;
  let hoverAlpha = isHovered ? 60 : 40;

  let currentWidth = width * hoverScale;
  let currentHeight = height * hoverScale;
  let currentX = x;
  let currentY = y + hoverOffsetY;

  // 버튼 그림자 효과
  fill(0, 0, 0, hoverAlpha);
  noStroke();
  rect(
    currentX - currentWidth / 2 + hoverShadow,
    currentY - currentHeight / 2 + hoverShadow,
    currentWidth,
    currentHeight,
    25
  );

  // 버튼 배경
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

  // 버튼 테두리
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

  // 텍스트
  noStroke();
  fill(255, 255, 255);
  textSize(32 * hoverScale);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(sexName, currentX, currentY);
  textStyle(NORMAL);
}

// 장롱 아이콘 그리기
function drawWardrobeIcon(isGameCompleted) {
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

  // 배경 원
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

  // 장롱 문
  fill(255, 255, 255);
  rect(iconX - 18 * scale, iconY - 25 * scale, 36 * scale, 50 * scale, 5);

  // 손잡이
  fill(200, 200, 200);
  ellipse(iconX + 12 * scale, iconY, 10 * scale, 10 * scale);
}

// 점수 결과 표시
function drawScoreResult(scoreMessage) {
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

// 선택한 옷 조합 미리보기 (하단)
function drawSelectedClothesPreview(selectedClothes) {
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

    // 옷 이미지 표시 (있는 경우)
    if (cloth.imageId && clothImages[cloth.category] && clothImages[cloth.category][cloth.imageId]) {
      let clothImage = clothImages[cloth.category][cloth.imageId];
      let imgSize = itemSize - 10;
      let imgX = itemX - imgSize / 2;
      let imgY = previewY + 35;
      
      image(clothImage, imgX, imgY, imgSize, imgSize);
    }
  }
}