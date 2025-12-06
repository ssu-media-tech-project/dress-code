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
  const clothesToShow = getAvailableClothes();

  for (let cloth of clothesToShow) {
    if (cloth._displayInfo) {
      const { x: itemX, y: itemY, width, height } = cloth._displayInfo;

      if (x > itemX && x < itemX + width && y > itemY && y < itemY + height) {
        return cloth;
      }
    }
  }
  return null;
}

/**
 * 마네킹 영역에 있는지 확인
 * @param {number} x - X 좌표
 * @param {number} y - Y 좌표
 * @returns {boolean} 마네킹 영역에 있으면 true
 */
function isPositionOverMannequin(x, y) {
  const mannequinArea = getMannequinDropArea();

  return (
    x > mannequinArea.left &&
    x < mannequinArea.right &&
    y > mannequinArea.top &&
    y < mannequinArea.bottom
  );
}

/**
 * 마네킹 드롭 영역 좌표 계산
 * @returns {Object} 마네킹 영역의 좌표들
 */
function getMannequinDropArea() {
  const centerX = width / 2;
  const centerY = height / 2;
  const areaWidth = 200;
  const areaHeight = 300;

  return {
    left: centerX - areaWidth / 2,
    right: centerX + areaWidth / 2,
    top: centerY - areaHeight / 2,
    bottom: centerY + areaHeight / 2,
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
  if (!isPositionOverMannequin(x, y)) {
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

  return hasTop && hasBottom;
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
