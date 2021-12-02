import axios from "axios";

import * as dotenv from 'dotenv';
dotenv.config();

const axiosInstance = axios.create({
    baseURL: `https://soundauth.ru/go/`,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance
