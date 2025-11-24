// clothes.js - 옷 데이터 및 관련 함수들

// 옷 이미지 저장소
let clothImages = {
  top: {},
  bottom: {},
};

// 옷 데이터 초기화 함수
function initializeClothes() {
  return [
    // 남성 의류
    // 상의 (Top)
    {
      id: 1,
      name: "봄 셔츠",
      category: "top",
      season: "spring",
      gender: "male",
      imageId: 1,
    },
    {
      id: 2,
      name: "봄 후드티",
      category: "top",
      season: "spring",
      gender: "male",
      imageId: 2,
    },
    {
      id: 3,
      name: "여름 반팔",
      category: "top",
      season: "summer",
      gender: "male",
      imageId: 3,
    },
    {
      id: 4,
      name: "여름 민소매",
      category: "top",
      season: "summer",
      gender: "male",
      imageId: 4,
    },
    {
      id: 5,
      name: "가을 긴팔",
      category: "top",
      season: "fall",
      gender: "male",
      imageId: 5,
    },
    {
      id: 6,
      name: "가을 니트",
      category: "top",
      season: "fall",
      gender: "male",
      imageId: 6,
    },
    {
      id: 7,
      name: "겨울 패딩",
      category: "top",
      season: "winter",
      gender: "male",
      imageId: 7,
    },
    {
      id: 8,
      name: "겨울 코트",
      category: "top",
      season: "winter",
      gender: "male",
      imageId: 8,
    },
    {
      id: 9,
      name: "기본 티셔츠",
      category: "top",
      season: "universal",
      gender: "male",
      imageId: 9,
    },
    {
      id: 10,
      name: "기본 셔츠",
      category: "top",
      season: "universal",
      gender: "male",
      imageId: 10,
    },

    // 하의 (Bottom)
    {
      id: 11,
      name: "봄 청바지",
      category: "bottom",
      season: "spring",
      gender: "male",
      imageId: 1,
    },
    {
      id: 12,
      name: "봄 면바지",
      category: "bottom",
      season: "spring",
      gender: "male",
      imageId: 2,
    },
    {
      id: 13,
      name: "여름 반바지",
      category: "bottom",
      season: "summer",
      gender: "male",
      imageId: 3,
    },
    {
      id: 14,
      name: "여름 린넨바지",
      category: "bottom",
      season: "summer",
      gender: "male",
      imageId: 4,
    },
    {
      id: 15,
      name: "가을 슬랙스",
      category: "bottom",
      season: "fall",
      gender: "male",
      imageId: 5,
    },
    {
      id: 16,
      name: "가을 청바지",
      category: "bottom",
      season: "fall",
      gender: "male",
      imageId: 6,
    },
    {
      id: 17,
      name: "겨울 기모바지",
      category: "bottom",
      season: "winter",
      gender: "male",
      imageId: 7,
    },
    {
      id: 18,
      name: "겨울 정장바지",
      category: "bottom",
      season: "winter",
      gender: "male",
      imageId: 8,
    },
    {
      id: 19,
      name: "기본 청바지",
      category: "bottom",
      season: "universal",
      gender: "male",
      imageId: 9,
    },
    {
      id: 20,
      name: "기본 면바지",
      category: "bottom",
      season: "universal",
      gender: "male",
      imageId: 10,
    },

    // 신발 (Shoes)
    {
      id: 21,
      name: "봄 운동화",
      category: "shoes",
      season: "spring",
      gender: "male",
    },
    {
      id: 22,
      name: "여름 샌들",
      category: "shoes",
      season: "summer",
      gender: "male",
    },
    {
      id: 23,
      name: "가을 구두",
      category: "shoes",
      season: "fall",
      gender: "male",
    },
    {
      id: 24,
      name: "겨울 부츠",
      category: "shoes",
      season: "winter",
      gender: "male",
    },

    // 여성 의류
    // 상의 (Top)
    {
      id: 25,
      name: "봄 블라우스",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 1,
    },
    {
      id: 26,
      name: "봄 가디건",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 2,
    },
    {
      id: 27,
      name: "여름 크롭탑",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 3,
    },
    {
      id: 28,
      name: "여름 원피스",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 4,
    },
    {
      id: 29,
      name: "가을 니트",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 5,
    },
    {
      id: 30,
      name: "가을 자켓",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 6,
    },
    {
      id: 31,
      name: "겨울 코트",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 7,
    },
    {
      id: 32,
      name: "겨울 패딩",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 8,
    },
    {
      id: 33,
      name: "기본 티셔츠",
      category: "top",
      season: "universal",
      gender: "female",
      imageId: 9,
    },
    {
      id: 34,
      name: "기본 셔츠",
      category: "top",
      season: "universal",
      gender: "female",
      imageId: 10,
    },

    // 하의 (Bottom)
    {
      id: 35,
      name: "봄 스커트",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 1,
    },
    {
      id: 36,
      name: "봄 청바지",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 2,
    },
    {
      id: 37,
      name: "여름 미니스커트",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 3,
    },
    {
      id: 38,
      name: "여름 반바지",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 4,
    },
    {
      id: 39,
      name: "가을 롱스커트",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 5,
    },
    {
      id: 40,
      name: "가을 슬랙스",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 6,
    },
    {
      id: 41,
      name: "겨울 기모바지",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 7,
    },
    {
      id: 42,
      name: "겨울 두꺼운스커트",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 8,
    },
    {
      id: 43,
      name: "기본 청바지",
      category: "bottom",
      season: "universal",
      gender: "female",
      imageId: 9,
    },
    {
      id: 44,
      name: "기본 스커트",
      category: "bottom",
      season: "universal",
      gender: "female",
      imageId: 10,
    },

    // 신발 (Shoes)
    {
      id: 45,
      name: "봄 플랫슈즈",
      category: "shoes",
      season: "spring",
      gender: "female",
    },
    {
      id: 46,
      name: "여름 샌들",
      category: "shoes",
      season: "summer",
      gender: "female",
    },
    {
      id: 47,
      name: "가을 하이힐",
      category: "shoes",
      season: "fall",
      gender: "female",
    },
    {
      id: 48,
      name: "겨울 부츠",
      category: "shoes",
      season: "winter",
      gender: "female",
    },
  ];
}

