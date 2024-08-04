export const getKoDayOfWeek = (dayOfWeek) => {
    switch (dayOfWeek) {
        case 0:
            return "일요일";
        case 1:
            return "월요일";
        case 2:
            return "화요일";
        case 3:
            return "수요일";
        case 4:
            return "목요일";
        case 5:
            return "금요일";
        case 6:
            return "토요일";
    }
}

export const getUsDayOfWeek = (dayOfWeek) => {
    switch (dayOfWeek) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
}

export const getImagePathByEmotion = (emotion) => {
    const imagePaths = {
        불안: "anxiousImg",
        보통: "sosoImg",
        힘듦: "strengthImg",
        즐거움: "joyImg",
        행복: "happyImg",
        화남: "angryImg",
        당황스러움: "embarImg",
        슬픔: "sadImg"
    };
    return imagePaths[emotion] || "errorImg"; // 키워드가 없으면 null 반환
};


export const setAuthStorage = ({token, vender}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('vender', vender);
}

export const resetAuthStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('vender');
}