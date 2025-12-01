// clothes.js - 옷 데이터 및 관련 함수들

// 옷 이미지 저장소
let clothImages = {
  male: {
    top: {},
    bottom: {},
    shoes: {}
  },
  female: {
    top: {},
    bottom: {},
    shoes: {},
    accessories: {}
  }
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
    // 봄 상의 (Top)
    {
      id: 25,
      name: "봄 블라우스 1",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 1,
    },
    {
      id: 26,
      name: "봄 가디건 2",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 2,
    },
    {
      id: 27,
      name: "봄 셔츠 3",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 3,
    },
    {
      id: 28,
      name: "봄 니트 4",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 4,
    },
    {
      id: 29,
      name: "봄 재킷 5",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 5,
    },
    {
      id: 30,
      name: "봄 원피스 6",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 6,
    },
    {
      id: 31,
      name: "봄 블라우스 7",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 7,
    },
    {
      id: 32,
      name: "봄 카디건 8",
      category: "top",
      season: "spring",
      gender: "female",
      imageId: 8,
    },

    // 여름 상의 (Top)
    {
      id: 33,
      name: "여름 탱크탑 1",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 11,
    },
    {
      id: 34,
      name: "여름 티셔츠 2",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 12,
    },
    {
      id: 35,
      name: "여름 원피스 3",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 13,
    },
    {
      id: 36,
      name: "여름 크롭탑 4",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 14,
    },
    {
      id: 37,
      name: "여름 블라우스 5",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 15,
    },
    {
      id: 38,
      name: "여름 셔츠 6",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 16,
    },
    {
      id: 39,
      name: "여름 민소매 7",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 17,
    },
    {
      id: 40,
      name: "여름 튜닉 8",
      category: "top",
      season: "summer",
      gender: "female",
      imageId: 18,
    },

    // 가을 상의 (Top)
    {
      id: 41,
      name: "가을 니트 1",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 21,
    },
    {
      id: 42,
      name: "가을 자켓 2",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 22,
    },
    {
      id: 43,
      name: "가을 가디건 3",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 23,
    },
    {
      id: 44,
      name: "가을 블라우스 4",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 24,
    },
    {
      id: 45,
      name: "가을 코트 5",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 25,
    },
    {
      id: 46,
      name: "가을 스웨터 6",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 26,
    },
    {
      id: 47,
      name: "가을 원피스 7",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 27,
    },
    {
      id: 48,
      name: "가을 셔츠 8",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 28,
    },
    {
      id: 49,
      name: "가을 후드티 9",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 29,
    },
    {
      id: 50,
      name: "가을 블레이저 10",
      category: "top",
      season: "fall",
      gender: "female",
      imageId: 30,
    },

    // 겨울 상의 (Top)
    {
      id: 51,
      name: "겨울 코트 1",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 31,
    },
    {
      id: 52,
      name: "겨울 패딩 2",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 32,
    },
    {
      id: 53,
      name: "겨울 니트 3",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 33,
    },
    {
      id: 54,
      name: "겨울 스웨터 4",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 34,
    },
    {
      id: 55,
      name: "겨울 자켓 5",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 35,
    },
    {
      id: 56,
      name: "겨울 가디건 6",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 36,
    },
    {
      id: 57,
      name: "겨울 원피스 7",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 37,
    },
    {
      id: 58,
      name: "겨울 후드티 8",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 38,
    },
    {
      id: 59,
      name: "겨울 블라우스 9",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 39,
    },
    {
      id: 60,
      name: "겨울 터틀넥 10",
      category: "top",
      season: "winter",
      gender: "female",
      imageId: 40,
    },

    // 봄 하의 (Bottom)
    {
      id: 61,
      name: "봄 스커트 1",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 1,
    },
    {
      id: 62,
      name: "봄 청바지 2",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 2,
    },
    {
      id: 63,
      name: "봄 치마 3",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 3,
    },
    {
      id: 64,
      name: "봄 슬랙스 4",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 4,
    },
    {
      id: 65,
      name: "봄 원피스스커트 5",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 5,
    },
    {
      id: 66,
      name: "봄 팬츠 6",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 6,
    },
    {
      id: 67,
      name: "봄 미디스커트 7",
      category: "bottom",
      season: "spring",
      gender: "female",
      imageId: 7,
    },

    // 여름 하의 (Bottom)
    {
      id: 68,
      name: "여름 미니스커트 1",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 11,
    },
    {
      id: 69,
      name: "여름 반바지 2",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 12,
    },
    {
      id: 70,
      name: "여름 치마 3",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 13,
    },
    {
      id: 71,
      name: "여름 쇼츠 4",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 14,
    },
    {
      id: 72,
      name: "여름 스커트 5",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 15,
    },
    {
      id: 73,
      name: "여름 데님스커트 6",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 16,
    },
    {
      id: 74,
      name: "여름 하프팬츠 7",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 17,
    },
    {
      id: 75,
      name: "여름 플리츠스커트 8",
      category: "bottom",
      season: "summer",
      gender: "female",
      imageId: 18,
    },

    // 가을 하의 (Bottom)
    {
      id: 76,
      name: "가을 롱스커트 1",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 21,
    },
    {
      id: 77,
      name: "가을 슬랙스 2",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 22,
    },
    {
      id: 78,
      name: "가을 청바지 3",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 23,
    },
    {
      id: 79,
      name: "가을 치마 4",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 24,
    },
    {
      id: 80,
      name: "가을 팬츠 5",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 25,
    },
    {
      id: 81,
      name: "가을 미디스커트 6",
      category: "bottom",
      season: "fall",
      gender: "female",
      imageId: 26,
    },

    // 겨울 하의 (Bottom)
    {
      id: 82,
      name: "겨울 기모바지 1",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 31,
    },
    {
      id: 83,
      name: "겨울 두꺼운스커트 2",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 32,
    },
    {
      id: 84,
      name: "겨울 롱스커트 3",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 33,
    },
    {
      id: 85,
      name: "겨울 청바지 4",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 34,
    },
    {
      id: 86,
      name: "겨울 슬랙스 5",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 35,
    },
    {
      id: 87,
      name: "겨울 치마 6",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 36,
    },
    {
      id: 88,
      name: "겨울 레깅스 7",
      category: "bottom",
      season: "winter",
      gender: "female",
      imageId: 37,
    },

    // 신발 (Shoes)
    {
      id: 89,
      name: "봄 플랫슈즈 1",
      category: "shoes",
      season: "spring",
      gender: "female",
      imageId: 1,
    },
    {
      id: 90,
      name: "봄 스니커즈 2",
      category: "shoes",
      season: "spring",
      gender: "female",
      imageId: 2,
    },
    {
      id: 91,
      name: "여름 샌들 1",
      category: "shoes",
      season: "summer",
      gender: "female",
      imageId: 3,
    },
    {
      id: 92,
      name: "여름 플랫슈즈 2",
      category: "shoes",
      season: "summer",
      gender: "female",
      imageId: 4,
    },
    {
      id: 93,
      name: "가을 하이힐 1",
      category: "shoes",
      season: "fall",
      gender: "female",
      imageId: 5,
    },
    {
      id: 94,
      name: "가을 부츠 2",
      category: "shoes",
      season: "fall",
      gender: "female",
      imageId: 6,
    },
    {
      id: 95,
      name: "겨울 부츠 1",
      category: "shoes",
      season: "winter",
      gender: "female",
      imageId: 7,
    },
    {
      id: 96,
      name: "겨울 하이힐 2",
      category: "shoes",
      season: "winter",
      gender: "female",
      imageId: 8,
    },
  ];
}

