<!-- src/components/App.vue -->
  <template>
 
    
      <nav class="bar bar-tab">
        <a class="tab-item external" v-link="'/home'">
          <span class="icon icon-home"></span>
          <span class="tab-label">主页</span>
        </a>
        <a class="tab-item external"  v-link="'/statistics'">
          <span class="icon icon-edit"></span>
          <span class="tab-label">统计</span>

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

  import auth from '../auth'


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
