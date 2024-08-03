import {Api} from "./index.js";

export const getMyInfo = () => Api.get("/members/me");

export const login = ({email, password}) => Api.post("/members/login", {email, password});

export const signUp = ({email, password, nickname}) => Api.post("/members/join", {email, password, nickname});