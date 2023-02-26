import axios from "axios";

const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
  };
  
export default {

    createBooking(body,token) {
        let customConfig = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
          };
        return axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/booking",body,customConfig)
    },

    getBookings(token) {
      let customConfig = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
      };
      return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/booking",customConfig)
    },
    getMyBooking(token) {
      let customConfig = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
      };
      return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/booking/me",customConfig)
    },
    getMyTravel(token) {
      let customConfig = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
      };
      return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1/booking/travel",customConfig)
    },
}