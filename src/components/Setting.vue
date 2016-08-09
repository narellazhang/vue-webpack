
  <!-- src/components/Home.vue -->  

  <template>
    <header class="bar bar-nav">
      <h1 class='title'>设置</h1>
    </header>
    <div class="content">
        <div class="list-block">
            <ul>
                <li class="item-content item-link" v-link="'/tag'">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">编辑标签</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block-title"></div>
        <div class="list-block">
            <ul>
                <li class="item-content" v-on:click="logout();">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">退出登录</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
       
      }
    },
    methods: {
      logout() {
        auth.logout()
      }
    }
  }
  </script>