import axios from "axios";

import * as dotenv from 'dotenv';
dotenv.config();

const axiosInstance = axios.create({
    baseURL: `http://0.0.0.0:8000/go/`,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance
