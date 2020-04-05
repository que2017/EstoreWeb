import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Global from './components/Global.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.domainUrl = process.env.NODE_ENV !== 'production' ? Global.domainUrl : ''

new Vue({
  render: h => h(App),
}).$mount('#app')
