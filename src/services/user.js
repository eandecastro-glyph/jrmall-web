import axios from 'axios';

class User {
    constructor(){
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL
        });
    }

    verifyMobileOperator(data){
        return this.http.get(`/verify/${data.mobileNumber}`);
    }
}

export default new User();