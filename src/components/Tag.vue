 <!-- src/components/Login.vue -->

  <template>
    <header class="bar bar-nav">
  <h1 class='title'>账单标签</h1>
</header>
<div class="content">
  <div class="list-block">
    <ul>
      <!-- Text inputs -->
     
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-password"></i></div>
          <div class="item-inner">
            <div class="item-title label">类型：</div>
            <div class="item-input">
              <!-- <input type="text" v-model="type" id="picker"> -->
              <select name="type" v-model="type" >
                <option value="0">支出</option>
                <option value="1">收入</option>             
              </select>
            </div>
          </div>
        </div>
      </li>
       
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-password"></i></div>
          <div class="item-inner">
            <div class="item-title label">标签：</div>
            <div class="item-input">
             <input type="text" v-model="tag_name" placeholder="" class="">
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="content-block">
    <div class="row">
    <div class="col-50"><a href="javascript:void(0);" class="button button-big button-fill button-success" v-on:click="submit">确认</a></div>
      <div class="col-50"><a href="javascript:void(0);" class="button button-big button-fill" v-on:click="goBack">取消</a></div>
      
    </div>
  </div>
</div>
  </template>

  <script>

  import API from '../auth/api'
  import {router} from '../index'
  export default {
    data() {
      return {
          type: '',
          tab_name: ''
      }
    },
    methods: {
      submit() {
        var user_id = localStorage.getItem('user_id');
        if(!user_id){
           alert('登陆失效，请重新登陆');
           router.go('login')

        }
        var params = {
          'url':'tag/addTag',
          'data':{
            'user_id':localStorage.getItem('user_id'),
            'tag_name':this.tag_name,
            'type':this.type
          }
        };
        API.PostRequest(this,params,(data) => {
          if(data.code==200){
            alert(data.msg)
            router.go('tag')
          }
          

        });
         
      },
      goBack(){
        router.go(window.history.back())
      },
    }

  }
  </script>