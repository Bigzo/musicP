// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import axios from 'axios'
import VueResource from 'vue-resource'
// import './assets/js/rem'
import common from './assets/css/common'
// require('./assets/css/common')

Vue.prototype.$http = axios
Vue.use(VueResource)

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