// 옷 이미지 로드 함수
function loadClothImages() {
  // 남성 기존 옷 이미지 (fall 시리즈로 통일)
  for (let i = 1; i <= 10; i++) {
    clothImages.male.top[i] = loadImage(`image/clothes/top/fall-top-${i}.png`);
    clothImages.male.bottom[i] = loadImage(`image/clothes/bottom/fall-bottom-${i}.png`);
  }
  
  // 여성 봄 옷 이미지
  for (let i = 1; i <= 8; i++) {
    clothImages.female.top[i] = loadImage(`image/여자_봄/봄_상의_${i}.png`);
  }
  for (let i = 1; i <= 7; i++) {
    clothImages.female.bottom[i] = loadImage(`image/여자_봄/봄_하의_${i}.png`);
  }
  
  // 여성 여름 옷 이미지
  for (let i = 1; i <= 8; i++) {
    clothImages.female.top[i + 10] = loadImage(`image/여자_여름/여름_상의${i}.png`);
  }
  // 여름 하의는 1-16번까지 있지만, 실제로는 연속적이지 않은 파일들도 있음
  clothImages.female.bottom[11] = loadImage(`image/여자_여름/여름_하의1.png`);
  clothImages.female.bottom[12] = loadImage(`image/여자_여름/여름_하의2.png`);
  clothImages.female.bottom[13] = loadImage(`image/여자_여름/여름_하의3.png`);
  clothImages.female.bottom[14] = loadImage(`image/여자_여름/여름_하의4.png`);
  clothImages.female.bottom[15] = loadImage(`image/여자_여름/여름_하의5.png`);
  clothImages.female.bottom[16] = loadImage(`image/여자_여름/여름_하의6.png`);
  clothImages.female.bottom[17] = loadImage(`image/여자_여름/여름_하의7.png`);
  clothImages.female.bottom[18] = loadImage(`image/여자_여름/여름_하의8.png`);
  
  // 여성 가을 옷 이미지
  for (let i = 1; i <= 10; i++) {
    clothImages.female.top[i + 20] = loadImage(`image/여자_가을/가을_상의${i}.png`);
  }
  for (let i = 1; i <= 6; i++) {
    clothImages.female.bottom[i + 20] = loadImage(`image/여자_가을/가을_하의${i}.png`);
  }
  
  // 여성 겨울 옷 이미지
  for (let i = 1; i <= 10; i++) {
    clothImages.female.top[i + 30] = loadImage(`image/여자_겨울/겨울_상의${i}.png`);
  }
  for (let i = 1; i <= 7; i++) {
    clothImages.female.bottom[i + 30] = loadImage(`image/여자_겨울/겨울_하의${i}.png`);
  }
  
  // 여성 신발 (각 계절별)
  clothImages.female.shoes[1] = loadImage(`image/여자_봄/봄_신발_00.png`);
  clothImages.female.shoes[2] = loadImage(`image/여자_봄/봄_신발_04.png`);
  clothImages.female.shoes[3] = loadImage(`image/여자_여름/여름_신발1.png`);
  clothImages.female.shoes[4] = loadImage(`image/여자_여름/여름_신발2.png`);
  clothImages.female.shoes[5] = loadImage(`image/여자_가을/가을_신발1.png`);
  clothImages.female.shoes[6] = loadImage(`image/여자_가을/가을_신발2.png`);
  clothImages.female.shoes[7] = loadImage(`image/여자_겨울/겨울_신발1.png`);
  clothImages.female.shoes[8] = loadImage(`image/여자_겨울/겨울_신발2.png`);
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
