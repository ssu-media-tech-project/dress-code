/**
 * 드래그 상태 초기화
 */
function initializeDragState() {
  isDragging = false;
  draggedCloth = null;
  dragOffsetX = 0;
  dragOffsetY = 0;
}

/**
 * 드래그 시작
 * @param {Object} cloth - 드래그할 옷 객체
 */
function startDragOperation(cloth) {
  if (!cloth) return false;

  draggedCloth = cloth;
  isDragging = true;

  // 드래그 오프셋 계산 (마우스가 옷의 어느 부분을 클릭했는지)
  if (cloth._displayInfo) {
    dragOffsetX = mouseX - cloth._displayInfo.x;
    dragOffsetY = mouseY - cloth._displayInfo.y;
  }

  return true;
}

/**
 * 드래그 종료
 */
function endDragOperation() {
  const wasSuccessful =
    isDragging && draggedCloth && handleClothDrop(mouseX, mouseY, draggedCloth);

  initializeDragState();
  return wasSuccessful;
}

/**
 * 드래그 중인지 확인
 */
function isDragInProgress() {
  return isDragging && draggedCloth !== null;
}

// ==================== 위치 및 영역 감지 ====================

/**
 * 특정 위치에 있는 옷 찾기
 * @param {number} x - X 좌표
 * @param {number} y - Y 좌표
 * @returns {Object|null} 해당 위치의 옷 객체 또는 null
 */
function findClothAtPosition(x, y) {
  // 1. 먼저 마네킹 위에 입힌 옷들을 확인 (우선순위 높음)
  for (let cloth of appliedClothes) {
    if (cloth._mannequinDisplayInfo) {
      const { x: itemX, y: itemY, width, height } = cloth._mannequinDisplayInfo;

      if (x > itemX && x < itemX + width && y > itemY && y < itemY + height) {
        return cloth;
      }
    }
  }

  // 2. 그 다음 옷장 주변의 옷들을 확인
  const clothesToShow = getAvailableClothes();

  for (let cloth of clothesToShow) {
    if (cloth._displayInfo) {
      const { baseX, baseY, width, height, position, clipY, clipHeight } = cloth._displayInfo;
      
      // 현재 스크롤을 고려한 실제 위치 계산
      let currentScrollOffset = 0;
      let itemX = baseX;
      let itemY = baseY;
      
      if (position === "left") {
        currentScrollOffset = topScrollOffset;
        itemY = baseY - currentScrollOffset;
      } else if (position === "right") {
        currentScrollOffset = bottomScrollOffset;
        itemY = baseY - currentScrollOffset;
      } else if (position === "bottom") {
        // 신발은 가로 스크롤
        currentScrollOffset = shoesScrollOffset;
        itemX = baseX - currentScrollOffset;
      }
      
      // 현재 가시성 확인
      let isCurrentlyVisible;
      if (position === "bottom") {
        // 신발은 가로 스크롤이므로 X축 기준으로 가시성 확인
        const { clipX, clipWidth } = cloth._displayInfo;
        isCurrentlyVisible = itemX + width >= clipX && itemX <= clipX + clipWidth;
      } else {
        // 상의/하의는 세로 스크롤이므로 Y축 기준으로 가시성 확인
        isCurrentlyVisible = itemY + height >= clipY && itemY <= clipY + clipHeight;
      }
      
      if (isCurrentlyVisible) {
        // 클리핑된 영역을 고려한 클릭 감지
        if (position === "bottom") {
          // 신발은 가로 클리핑
          const { clipX, clipWidth } = cloth._displayInfo;
          let clickableX = Math.max(itemX, clipX);
          let clickableWidth = Math.min(itemX + width, clipX + clipWidth) - clickableX;
          
          if (clickableWidth > 0 && 
              x > clickableX && x < clickableX + clickableWidth && 
              y > itemY && y < itemY + height) {
            return cloth;
          }
        } else {
          // 상의/하의는 세로 클리핑
          let clickableY = Math.max(itemY, clipY);
          let clickableHeight = Math.min(itemY + height, clipY + clipHeight) - clickableY;
          
          if (clickableHeight > 0 && 
              x > itemX && x < itemX + width && 
              y > clickableY && y < clickableY + clickableHeight) {
            return cloth;
          }
        }
      }
    }
  }
  return null;
}

/**
 * 마네킹 영역에 있는지 확인
 * @param {number} x - X 좌표
 * @param {number} y - Y 좌표
 * @param {Object} cloth - 옷 객체 (사용하지 않음, 모든 옷이 동일한 영역 사용)
 * @returns {boolean} 마네킹 영역에 있으면 true
 */
function isPositionOverMannequin(x, y, cloth = null) {
  // 모든 옷(신발 포함)이 전체 마네킹 영역에서 드롭 가능
  const mannequinArea = getMannequinDropArea();

  return (
    x > mannequinArea.left &&
    x < mannequinArea.right &&
    y > mannequinArea.top &&
    y < mannequinArea.bottom
  );
}

/**
 * 마네킹 드롭 영역 좌표 계산 (매우 넓은 영역)
 * @returns {Object} 마네킹 영역의 좌표들
 */
