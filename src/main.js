// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from 'vue-resource'
import axios from 'axios'
import store from '@/store'
import VueCorvova from 'vue-cordova'


Vue.config.productionTip = false

Vue.use(http)

Vue.use(VueCorvova)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
