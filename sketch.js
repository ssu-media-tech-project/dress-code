// sketch.js - 메인 게임 파일 (P5.js)

// 이미지 변수들
let seasonImages = {};
let 여자마네킹 = null;
let 남자마네킹 = null;
let logoImage = null;
let selectSeasonImage = null;
let backgroundImage = null;
let closetImage = null;

// 레트로 배경 패턴 위치 (고정)
let retroPattern = [];

function preload() {
  // 계절 배경 이미지 로드
  seasonImages.spring = loadImage("image/spring.png");
  seasonImages.summer = loadImage("image/summer.png");
  seasonImages.fall = loadImage("image/fall.png");
  seasonImages.winter = loadImage("image/winter.png");

  // 마네킹 이미지 로드
  여자마네킹 = loadImage("image/마네킹여자.png");
  남자마네킹 = loadImage("image/남자마네킹.png");

  // UI 이미지 로드
  logoImage = loadImage("image/logo2.png");
  selectSeasonImage = loadImage("image/select-season.png");
  backgroundImage = loadImage("image/background.png");
  closetImage = loadImage("image/closet.png");

  // 옷 이미지 로드
  loadClothImages();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // 게임 초기화
  initializeGame();

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
      let loadingProgress = drawLogo(logoImage, loadingStartTime);
      if (loadingProgress >= 1) {
        gameState = "seasonSelect";
      }
      break;
    case "seasonSelect":
      drawSeasonSelection(backgroundImage, selectSeasonImage);
      break;
    case "sexSelect":
      drawSexSelection(backgroundImage);
      break;
    case "game":
      if (showGameOver) {
        let buttonInfo = drawGameOver(logoImage);
        // 다시 하기 버튼 클릭 확인
        if (mouseIsPressed && 
            mouseX > buttonInfo.btnX && 
            mouseX < buttonInfo.btnX + buttonInfo.btnWidth &&
            mouseY > buttonInfo.btnY && 
            mouseY < buttonInfo.btnY + buttonInfo.btnHeight) {
          showGameOver = false;
          gameState = "seasonSelect";
          initializeGame();
        }
      } else {
        drawGame(seasonImages, 여자마네킹, 남자마네킹);
      }
      break;
  }
}

function mousePressed() {
  // 게임 화면에서의 클릭 처리
  if (gameState === "game") {
    handleGameClicks();
  } else if (gameState === "seasonSelect") {
    handleSeasonSelection();
  } else if (gameState === "sexSelect") {
    handleSexSelection();
  }
}

function handleGameClicks() {
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
      restartGame();
      return;
    }
  }

  // 옷 아이템 클릭 처리
  if (!isGameCompleted) {
    handleClothesClicks();
  }
}

function handleModalClicks() {
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
    selectedTab = "top";
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

  // 탭 클릭 처리
  handleTabClicks(modalX, modalY, modalWidth);

  // 옷 선택 클릭 처리
  handleClothesSelection(modalX, modalY, modalWidth, modalHeight);
}

function handleTabClicks(modalX, modalY, modalWidth) {
  let categories = [
    { name: "상의", key: "top" },
    { name: "하의", key: "bottom" },
    { name: "신발", key: "shoes" },
  ];
  let tabHeight = 50;
  let tabY = modalY + 100;
  let tabWidth = modalWidth / categories.length;
  let tabStartX = modalX;

  for (let i = 0; i < categories.length; i++) {
    let tabX = tabStartX + i * tabWidth;
    if (
      mouseX > tabX &&
      mouseX < tabX + tabWidth &&
      mouseY > tabY &&
      mouseY < tabY + tabHeight
    ) {
      selectedTab = categories[i].key;
      return;
    }
  }
}

function handleClothesSelection(modalX, modalY, modalWidth, modalHeight) {
  let categories = [
    { name: "상의", key: "top" },
    { name: "하의", key: "bottom" },
    { name: "신발", key: "shoes" },
  ];

  let tabHeight = 50;
  let contentY = modalY + 100 + tabHeight + 20;
  let currentCategory = categories.find((cat) => cat.key === selectedTab);

  if (currentCategory) {
    let categoryClothes = availableClothes.filter(
      (cloth) =>
        cloth.category === currentCategory.key && cloth.gender === selectedSex
    );

    let itemWidth = 120;
    let itemHeight = 100;
    let itemSpacing = 20;
    let startX = modalX + 30;
    let itemsPerRow = Math.floor((modalWidth - 60) / (itemWidth + itemSpacing));
    let row = 0;
    let col = 0;

    for (let i = 0; i < categoryClothes.length; i++) {
      let itemX = startX + col * (itemWidth + itemSpacing);
      let itemY = contentY + row * (itemHeight + itemSpacing);
      let cloth = categoryClothes[i];

      if (
        mouseX > itemX &&
        mouseX < itemX + itemWidth &&
        mouseY > itemY &&
        mouseY < itemY + itemHeight
      ) {
        // 이미 선택된 옷인지 확인
        let isAlreadySelected = selectedClothes.some((c) => c.id === cloth.id);

        if (isAlreadySelected) {
          // 이미 선택된 옷이면 선택 취소
          selectedClothes = selectedClothes.filter((c) => c.id !== cloth.id);
        } else {
          // 기존 같은 카테고리 옷 제거하고 새로 선택
          selectedClothes = selectedClothes.filter(
            (c) => c.category !== currentCategory.key
          );
          selectedClothes.push(cloth);
        }
        break;
      }

      // 다음 위치 계산
      col++;
      if (col >= itemsPerRow) {
        col = 0;
        row++;
      }
    }
  }
}

function handleSeasonSelection() {
  let buttonWidth = 180;
  let buttonHeight = 100;
  let spacing = 220;
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
}

function handleSexSelection() {
  let buttonWidth = 180;
  let buttonHeight = 100;
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

// 옷 아이템 클릭 처리
function handleClothesClicks() {
  // 현재 성별에 맞는 모든 옷들 필터링 (계절 상관없이)
  let clothesToShow = availableClothes.filter(
    cloth => cloth.gender === selectedSex
  );

  for (let cloth of clothesToShow) {
    if (cloth._displayInfo) {
      let { x, y, width, height } = cloth._displayInfo;
      
      if (mouseX > x && mouseX < x + width &&
          mouseY > y && mouseY < y + height) {
        
        // 이미 입고 있는 옷인지 확인
        let isAlreadyWorn = appliedClothes.some(c => c.id === cloth.id);
        
        if (isAlreadyWorn) {
          // 이미 입고 있으면 벗기기
          appliedClothes = appliedClothes.filter(c => c.id !== cloth.id);
        } else {
          // 같은 카테고리의 기존 옷 제거 후 새로운 옷 입히기
          appliedClothes = appliedClothes.filter(c => c.category !== cloth.category);
          appliedClothes.push(cloth);
        }
        
        // 모든 카테고리에 옷을 입었는지 확인 (신발 제외)
        let hasTop = appliedClothes.some(c => c.category === "top");
        let hasBottom = appliedClothes.some(c => c.category === "bottom");
        
        if (hasTop && hasBottom) {
          // 모든 옷을 입었으면 점수 계산
          setTimeout(() => {
            let result = calculateClothingScore(appliedClothes, selectedSeason);
            let message = generateScoreMessage(
              result.score,
              result.correctCount,
              result.wrongCount,
              appliedClothes
            );
            
            gameScore += result.score;
            scoreMessage = message;
            showScoreResult = true;
            isGameCompleted = true;
            
            // 3초 후 게임 종료 화면 표시
            setTimeout(() => {
              showScoreResult = false;
              showGameOver = true;
            }, 3000);
          }, 500); // 0.5초 후 점수 계산 (옷이 완전히 입혀진 후)
        }
        
        break;
      }
    }
  }
}
