// src/index.js

import Vue from 'vue'
import App from './components/App.vue'
/*import Home from './components/Home.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Zhihu from './components/Zhihu.vue'
import Detail from './components/Detail.vue'*/
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth'

// Check the users auth status when the app starts
auth.checkAuth()

export var router = new VueRouter()

// Set up routing and match routes to components
//函数返回的这种模式是动态载入组件
router.map({
  '/home': {
    component: function (resolve) {
      require(['./components/Home.vue'], resolve)
    }
  },
  'secretquote': {
    component:  function (resolve) {
      require(['./components/SecretQuote.vue'], resolve)
    }
  },
  '/login': {
    component:  function (resolve) {
      require(['./components/Login.vue'], resolve)
    }
  },
  '/signup': {
    component:  function (resolve) {
      require(['./components/Signup.vue'], resolve)
    }
  },
  '/zhihu': {
    component:  function (resolve) {
      require(['./components/Zhihu.vue'], resolve)
      }
  },
  'zhihu/:id':{
    name : 'ZhihuDetail',
    component: function (resolve) {
      require(['./components/ZhihuDetail.vue'], resolve)
      } 
  }
})

// Redirect to the home route if any routes are unmatched
router.redirect({
  '*': '/home'
})

// Start the app on the #app div
router.start(App, '#app')

//Optional
Vue.http.headers.common['Authorization'] = auth.getAuthHeader();


