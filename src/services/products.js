import axios from 'axios';

class Products {
    constructor(){
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL
        });
    }

    getProducts(){
        return this.http.get(`/products`);
    }
}

export default new Products();