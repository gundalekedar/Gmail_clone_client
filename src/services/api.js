// for fetch data we used axios 
import axios from 'axios';


const API_URL = 'http://localhost:8000';
// const API_URL = ' ';

// this is project we used  axios as api it is a function base
// there are different method also present like intercepoter and instances
const API_GMAIL = async (urlObject,payload ,type) => {
   return await axios({
        method: urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}`,
        // it is like payload
        data: payload
    }) 
}

export default API_GMAIL;