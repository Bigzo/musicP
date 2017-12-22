// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import axios from 'axios'
import VueResource from 'vue-resource'
import filter from './filter/filter'

import store from './vuex/store'

import common from './assets/css/common'
import style from './assets/css/style'
import media from './assets/js/media'

import musicFoot from './components/musicFoot'
Vue.use(musicFoot)

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
  router,
  store
})
