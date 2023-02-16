import axios from 'axios';

const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
  };

export default {
    getTypePlaces() {
        return axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/type-place', customConfig)
    },
}