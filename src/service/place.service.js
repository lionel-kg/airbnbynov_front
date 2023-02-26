import axios from 'axios';

const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
  };

export default {
    getPlaces() {
        return axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/place', customConfig)
    },

    getPlace(id) {
        return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/place/'+id, customConfig)
    },
    searchPlace(name) {
        return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/place/search/places?name="+name)
    },
    filterPlaces(filter) {
        return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/place/filter/places?"+filter)
    },
    createPlace(body,token) {
        let customConfig = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
          };
        return axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/place",body,customConfig)
    },
    getMyPlace(token) {
        let customConfig = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        };
        return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1/place/me', customConfig)
    },
}