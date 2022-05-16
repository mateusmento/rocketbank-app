import axios from "axios";
import { BASE_API_URL } from "../config";

export function http() {
	let headers = {};
	let token = localStorage.getItem("accessToken");
	if (token) headers.Authorization = `Bearer ${token}`;
	return axios.create({ baseURL: BASE_API_URL, headers });
}
