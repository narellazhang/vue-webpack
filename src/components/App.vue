<!-- src/components/App.vue -->
  <template>
 
    
      <nav class="bar bar-tab">
        <a class="tab-item external" v-link="'/home'">
          <span class="icon icon-home"></span>
          <span class="tab-label">账本</span>
        </a>
        <a class="tab-item external"  v-link="'/addnote'">
          <span class="icon icon-edit"></span>
          <span class="tab-label">记账</span>

        </a>

        <a class="tab-item external"  v-if="user.authenticated" v-link="'/setting'">
          <span class="icon icon-settings"></span>
          <span class="tab-label">设置</span>
        </a>
          <a class="tab-item external"  v-if="!user.authenticated" v-link="'/login'">
          <span class="icon icon-me"></span>
          <span class="tab-label">登录</span>
        </a>
      </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </template>

  <script>
  require('../assets/css/index.css');
  import $ from 'zepto'
  import auth from '../auth/api'


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
