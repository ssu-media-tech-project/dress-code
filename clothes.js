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
    shoes: {}
  }
};

// 옷 데이터 초기화 함수
function initializeClothes() {
  return [
    // 남성 의류
    // 봄 상의 (Top) - spring-top-1.png ~ spring-top-10.png
    {id: 1, name: "봄 셔츠 1", category: "top", season: "spring", gender: "male", imageId: "spring-1"},
    {id: 2, name: "봄 후드티 2", category: "top", season: "spring", gender: "male", imageId: "spring-2"},
    {id: 3, name: "봄 가디건 3", category: "top", season: "spring", gender: "male", imageId: "spring-3"},
    {id: 4, name: "봄 니트 4", category: "top", season: "spring", gender: "male", imageId: "spring-4"},
    {id: 5, name: "봄 재킷 5", category: "top", season: "spring", gender: "male", imageId: "spring-5"},
    {id: 6, name: "봄 블레이저 6", category: "top", season: "spring", gender: "male", imageId: "spring-6"},
    {id: 7, name: "봄 카디건 7", category: "top", season: "spring", gender: "male", imageId: "spring-7"},
    {id: 8, name: "봄 스웨터 8", category: "top", season: "spring", gender: "male", imageId: "spring-8"},
    {id: 9, name: "봄 티셔츠 9", category: "top", season: "spring", gender: "male", imageId: "spring-9"},
    {id: 10, name: "봄 풀오버 10", category: "top", season: "spring", gender: "male", imageId: "spring-10"},

    // 여름 상의 (Top) - summer-top-1.png ~ summer-top-10.png  
    {id: 11, name: "여름 반팔 1", category: "top", season: "summer", gender: "male", imageId: "summer-1"},
    {id: 12, name: "여름 민소매 2", category: "top", season: "summer", gender: "male", imageId: "summer-2"},
    {id: 13, name: "여름 폴로 3", category: "top", season: "summer", gender: "male", imageId: "summer-3"},
    {id: 14, name: "여름 티셔츠 4", category: "top", season: "summer", gender: "male", imageId: "summer-4"},
    {id: 15, name: "여름 린넨셔츠 5", category: "top", season: "summer", gender: "male", imageId: "summer-5"},
    {id: 16, name: "여름 탱크탑 6", category: "top", season: "summer", gender: "male", imageId: "summer-6"},
    {id: 17, name: "여름 셔츠 7", category: "top", season: "summer", gender: "male", imageId: "summer-7"},
    {id: 18, name: "여름 헨리넥 8", category: "top", season: "summer", gender: "male", imageId: "summer-8"},
    {id: 19, name: "여름 브이넥 9", category: "top", season: "summer", gender: "male", imageId: "summer-9"},
    {id: 20, name: "여름 라운드넥 10", category: "top", season: "summer", gender: "male", imageId: "summer-10"},

    // 가을 상의 (Top) - fall-top-1.png ~ fall-top-10.png
    {id: 21, name: "가을 긴팔 1", category: "top", season: "fall", gender: "male", imageId: "fall-1"},
    {id: 22, name: "가을 니트 2", category: "top", season: "fall", gender: "male", imageId: "fall-2"},
    {id: 23, name: "가을 스웨터 3", category: "top", season: "fall", gender: "male", imageId: "fall-3"},
    {id: 24, name: "가을 후드티 4", category: "top", season: "fall", gender: "male", imageId: "fall-4"},
    {id: 25, name: "가을 가디건 5", category: "top", season: "fall", gender: "male", imageId: "fall-5"},
    {id: 26, name: "가을 자켓 6", category: "top", season: "fall", gender: "male", imageId: "fall-6"},
    {id: 27, name: "가을 블레이저 7", category: "top", season: "fall", gender: "male", imageId: "fall-7"},
    {id: 28, name: "가을 코트 8", category: "top", season: "fall", gender: "male", imageId: "fall-8"},
    {id: 29, name: "가을 트렌치 9", category: "top", season: "fall", gender: "male", imageId: "fall-9"},
    {id: 30, name: "가을 풀오버 10", category: "top", season: "fall", gender: "male", imageId: "fall-10"},

    // 겨울 상의 (Top) - winter-top-1.png ~ winter-top-10.png
    {id: 31, name: "겨울 패딩 1", category: "top", season: "winter", gender: "male", imageId: "winter-1"},
    {id: 32, name: "겨울 코트 2", category: "top", season: "winter", gender: "male", imageId: "winter-2"},
    {id: 33, name: "겨울 두꺼운니트 3", category: "top", season: "winter", gender: "male", imageId: "winter-3"},
    {id: 34, name: "겨울 후드티 4", category: "top", season: "winter", gender: "male", imageId: "winter-4"},
    {id: 35, name: "겨울 자켓 5", category: "top", season: "winter", gender: "male", imageId: "winter-5"},
    {id: 36, name: "겨울 파카 6", category: "top", season: "winter", gender: "male", imageId: "winter-6"},
    {id: 37, name: "겨울 무스탕 7", category: "top", season: "winter", gender: "male", imageId: "winter-7"},
    {id: 38, name: "겨울 플리스 8", category: "top", season: "winter", gender: "male", imageId: "winter-8"},
    {id: 39, name: "겨울 스웨터 9", category: "top", season: "winter", gender: "male", imageId: "winter-9"},
    {id: 40, name: "겨울 터틀넥 10", category: "top", season: "winter", gender: "male", imageId: "winter-10"},

    // 봄 하의 (Bottom) - spring-bottom-1.png ~ spring-bottom-10.png
    {id: 41, name: "봄 청바지 1", category: "bottom", season: "spring", gender: "male", imageId: "spring-1"},
    {id: 42, name: "봄 면바지 2", category: "bottom", season: "spring", gender: "male", imageId: "spring-2"},
    {id: 43, name: "봄 슬랙스 3", category: "bottom", season: "spring", gender: "male", imageId: "spring-3"},
    {id: 44, name: "봄 치노팬츠 4", category: "bottom", season: "spring", gender: "male", imageId: "spring-4"},
    {id: 45, name: "봄 카고팬츠 5", category: "bottom", season: "spring", gender: "male", imageId: "spring-5"},
    {id: 46, name: "봄 조거팬츠 6", category: "bottom", season: "spring", gender: "male", imageId: "spring-6"},
    {id: 47, name: "봄 정장바지 7", category: "bottom", season: "spring", gender: "male", imageId: "spring-7"},
    {id: 48, name: "봄 린넨팬츠 8", category: "bottom", season: "spring", gender: "male", imageId: "spring-8"},
    {id: 49, name: "봄 데님팬츠 9", category: "bottom", season: "spring", gender: "male", imageId: "spring-9"},
    {id: 50, name: "봄 트레이닝팬츠 10", category: "bottom", season: "spring", gender: "male", imageId: "spring-10"},

    // 여름 하의 (Bottom) - summer-bottom-1.png ~ summer-bottom-10.png
    {id: 51, name: "여름 반바지 1", category: "bottom", season: "summer", gender: "male", imageId: "summer-1"},
    {id: 52, name: "여름 린넨바지 2", category: "bottom", season: "summer", gender: "male", imageId: "summer-2"},
    {id: 53, name: "여름 하프팬츠 3", category: "bottom", season: "summer", gender: "male", imageId: "summer-3"},
    {id: 54, name: "여름 보드숏 4", category: "bottom", season: "summer", gender: "male", imageId: "summer-4"},
    {id: 55, name: "여름 치노숏 5", category: "bottom", season: "summer", gender: "male", imageId: "summer-5"},
    {id: 56, name: "여름 데님숏 6", category: "bottom", season: "summer", gender: "male", imageId: "summer-6"},
    {id: 57, name: "여름 카고숏 7", category: "bottom", season: "summer", gender: "male", imageId: "summer-7"},
    {id: 58, name: "여름 스윔숏 8", category: "bottom", season: "summer", gender: "male", imageId: "summer-8"},
    {id: 59, name: "여름 트레이닝숏 9", category: "bottom", season: "summer", gender: "male", imageId: "summer-9"},
    {id: 60, name: "여름 면바지 10", category: "bottom", season: "summer", gender: "male", imageId: "summer-10"},

    // 가을 하의 (Bottom) - fall-bottom-1.png ~ fall-bottom-10.png
    {id: 61, name: "가을 슬랙스 1", category: "bottom", season: "fall", gender: "male", imageId: "fall-1"},
    {id: 62, name: "가을 청바지 2", category: "bottom", season: "fall", gender: "male", imageId: "fall-2"},
    {id: 63, name: "가을 코듀로이 3", category: "bottom", season: "fall", gender: "male", imageId: "fall-3"},
    {id: 64, name: "가을 울팬츠 4", category: "bottom", season: "fall", gender: "male", imageId: "fall-4"},
    {id: 65, name: "가을 치노팬츠 5", category: "bottom", season: "fall", gender: "male", imageId: "fall-5"},
    {id: 66, name: "가을 정장바지 6", category: "bottom", season: "fall", gender: "male", imageId: "fall-6"},
    {id: 67, name: "가을 카고팬츠 7", category: "bottom", season: "fall", gender: "male", imageId: "fall-7"},
    {id: 68, name: "가을 데님팬츠 8", category: "bottom", season: "fall", gender: "male", imageId: "fall-8"},
    {id: 69, name: "가을 면바지 9", category: "bottom", season: "fall", gender: "male", imageId: "fall-9"},
    {id: 70, name: "가을 트레이닝팬츠 10", category: "bottom", season: "fall", gender: "male", imageId: "fall-10"},

    // 겨울 하의 (Bottom) - winter-bottom-1.png ~ winter-bottom-10.png
    {id: 71, name: "겨울 기모바지 1", category: "bottom", season: "winter", gender: "male", imageId: "winter-1"},
    {id: 72, name: "겨울 정장바지 2", category: "bottom", season: "winter", gender: "male", imageId: "winter-2"},
    {id: 73, name: "겨울 두꺼운청바지 3", category: "bottom", season: "winter", gender: "male", imageId: "winter-3"},
    {id: 74, name: "겨울 울바지 4", category: "bottom", season: "winter", gender: "male", imageId: "winter-4"},
    {id: 75, name: "겨울 기모청바지 5", category: "bottom", season: "winter", gender: "male", imageId: "winter-5"},
    {id: 76, name: "겨울 패딩바지 6", category: "bottom", season: "winter", gender: "male", imageId: "winter-6"},
    {id: 77, name: "겨울 플리스바지 7", category: "bottom", season: "winter", gender: "male", imageId: "winter-7"},
    {id: 78, name: "겨울 보온바지 8", category: "bottom", season: "winter", gender: "male", imageId: "winter-8"},
    {id: 79, name: "겨울 스키바지 9", category: "bottom", season: "winter", gender: "male", imageId: "winter-9"},
    {id: 80, name: "겨울 두꺼운면바지 10", category: "bottom", season: "winter", gender: "male", imageId: "winter-10"},


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

    // 남성 신발 (Shoes) - shoes-1.png ~ shoes-20.png
    {id: 89, name: "운동화 1", category: "shoes", season: "universal", gender: "male", imageId: 1},
    {id: 90, name: "캐주얼화 2", category: "shoes", season: "universal", gender: "male", imageId: 2},
    {id: 91, name: "정장화 3", category: "shoes", season: "universal", gender: "male", imageId: 3},
    {id: 92, name: "부츠 4", category: "shoes", season: "universal", gender: "male", imageId: 4},
    {id: 93, name: "샌들 5", category: "shoes", season: "universal", gender: "male", imageId: 5},
    {id: 94, name: "로퍼 6", category: "shoes", season: "universal", gender: "male", imageId: 6},
    {id: 95, name: "하이탑 7", category: "shoes", season: "universal", gender: "male", imageId: 7},
    {id: 96, name: "슬리퍼 8", category: "shoes", season: "universal", gender: "male", imageId: 8},
    {id: 97, name: "워킹화 9", category: "shoes", season: "universal", gender: "male", imageId: 9},
    {id: 98, name: "드레스화 10", category: "shoes", season: "universal", gender: "male", imageId: 10},
    {id: 99, name: "농구화 11", category: "shoes", season: "universal", gender: "male", imageId: 11},
    {id: 100, name: "트레킹화 12", category: "shoes", season: "universal", gender: "male", imageId: 12},
    {id: 101, name: "컨버스 13", category: "shoes", season: "universal", gender: "male", imageId: 13},
    {id: 102, name: "구두 14", category: "shoes", season: "universal", gender: "male", imageId: 14},
    {id: 103, name: "캔버스화 15", category: "shoes", season: "universal", gender: "male", imageId: 15},
    {id: 104, name: "스니커즈 16", category: "shoes", season: "universal", gender: "male", imageId: 16},
    {id: 105, name: "어글리 17", category: "shoes", season: "universal", gender: "male", imageId: 17},
    {id: 106, name: "플랫폼 18", category: "shoes", season: "universal", gender: "male", imageId: 18},
    {id: 107, name: "런닝화 19", category: "shoes", season: "universal", gender: "male", imageId: 19},
    {id: 108, name: "겨울부츠 20", category: "shoes", season: "universal", gender: "male", imageId: 20},

    // 여성 신발 (Shoes) - 계절별로 구분
    // 봄 신발 (4개)
    {id: 109, name: "봄 플랫슈즈 1", category: "shoes", season: "spring", gender: "female", imageId: "spring-1"},
    {id: 110, name: "봄 로퍼 2", category: "shoes", season: "spring", gender: "female", imageId: "spring-2"},
    {id: 111, name: "봄 운동화 3", category: "shoes", season: "spring", gender: "female", imageId: "spring-3"},
    {id: 112, name: "봄 앵클부츠 4", category: "shoes", season: "spring", gender: "female", imageId: "spring-4"},

    // 여름 신발 (4개)
    {id: 113, name: "여름 샌들 1", category: "shoes", season: "summer", gender: "female", imageId: "summer-1"},
    {id: 114, name: "여름 스트랩힐 2", category: "shoes", season: "summer", gender: "female", imageId: "summer-2"},
    {id: 115, name: "여름 플립플롭 3", category: "shoes", season: "summer", gender: "female", imageId: "summer-3"},
    {id: 116, name: "여름 웨지힐 4", category: "shoes", season: "summer", gender: "female", imageId: "summer-4"},

    // 가을 신발 (6개)
    {id: 117, name: "가을 하이힐 1", category: "shoes", season: "fall", gender: "female", imageId: "fall-1"},
    {id: 118, name: "가을 부츠 2", category: "shoes", season: "fall", gender: "female", imageId: "fall-2"},
    {id: 119, name: "가을 옥스퍼드 3", category: "shoes", season: "fall", gender: "female", imageId: "fall-3"},
    {id: 120, name: "가을 펌프스 4", category: "shoes", season: "fall", gender: "female", imageId: "fall-4"},
    {id: 121, name: "가을 첼시부츠 5", category: "shoes", season: "fall", gender: "female", imageId: "fall-5"},
    {id: 122, name: "가을 워커 6", category: "shoes", season: "fall", gender: "female", imageId: "fall-6"},

    // 겨울 신발 (4개)
    {id: 123, name: "겨울 롱부츠 1", category: "shoes", season: "winter", gender: "female", imageId: "winter-1"},
    {id: 124, name: "겨울 털부츠 2", category: "shoes", season: "winter", gender: "female", imageId: "winter-2"},
    {id: 125, name: "겨울 스노우부츠 3", category: "shoes", season: "winter", gender: "female", imageId: "winter-3"},
    {id: 126, name: "겨울 앵클부츠 4", category: "shoes", season: "winter", gender: "female", imageId: "winter-4"},

  ];
}

// 옷 이미지 로드 함수
function loadClothImages() {
  // 남성 옷 이미지 (모든 계절)
  // 봄 옷
  for (let i = 1; i <= 10; i++) {
    clothImages.male.top[`spring-${i}`] = loadImage(`image/clothes/top/spring-top-${i}.png`);
    clothImages.male.bottom[`spring-${i}`] = loadImage(`image/clothes/bottom/spring-bottom-${i}.png`);
  }
  
  // 여름 옷
  for (let i = 1; i <= 10; i++) {
    clothImages.male.top[`summer-${i}`] = loadImage(`image/clothes/top/summer-top-${i}.png`);
    clothImages.male.bottom[`summer-${i}`] = loadImage(`image/clothes/bottom/summer-bottom-${i}.png`);
  }
  
  // 가을 옷
  for (let i = 1; i <= 10; i++) {
    clothImages.male.top[`fall-${i}`] = loadImage(`image/clothes/top/fall-top-${i}.png`);
    clothImages.male.bottom[`fall-${i}`] = loadImage(`image/clothes/bottom/fall-bottom-${i}.png`);
  }
  
  // 겨울 옷
  for (let i = 1; i <= 10; i++) {
    clothImages.male.top[`winter-${i}`] = loadImage(`image/clothes/top/winter-top-${i}.png`);
    clothImages.male.bottom[`winter-${i}`] = loadImage(`image/clothes/bottom/winter-bottom-${i}.png`);
  }
  
  // 남성 신발 이미지
  for (let i = 1; i <= 20; i++) {
    clothImages.male.shoes[i] = loadImage(`image/clothes/shoes/shoes-${i}.png`);
  }
  
  // 여성 신발 이미지 (계절별)
  // 봄 신발 (4개)
  for (let i = 1; i <= 4; i++) {
    clothImages.female.shoes[`spring-${i}`] = loadImage(`image/여자_봄/봄_신발_${i}.png`);
  }
  
  // 여름 신발 (4개)
  for (let i = 1; i <= 4; i++) {
    clothImages.female.shoes[`summer-${i}`] = loadImage(`image/여자_여름/여름_신발_${i}.png`);
  }
  
  // 가을 신발 (6개)
  for (let i = 1; i <= 6; i++) {
    clothImages.female.shoes[`fall-${i}`] = loadImage(`image/여자_가을/가을_신발_${i}.png`);
  }
  
  // 겨울 신발 (4개)  
  for (let i = 1; i <= 4; i++) {
    clothImages.female.shoes[`winter-${i}`] = loadImage(`image/여자_겨울/겨울_신발_${i}.png`);
  }
  
  // 여성 봄 옷 이미지
  for (let i = 1; i <= 7; i++) {
    clothImages.female.top[i] = loadImage(`image/여자_봄/봄_상의_${i}.png`);
  }
  for (let i = 1; i <= 8; i++) {
    clothImages.female.bottom[i] = loadImage(`image/여자_봄/봄_하의_${i}.png`);
  }
  
  // 여성 여름 옷 이미지
  for (let i = 1; i <= 8; i++) {
    clothImages.female.top[i + 10] = loadImage(`image/여자_여름/여름_상의_${i}.png`);
  }
  // 여름 하의는 1-16번까지 있지만, 실제로는 연속적이지 않은 파일들도 있음
  for (let i = 1; i <= 10; i++) {
    clothImages.female.bottom[i + 10] = loadImage(`image/여자_여름/여름_하의_${i}.png`);
  }
  
  // 여성 가을 옷 이미지
  for (let i = 1; i <= 10; i++) {
    clothImages.female.top[i + 20] = loadImage(`image/여자_가을/가을_상의_${i}.png`);
  }
  for (let i = 1; i <= 10; i++) {
    clothImages.female.bottom[i + 20] = loadImage(`image/여자_가을/가을_하의_${i}.png`);
  }
  
  // 여성 겨울 옷 이미지
  for (let i = 1; i <= 10; i++) {
    clothImages.female.top[i + 30] = loadImage(`image/여자_겨울/겨울_상의_${i}.png`);
  }
  for (let i = 1; i <= 8; i++) {
    clothImages.female.bottom[i + 30] = loadImage(`image/여자_겨울/겨울_하의_${i}.png`);
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
