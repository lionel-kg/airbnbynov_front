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
    }
}