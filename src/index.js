// src/index.js

import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth/api'

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
  '/note/:id': {
    name:'NoteDetail',
    component: function (resolve) {
      require(['./components/NoteDetail.vue'], resolve)
    }
  },
  '/noteUpdate/:id': {
    name:'NoteUpdate',
    component: function (resolve) {
      require(['./components/NoteUpdate.vue'], resolve)
    }
  },
  '/tag': {
    component:  function (resolve) {
      require(['./components/TagList.vue'], resolve)
    }
  },
    '/addTag': {
    component:  function (resolve) {
      require(['./components/Tag.vue'], resolve)
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
  },
  '/news': {
    component:  function (resolve) {
      require(['./components/News.vue'], resolve)
    }
  },
  '/news/:id':{
    name : 'Detail',
    component: function (resolve) {
      require(['./components/NewsDetail.vue'], resolve)
      } 
  },
  '/setting':{
    component:  function (resolve) {
      require(['./components/Setting.vue'], resolve)
      }
  },
  '/statistics':{
    component:  function (resolve) {
      require(['./components/Statistics.vue'], resolve)
      }
  },
  '/addnote':{
    component:  function (resolve) {
      require(['./components/Note.vue'], resolve)
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