// 옷 이미지 로드 함수
function loadClothImages() {
  for (let i = 1; i <= 10; i++) {
    clothImages.top[i] = loadImage(`image/clothes/top/top${i}.png`);
    clothImages.bottom[i] = loadImage(`image/clothes/bottom/bottom${i}.png`);
  }
}

// 점수 계산 함수
function calculateClothingScore(selectedClothes, selectedSeason) {
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  for (let cloth of selectedClothes) {
    if (cloth.season === selectedSeason) {
      score += 20; // 완전히 맞는 계절 옷: +20점
      correctCount++;
    } else if (cloth.season === "universal") {
      score += 10; // 범용 옷: +10점 (계절에 상관없이 괜찮음)
      correctCount++;
    } else {
      score -= 10; // 틀린 계절 옷: -10점
      wrongCount++;
    }
  }

  return { score, correctCount, wrongCount };
}

// 점수 메시지 생성 함수
function generateScoreMessage(
  score,
  correctCount,
  wrongCount,
  selectedClothes
) {
  // 3개 모두 선택했는지 확인 (상의, 하의, 신발)
  if (selectedClothes.length === 3) {
    if (wrongCount === 0) {
      return "완벽해요! 계절에 완벽하게 맞는 코디입니다! (" + score + "점)";
    } else if (correctCount > wrongCount) {
      return "좋아요! 대부분 적절한 선택이에요. (" + score + "점)";
    } else {
      return "아쉽네요. 계절을 더 고려해보세요. (" + score + "점)";
    }
  } else {
    return "상의, 하의, 신발을 모두 선택해주세요.";
  }
}
