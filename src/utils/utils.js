import happySvg from "../assets/happy.svg";
import angrySvg from "../assets/angry.svg";
import embarSvg from "../assets/embar.svg";
import neutralSvg from "../assets/soso.svg";
import anxiousSvg from "../assets/anxious.svg";
import excitedSvg from "../assets/joy.svg";
import sadSvg from "../assets/sad.svg";
import tiredSvg from "../assets/strength.svg";

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
  switch (emotion) {
    case "ANGRY":
      return angrySvg;
    case "HAPPY":
      return happySvg;
    case "EMBARRASSED":
      return embarSvg;
    case "SAD":
      return sadSvg;
    case "NEUTRAL":
      return neutralSvg;
    case "EXCITED":
      return excitedSvg;
    case "ANXIOUS":
      return anxiousSvg;
    case "TIRED":
      return tiredSvg;
    default:
      return "";
  }
};


export const getDateString = (date) => {
  return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
}

export const convertToDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}