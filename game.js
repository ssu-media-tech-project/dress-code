// game.js - 게임 로직 및 상태 관리

// 게임 상태 변수들
let gameState = "logo";
let selectedSeason = "";
let selectedSex = "";
let selectedClothes = [];
let appliedClothes = [];
let gameScore = 0;
let showScoreResult = false;
let scoreMessage = "";
let isGameCompleted = false;
let selectedTab = "top";

// 옷장 모달 관련 변수
let isWardrobeOpen = false;
let scrollOffset = 0;
let maxScrollOffset = 0;

// 로딩 관련 변수
let loadingStartTime = 0;

// 옷 목록
let availableClothes = [];

// 게임 초기화 함수
function initializeGame() {
  gameState = "logo";
  selectedSeason = "";
  selectedSex = "";
  selectedClothes = [];
  appliedClothes = [];
  gameScore = 0;
  showScoreResult = false;
  scoreMessage = "";
  isGameCompleted = false;
  selectedTab = "top";
  isWardrobeOpen = false;
  loadingStartTime = millis();

  // 옷 목록 초기화
  availableClothes = initializeClothes();
}

// 메인 게임 화면 그리기
function drawGame(seasonImages, 여자마네킹, 남자마네킹) {
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

  // 장롱 아이콘 그리기
  drawWardrobeIcon(isGameCompleted);

  // 하단에 선택한 옷 조합 표시
  if (selectedClothes.length > 0) {
    drawSelectedClothesPreview(selectedClothes);
  }

  // 마네킹 렌더링
  renderMannequin(여자마네킹, 남자마네킹);

  // 점수 결과 표시
  if (showScoreResult) {
    drawScoreResult(scoreMessage);
  }

  // 게임 완료 후 다시 하기 버튼 표시
  if (isGameCompleted) {
    drawRetryButton();
  }

  // 모달이 열려있으면 모달 그리기
  if (isWardrobeOpen) {
    drawWardrobeModal(closetImage);
  }

  textSize(16);
  fill(255);
  stroke(0);
  strokeWeight(2);
  text("스페이스바를 눌러 계절 선택으로 돌아가기", width / 2, height - 100);
}

// 마네킹 렌더링 함수
function renderMannequin(여자마네킹, 남자마네킹) {
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

    // 마네킹에 입힌 옷 이미지 렌더링 (하의 먼저, 상의 나중에)
    // 1. 먼저 하의(바지) 렌더링
    for (let cloth of appliedClothes) {
      if (
        cloth.category === "bottom" &&
        cloth.imageId &&
        clothImages[selectedSex] &&
        clothImages[selectedSex][cloth.category] &&
        clothImages[selectedSex][cloth.category][cloth.imageId]
      ) {
        let clothImage =
          clothImages[selectedSex][cloth.category][cloth.imageId];

        let clothY = mannequinY;
        let clothWidth = mannequinWidth;
        let clothHeight = mannequinHeight;
        let clothX = mannequinX;

        image(clothImage, clothX, clothY, clothWidth, clothHeight);
      }
    }

    // 2. 그 다음 상의 렌더링 (바지를 덮도록)
    for (let cloth of appliedClothes) {
      if (
        cloth.category === "top" &&
        cloth.imageId &&
        clothImages[selectedSex] &&
        clothImages[selectedSex][cloth.category] &&
        clothImages[selectedSex][cloth.category][cloth.imageId]
      ) {
        let clothImage =
          clothImages[selectedSex][cloth.category][cloth.imageId];

        let clothY = mannequinY;
        let clothWidth = mannequinWidth;
        let clothHeight = mannequinHeight;
        let clothX = mannequinX;

        image(clothImage, clothX, clothY, clothWidth, clothHeight);
      }
    }
  }
}

