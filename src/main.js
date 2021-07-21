import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import Vuelidate from 'vuelidate'

// Using form validation
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  render: h => h(App)
}).$mount('#app')
