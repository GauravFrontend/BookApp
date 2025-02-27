import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://64.227.142.191:8080/application-test-v1.1",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;