// 장롱 모달 그리기
function drawWardrobeModal(closetImage) {
  // 모달 배경 (반투명 검은색)
  fill(0, 0, 0, 200);
  noStroke();
  rect(0, 0, width, height);

  // 모달 창
  let modalWidth = width * 0.8;
  let modalHeight = height * 0.7;
  let modalX = (width - modalWidth) / 2;
  let modalY = (height - modalHeight) / 2;

  // 모달 배경 (closet 이미지 사용)
  if (closetImage && closetImage.width > 0) {
    // 옷장 이미지를 모달 크기에 맞게 조정하여 배경으로 사용
    image(closetImage, modalX, modalY, modalWidth, modalHeight);

    // 반투명 오버레이 (가독성을 위해)
    fill(255, 255, 255, 180);
    noStroke();
    rect(modalX, modalY, modalWidth, modalHeight, 20);
  } else {
    // 기본 흰색 배경 (이미지가 없을 경우)
    fill(255, 255, 255);
    stroke(200, 200, 200);
    strokeWeight(3);
    rect(modalX, modalY, modalWidth, modalHeight, 20);
  }

  // 모달 제목
  fill(50);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("옷 선택", width / 2, modalY + 40);

  // 안내 문구
  fill(100);
  textSize(16);
  text("각 카테고리에서 하나씩 선택하세요", width / 2, modalY + 80);

  // 카테고리 정의
  let categories = [
    { name: "상의", key: "top" },
    { name: "하의", key: "bottom" },
    { name: "신발", key: "shoes" },
  ];

  // 탭 영역 그리기
  drawModalTabs(categories, modalX, modalY, modalWidth);

  // 선택된 탭의 옷 표시
  drawClothesGrid(categories, modalX, modalY, modalWidth, modalHeight);

  // 확인 버튼
  drawConfirmButton(modalX, modalY, modalWidth, modalHeight);

  // 닫기 버튼
  drawCloseButton(modalX, modalY, modalWidth);
}

// 모달 탭 그리기
function drawModalTabs(categories, modalX, modalY, modalWidth) {
  let tabHeight = 50;
  let tabY = modalY + 100;
  let tabWidth = modalWidth / categories.length;
  let tabStartX = modalX;

  for (let i = 0; i < categories.length; i++) {
    let tabX = tabStartX + i * tabWidth;
    let category = categories[i];
    let isActive = selectedTab === category.key;

    // 탭 호버 감지
    let isTabHovered =
      mouseX > tabX &&
      mouseX < tabX + tabWidth &&
      mouseY > tabY &&
      mouseY < tabY + tabHeight;

    // 탭 배경
    if (isActive) {
      fill(100, 200, 255);
    } else if (isTabHovered) {
      fill(220, 240, 255);
    } else {
      fill(240, 240, 240);
    }

    stroke(150, 150, 150);
    strokeWeight(isActive ? 3 : 1);
    rect(tabX, tabY, tabWidth, tabHeight, 10);

    // 탭 텍스트
    fill(isActive ? 255 : 50);
    textSize(18);
    textStyle(isActive ? BOLD : NORMAL);
    textAlign(CENTER, CENTER);
    text(category.name, tabX + tabWidth / 2, tabY + tabHeight / 2);
    textStyle(NORMAL);
  }
}