function getMannequinDropArea() {
  const centerX = width / 2;
  const centerY = height / 2;
  const areaWidth = width * 0.6;   // 화면 너비의 60%
  const areaHeight = height * 0.8;  // 화면 높이의 80%

  return {
    left: centerX - areaWidth / 2,
    right: centerX + areaWidth / 2,
    top: centerY - areaHeight / 2,
    bottom: centerY + areaHeight / 2,
  };
}

/**
 * 신발 드롭 영역 좌표 계산 (마네킹 발 부분만)
 * @returns {Object} 신발 드롭 영역의 좌표들
 */
function getShoesDropArea() {
  const centerX = width / 2;
  const centerY = height / 2;
  const areaWidth = 200;
  const areaHeight = 300;
  
  // 신발 드롭 영역을 마네킹의 발 부분(최하단)에만 위치
  const shoesAreaHeight = 80;  // 발 부분만 커버하는 작은 영역

  return {
    left: centerX - areaWidth / 2,
    right: centerX + areaWidth / 2,
    top: centerY + areaHeight / 2 - 30,  // 마네킹 하단에서 30px 위부터
    bottom: centerY + areaHeight / 2 + 50,  // 마네킹 하단에서 50px 아래까지
  };
}

// ==================== 옷 입히기 로직 ====================

/**
 * 옷 드롭 처리
 * @param {number} x - 드롭한 X 좌표
 * @param {number} y - 드롭한 Y 좌표
 * @param {Object} cloth - 드롭한 옷 객체
 * @returns {boolean} 성공적으로 입혔으면 true
 */
function handleClothDrop(x, y, cloth) {
  // 마네킹에 입힌 옷을 드래그해서 벗기는 경우
  if (appliedClothes.includes(cloth)) {
    // 마네킹 밖으로 드래그하면 옷 벗기기
    if (!isPositionOverMannequin(x, y, cloth)) {
      appliedClothes = appliedClothes.filter(c => c.id !== cloth.id);
      return true;
    }
    return false; // 마네킹 안에서는 그대로 유지
  }
  
  // 옷장의 옷을 마네킹으로 드래그하는 경우
  if (!isPositionOverMannequin(x, y, cloth)) {
    return false;
  }

  return applyClothToMannequin(cloth);
}

/**
 * 마네킹에 옷 입히기
 * @param {Object} cloth - 입힐 옷 객체
 * @returns {boolean} 성공적으로 입혔으면 true
 */
function applyClothToMannequin(cloth) {
  if (!cloth) return false;

  // 같은 카테고리의 기존 옷 제거
  appliedClothes = appliedClothes.filter((c) => c.category !== cloth.category);

  // 새 옷 추가
  appliedClothes.push(cloth);

  // 게임 완료 확인
  checkGameCompletion();

  return true;
}

/**
 * 게임 완료 상태 확인 및 처리
 */
function checkGameCompletion() {
  const hasRequiredClothes = hasAllRequiredClothingTypes();

  if (hasRequiredClothes) {
    triggerGameCompletion();
  }
}

/**
 * 필요한 모든 의류 타입을 착용했는지 확인
 * @returns {boolean} 모든 필요한 의류를 착용했으면 true
 */
function hasAllRequiredClothingTypes() {
  const hasTop = appliedClothes.some((c) => c.category === "top");
  const hasBottom = appliedClothes.some((c) => c.category === "bottom");
  const hasShoes = appliedClothes.some((c) => c.category === "shoes");

  return hasTop && hasBottom && hasShoes;
}

/**
 * 게임 완료 처리 시작
 */
function triggerGameCompletion() {
  setTimeout(() => {
    calculateAndShowScore();
  }, 500); // 0.5초 후 점수 계산
}

/**
 * 점수 계산 및 표시
 */
function calculateAndShowScore() {
  const result = calculateClothingScore(appliedClothes, selectedSeason);
  const message = generateScoreMessage(
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
}

// ==================== 헬퍼 함수 ====================

/**
 * 현재 성별에 맞는 사용 가능한 옷들 가져오기
 * @returns {Array} 필터링된 옷 배열
 */
function getAvailableClothes() {
  return availableClothes.filter((cloth) => cloth.gender === selectedSex);
}

/**
 * 드래그 중인 옷 그리기
 */
function renderDraggedCloth() {
  if (!isDragInProgress()) return;

  const dragSize = 100;
  const dragX = mouseX - dragSize / 2;
  const dragY = mouseY - dragSize / 2;

  // 반투명 배경
  fill(255, 255, 255, 100);
  stroke(100, 200, 255);
  strokeWeight(3);
  rect(dragX, dragY, dragSize, dragSize, 10);

  // 드래그 중인 옷 이미지
  const clothImage = getClothImage(draggedCloth);
  if (clothImage) {
    const imgSize = dragSize - 10;
    image(clothImage, dragX + 5, dragY + 5, imgSize, imgSize);
  }
}

/**
 * 옷 이미지 가져오기
 * @param {Object} cloth - 옷 객체
 * @returns {Object|null} 이미지 객체 또는 null
 */
function getClothImage(cloth) {
  if (!cloth || !cloth.imageId) return null;

  const images = clothImages[selectedSex];
  if (!images || !images[cloth.category]) return null;

  return images[cloth.category][cloth.imageId] || null;
}
