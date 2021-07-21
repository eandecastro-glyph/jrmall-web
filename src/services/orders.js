import axios from 'axios';

class Orders {
    constructor(){
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL
        });
    }

    createPayment(data){
        return this.http.post(`/payment`, data);
    }
    getOrderDetails(referenceId){
        return this.http.get(`/order/${referenceId}`);
    }
}

export default new Orders();