// 옷 그리드 그리기
function drawClothesGrid(categories, modalX, modalY, modalWidth, modalHeight) {
  let tabHeight = 50;
  let contentY = modalY + 100 + tabHeight + 20;
  let contentHeight = modalHeight - 200; // 모달 상단과 하단 버튼 공간 제외
  let currentCategory = categories.find((cat) => cat.key === selectedTab);

  if (currentCategory) {
    // 현재 카테고리와 성별에 맞는 옷 필터링 (모든 계절 포함)
    let categoryClothes = availableClothes.filter(
      (cloth) =>
        cloth.category === currentCategory.key && cloth.gender === selectedSex
    );

    // 옷 아이템 표시
    let itemWidth = 120;
    let itemHeight = 100;
    let itemSpacing = 20;
    let startX = modalX + 30;
    let itemsPerRow = Math.floor((modalWidth - 80) / (itemWidth + itemSpacing)); // 스크롤바 공간 확보

    // 전체 행 수 계산
    let totalRows = Math.ceil(categoryClothes.length / itemsPerRow);
    let totalContentHeight = totalRows * (itemHeight + itemSpacing);

    // 최대 스크롤 오프셋 계산
    maxScrollOffset = Math.max(0, totalContentHeight - contentHeight);

    // 스크롤 오프셋 제한
    scrollOffset = constrain(scrollOffset, 0, maxScrollOffset);

    // 클리핑 영역 설정 (스크롤 가능한 영역)
    let clipX = modalX;
    let clipY = contentY;
    let clipWidth = modalWidth;
    let clipHeight = contentHeight;

    // 스크롤된 위치에서 시작
    let scrolledContentY = contentY - scrollOffset;

    // 현재 보이는 영역에 있는 아이템만 그리기 (성능 최적화)
    for (let i = 0; i < categoryClothes.length; i++) {
      let row = Math.floor(i / itemsPerRow);
      let col = i % itemsPerRow;

      let itemX = startX + col * (itemWidth + itemSpacing);
      let itemY = scrolledContentY + row * (itemHeight + itemSpacing);
      let cloth = categoryClothes[i];

      // 화면에 보이는 아이템만 그리기
      if (itemY + itemHeight >= clipY && itemY <= clipY + clipHeight) {
        // 선택된 옷인지 확인
        let isSelected = selectedClothes.some((c) => c.id === cloth.id);
        let isCategorySelected = selectedClothes.some(
          (c) => c.category === currentCategory.key
        );

        // 아이템 호버 감지 (클리핑 영역 내에서만)
        let isItemHovered =
          mouseX > itemX &&
          mouseX < itemX + itemWidth &&
          mouseY > Math.max(itemY, clipY) &&
          mouseY < Math.min(itemY + itemHeight, clipY + clipHeight) &&
          mouseY > clipY &&
          mouseY < clipY + clipHeight;

        // 버튼 배경
        if (isSelected) {
          fill(100, 200, 255);
        } else if (isCategorySelected) {
          fill(200, 200, 200);
        } else if (isItemHovered) {
          fill(220, 240, 255);
        } else {
          fill(240, 240, 240);
        }

        stroke(
          isSelected ? 50 : 150,
          isSelected ? 150 : 150,
          isSelected ? 255 : 150
        );
        strokeWeight(isSelected ? 3 : 2);

        // 클리핑된 사각형 그리기
        let visibleItemY = Math.max(itemY, clipY);
        let visibleItemHeight =
          Math.min(itemY + itemHeight, clipY + clipHeight) - visibleItemY;

        if (visibleItemHeight > 0) {
          rect(itemX, visibleItemY, itemWidth, visibleItemHeight, 10);

          // 옷 이미지 표시
          if (
            cloth.imageId &&
            clothImages[selectedSex] &&
            clothImages[selectedSex][cloth.category] &&
            clothImages[selectedSex][cloth.category][cloth.imageId]
          ) {
            let clothImage =
              clothImages[selectedSex][cloth.category][cloth.imageId];
            let imgSize = Math.min(itemWidth - 20, itemHeight - 30);
            let imgX = itemX + (itemWidth - imgSize) / 2;
            let imgY = itemY + 10;

            // 이미지도 클리핑 적용
            if (imgY + imgSize > clipY && imgY < clipY + clipHeight) {
              image(
                clothImage,
                imgX,
                Math.max(imgY, clipY),
                imgSize,
                Math.min(imgSize, clipY + clipHeight - Math.max(imgY, clipY))
              );
            }
          }
        }
      }
    }

    // 스크롤바 그리기
    if (maxScrollOffset > 0) {
      drawScrollbar(modalX, modalY, modalWidth, modalHeight, contentHeight);
    }
  }
}

// 확인 버튼 그리기
function drawConfirmButton(modalX, modalY, modalWidth, modalHeight) {
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
}

// 닫기 버튼 그리기
function drawCloseButton(modalX, modalY, modalWidth) {
  let closeBtnSize = 40;
  let closeBtnX = modalX + modalWidth - closeBtnSize - 20;
  let closeBtnY = modalY + 20;
  let closeBtnCenterX = closeBtnX + closeBtnSize / 2;
  let closeBtnCenterY = closeBtnY + closeBtnSize / 2;

  let isCloseHovered =
    mouseX > closeBtnX &&
    mouseX < closeBtnX + closeBtnSize &&
    mouseY > closeBtnY &&
    mouseY < closeBtnY + closeBtnSize;

  fill(isCloseHovered ? 200 : 150, 150, 150);
  noStroke();
  ellipse(closeBtnCenterX, closeBtnCenterY, closeBtnSize, closeBtnSize);

  fill(255, 255, 255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("×", closeBtnCenterX, closeBtnCenterY);
}

// 점수 계산 및 게임 완료 처리
function calculateScore() {
  let result = calculateClothingScore(selectedClothes, selectedSeason);
  let message = generateScoreMessage(
    result.score,
    result.correctCount,
    result.wrongCount,
    selectedClothes
  );

  if (selectedClothes.length !== 3) {
    scoreMessage = message;
    return;
  }

  gameScore += result.score;
  scoreMessage = message;
  showScoreResult = true;
  appliedClothes = [...selectedClothes];
  selectedClothes = [];
  isWardrobeOpen = false;
  isGameCompleted = true;

  // 3초 후 점수 메시지 숨기기
  setTimeout(() => {
    showScoreResult = false;
  }, 3000);
}

// 게임 재시작
function restartGame() {
  isGameCompleted = false;
  selectedClothes = [];
  appliedClothes = [];
  gameScore = 0;
  showScoreResult = false;
  isWardrobeOpen = false;
}

// 성별별 옷장 필터링 함수
function getClothesForGender(gender) {
  return availableClothes.filter((cloth) => cloth.gender === gender);
}

// 성별별 카테고리 옷 필터링 함수
function getClothesForGenderAndCategory(gender, category) {
  return availableClothes.filter(
    (cloth) => cloth.gender === gender && cloth.category === category
  );
}

// 성별별 계절 옷 필터링 함수
function getClothesForGenderSeasonAndCategory(gender, season, category) {
  return availableClothes.filter(
    (cloth) =>
      cloth.gender === gender &&
      cloth.category === category &&
      (cloth.season === season || cloth.season === "universal")
  );
}

// 스크롤바 그리기 함수
function drawScrollbar(modalX, modalY, modalWidth, modalHeight, contentHeight) {
  let scrollbarWidth = 20;
  let scrollbarX = modalX + modalWidth - scrollbarWidth - 10;
  let scrollbarY = modalY + 150; // 탭 아래부터
  let scrollbarHeight = contentHeight;

  // 스크롤바 배경
  fill(220, 220, 220);
  noStroke();
  rect(scrollbarX, scrollbarY, scrollbarWidth, scrollbarHeight, 10);

  // 스크롤 핸들
  if (maxScrollOffset > 0) {
    let handleHeight = Math.max(
      30,
      (contentHeight / (contentHeight + maxScrollOffset)) * scrollbarHeight
    );
    let handleY =
      scrollbarY +
      (scrollOffset / maxScrollOffset) * (scrollbarHeight - handleHeight);

    fill(150, 150, 150);
    rect(scrollbarX + 2, handleY, scrollbarWidth - 4, handleHeight, 8);
  }
}

// 마우스 휠 이벤트 처리
function mouseWheel(event) {
  if (isWardrobeOpen && maxScrollOffset > 0) {
    // 스크롤 속도 조절
    let scrollSpeed = 30;
    scrollOffset += event.delta * scrollSpeed;
    scrollOffset = constrain(scrollOffset, 0, maxScrollOffset);
    return false; // 기본 스크롤 동작 방지
  }
}

// 모달이 열릴 때 스크롤 리셋
function openWardrobe() {
  isWardrobeOpen = true;
  scrollOffset = 0;
  maxScrollOffset = 0;
}

// 모달이 닫힐 때 스크롤 리셋
function closeWardrobe() {
  isWardrobeOpen = false;
  scrollOffset = 0;
  maxScrollOffset = 0;
}

// 탭 변경 시 스크롤 리셋
function changeTab(newTab) {
  selectedTab = newTab;
  scrollOffset = 0;
  maxScrollOffset = 0;
}
