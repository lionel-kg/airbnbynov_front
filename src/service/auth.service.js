import axios from 'axios';

const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
  };

export default {
    register(body) {
        return axios
        .post(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/auth/register', JSON.stringify(body), customConfig)
    },
    login(body) {
        return axios
          .post(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/auth/login',JSON.stringify(body),customConfig)
    }, 
    refreshLogin(token) {
      let customConfig = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
      };
      return axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/auth/refreshLogin',customConfig)
    }
}
