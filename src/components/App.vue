<!-- src/components/App.vue -->
  <template>
  <div class="container">
   <ul class="nav nav-pills">
          <li><a role="presentation" v-link="'/home'">Home</a></li>
          <li><a role="presentation" v-link="'/login'" v-if="!user.authenticated">Login</a></li>
          <li><a role="presentation" v-link="'/signup'" v-if="!user.authenticated">Sign Up</a></li>
          <li><a role="presentation" v-link="'/news'" v-if="user.authenticated">News</a></li>
          <li><a role="presentation" v-link="'/zhihu'" v-if="user.authenticated">Zhihu</a></li>
          <li><a role="presentation" v-link="'/login'" v-if="user.authenticated" @click="logout()">Logout</a></li>
        </ul>
     
    
      <router-view></router-view>
    </div>
  </template>

  <script>
  import auth from '../auth'
  require('../../node_modules/bootstrap/dist/css/bootstrap.css');

  export default {
    data() {
      return {
        user: auth.user
      }
    },
    methods: {
      logout() {
        auth.logout()
      }
    }
  }
  </script>
