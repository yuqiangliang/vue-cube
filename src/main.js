import Vue from 'vue'
import App from './app.vue'

import router from './router'


import './js/plugs'

import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

router.beforeEach((to, from ,next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
