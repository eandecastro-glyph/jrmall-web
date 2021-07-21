import User from '@/services/user.js';

const state = {
    show: false,
    text:'',
};

const getters = {

};

const actions = {
    verifyMobileOperator({commit},data){
        return new Promise((resolve, reject) => {
            User.verifyMobileOperator(data).then(res =>{
                resolve(res.data)
            }).catch(error => {
                commit('showError', error.response.data.message)
                reject(error)
            });
        })
    },
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