# p5.js 드래그 앤 드롭 구현 가이드

## 핵심 함수들

### 마우스 위치 감지

```javascript
mouseX, mouseY        // 현재 마우스 좌표
pmouseX, pmouseY      // 이전 프레임 마우스 좌표
용도: 드래그할 객체 찾기, 드롭 위치 계산
```

마우스 이벤트 함수들

```
mousePressed()

function mousePressed() {
  // 드래그 시작점에서 객체 선택
  selectedObject = findObjectAt(mouseX, mouseY);
}
// 역할: 드래그할 객체 선택

mouseDragged()

function mouseDragged() {
  if (selectedObject) {
    // 객체를 마우스 위치로 이동
    selectedObject.x = mouseX;
    selectedObject.y = mouseY;
  }
}
// 역할: 드래그 중 객체 위치 업데이트

mouseReleased()

function mouseReleased() {
  if (selectedObject && isOverDropZone(mouseX, mouseY)) {
    // 드롭 성공 처리
    dropObject(selectedObject);
  }
  selectedObject = null; // 드래그 종료
}
 //역할: 드롭 처리 및 드래그 상태 초기화

핵심 헬퍼 함수들

객체 감지

function findObjectAt(x, y) {
  for (let obj of objects) {
    if (x > obj.x && x < obj.x + obj.width &&
        y > obj.y && y < obj.y + obj.height) {
      return obj;
    }
  }
  return null;
}

드롭 영역 확인

function isOverDropZone(x, y) {
  return x > dropZone.x && x < dropZone.x + dropZone.width &&
         y > dropZone.y && y < dropZone.y + dropZone.height;
}

드래그 앤 드롭 플로우

1단계: 준비

let draggedItem = null;
let isDragging = false;

2단계: 시작

function mousePressed() {
  draggedItem = findItemAt(mouseX, mouseY);
  if (draggedItem) {
    isDragging = true;
  }
}

3단계: 진행 ➡️

function mouseDragged() {
  if (isDragging && draggedItem) {
    // 시각적 피드백 표시
    drawDraggedItem(mouseX, mouseY);
  }
}

4단계: 완료 ✅

function mouseReleased() {
  if (isDragging && isValidDropZone(mouseX, mouseY)) {
    applyDrop(draggedItem);
  }
  resetDragState();
}

🎮 실제 게임 적용 예시

옷입히기 게임 구현

// 1. 옷 선택
function mousePressed() {
  selectedCloth = findClothAt(mouseX, mouseY);
}

// 2. 드래그
function mouseDragged() {
  if (selectedCloth) {
    drawClothFollowMouse();
  }
}

// 3. 마네킹에 드롭
function mouseReleased() {
  if (selectedCloth && isOverMannequin(mouseX, mouseY)) {
    wearCloth(selectedCloth);
    gameComplete = checkAllClothesWorn();
  }
}

🛠️ 고급 기능들

스냅 효과 (자석처럼 붙기)

function mouseReleased() {
  let nearestSlot = findNearestSlot(mouseX, mouseY);
  if (distance < SNAP_DISTANCE) {
    snapToSlot(draggedItem, nearestSlot);
  }
}

드래그 제약 (특정 영역에서만)

function mouseDragged() {
  if (isDragging) {
    let constrainedX = constrain(mouseX, minX, maxX);
    let constrainedY = constrain(mouseY, minY, maxY);
    updatePosition(constrainedX, constrainedY);
  }
}

멀티 드래그 (여러 개 동시에)

let selectedItems = [];

function mousePressed() {
  if (keyIsPressed && key === 'Shift') {
    selectedItems.push(findItemAt(mouseX, mouseY));
  }
}

📊 기능 요약표

| 단계  | 함수              | 역할       | 핵심 코드                            |
|-----|-----------------|----------|----------------------------------|
| 선택  | mousePressed()  | 객체 선택    | item = findAt(mouseX, mouseY)    |
| 이동  | mouseDragged()  | 위치 업데이트  | item.x = mouseX; item.y = mouseY |
| 완료  | mouseReleased() | 드롭 처리    | if(isOver(target)) apply()       |
| 감지  | findObjectAt()  | 충돌 검사    | x > obj.x && x < obj.x + w       |
| 검증  | isOverTarget()  | 드롭 가능 여부 | return inBounds(x, y)            |

시각적 피드백

function drawDraggedItem() {
  // 반투명 효과
  tint(255, 150);

  // 그림자 효과
  fill(0, 0, 0, 50);
  rect(mouseX + 5, mouseY + 5, item.width, item.height);

  // 실제 아이템
  image(item.image, mouseX, mouseY);
  noTint();
}

주요 포인트

1. 상태 관리: isDragging, draggedItem 변수로 드래그 상태 추적
2. 충돌 감지: 마우스 좌표와 객체 경계 비교
3. 시각적 피드백: 드래그 중 반투명, 그림자 효과
4. 드롭 검증: 유효한 드롭 영역인지 확인
5. 상태 초기화: 드래그 완료 후 변수들 리셋


성능 최적화

- 불필요한 충돌 검사 최소화
- 드래그 중에만 시각적 업데이트
- 큰 이미지는 미리 리사이즈
- 드롭 영역을 명확히 정의

```
