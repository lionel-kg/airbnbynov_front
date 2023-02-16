import axios from "axios";

export default {
    getMe(token) {
        const customConfig = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        };
        return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/user/",customConfig);
    },
    UpdateMe(token,body) {
        const customConfig = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        };
        return axios.put(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/user/",body,customConfig);
    }
}