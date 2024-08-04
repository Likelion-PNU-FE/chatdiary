import {Api} from "./index.js";

// user
export const getMyInfo = () => Api.get("/members/me");

export const login = ({email, password}) => Api.post("/members/login", {email, password});

export const signUp = ({email, password, nickname}) => Api.post("/members/join", {email, password, nickname});

// diary
export const getDiaryRecentEmotion = (date) => Api.get("/diaries/emotion/range", {params: {targetDate: date}});

export const getDiaryContent = (targetDate) => Api.get("/diaries/date", {params: {targetDate}});

export const getMonthEmotions = (yearMonth) => Api.get(`/diaries/emotion/months`, {params: {yearMonth}});

export const postChatRoom = ({title, date}) => Api.post("/chatRoom", {title, date});

export const deleteDiary = (diaryId) => Api.delete(`/diaries/${diaryId}/user`);