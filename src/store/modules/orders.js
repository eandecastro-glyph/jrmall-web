import Orders from '@/services/orders.js';

const state = {
    show: false,
    text:'',
};

const getters = {

};

const actions = {
    createOrder({commit},data){
        return new Promise((resolve, reject) => {
            Orders.createPayment(data).then(res =>{
                resolve(res.data)
            }).catch(error => {
                commit('showError', error.response.data.message)
                reject(error)
            });
        })
    },
    getOrderDetails({commit}, referenceId){
        return new Promise((resolve, reject) => {
            Orders.getOrderDetails(referenceId).then(res =>{
                console.log('RESULTS', res.data)
                resolve(res.data.Item)
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