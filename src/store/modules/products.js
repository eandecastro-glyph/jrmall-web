import Products from '@/services/products.js';

const state = {
    show: false,
    text:'',
};

const getters = {

};

const actions = {
    getProductList({commit},data){
        return new Promise((resolve, reject) => {
            Products.getProducts(data).then(res =>{
                resolve(res.data)
            }).catch(error => {
                commit('showError', error.response.data.message)
                reject(error)
            });
        })
    }
};

const mutations = {
    showError(state,message){
        state.show = true;
        state.text = message
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}