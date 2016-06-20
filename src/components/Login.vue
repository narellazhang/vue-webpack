 <!-- src/components/Login.vue -->

  <template>
    <header class="bar bar-nav">
  <h1 class='title'>登录</h1>
</header>
<div class="content">
  <div class="list-block">
    <ul>
      <!-- Text inputs -->
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-name"></i></div>
          <div class="item-inner">
            <div class="item-title label">账号</div>
            <div class="item-input">
              <input type="text" v-model="name" placeholder="Your name">
            </div>
          </div>
        </div>
      </li>
     
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-password"></i></div>
          <div class="item-inner">
            <div class="item-title label">密码</div>
            <div class="item-input">
              <input type="password" v-model="psw" placeholder="Password" class="">
            </div>
          </div>
        </div>
      </li>
      
      
    
    </ul>
  </div>
  <div class="content-block">
    <div class="row">
    <div class="col-50"><a href="javascript:void(0);" class="button button-big button-fill button-success" v-on:click="submit">登录</a></div>
      <div class="col-50"><a href="javascript:void(0);" class="button button-big button-fill">取消</a></div>
      
    </div>
  </div>
</div>
  </template>

  <script>
  import auth from '../auth'
  export default {
    data() {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          name: '',
          psw: ''
        },
        error: ''
      }
    },
    methods: {
      submit() {
        var credentials = {
          name: this.name,
          psw: this.psw
        };
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials, 'home');
        return false;
      }
    }

  }
  </script>