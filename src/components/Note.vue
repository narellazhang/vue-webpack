 <!-- src/components/Login.vue -->

  <template>
    <header class="bar bar-nav">
  <h1 class='title'>记账</h1>
</header>
<div class="content">
  <div class="list-block">
    <ul>
      <!-- Text inputs -->
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-name"></i></div>
          <div class="item-inner">
            <div class="item-title label">金额：</div>
            <div class="item-input">
              <input type="text" v-model="money" placeholder="">
            </div>
          </div>
        </div>
      </li>
     
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
              <!-- <input type="text" v-model="type" id="picker"> -->
              <select name="tag" v-model="tag_id" v-show="type==0">
                <option  v-for="item in tagOut" value="{{item.id}}">{{item.tag_name}}</option>
               
              </select>
              <select name="tag" v-model="tag_id" v-show="type==1">
                 <option  v-for="item in tagIn" value="{{item.id}}">{{item.tag_name}}</option>      
              </select>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-password"></i></div>
          <div class="item-inner">
            <div class="item-title label">备注：</div>
            <div class="item-input">
              <input type="text" v-model="remark" placeholder="" class="">
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
      this.getTag();
      return {
          money: '',
          type: '',
          remark: '',
          tag_id:'',
          tagOut : '',
          tagIn:''
      }
    },
    methods: {
       getTag() {
        var user_id = localStorage.getItem('user_id');
        if(!user_id){
           alert('登陆失效，请重新登陆');
           router.go('login')

        }
        var paramIn = {
          'url':'tag/queryByType',
          'data':{
            'user_id':user_id,
            'type':1
          }
        }
        API.GetRequest(this,paramIn,(data) => {
          if(data&&data.length>0){
            this.tagIn = data;
          }
        });
        var paramOut = {
          'url':'tag/queryByType',
          'data':{
            'user_id':user_id,
            'type':0
          }
        }
        API.GetRequest(this,paramOut,(data) => {
          if(data&&data.length>0){
            this.tagOut = data;
          }
        });
         
      },
      submit() {
        var user_id = localStorage.getItem('user_id');
        if(!user_id){
           alert('登陆失效，请重新登陆');
           router.go('login')

        }
        var params = {
          'url':'notes/addNote',
          'data':{
            'user_id':user_id,
            'money':this.money,
            'type':this.type,
            'remark':this.remark,
            'tag_id':this.tag_id,
            'tag_name':(this.type==1)?this.tagIn[this.tag_id]:this.tagOut[this.tag_id]
          }
        };
        API.PostRequest(this,params,(data) => {
          if(data.code==200){
            alert(data.msg)
            router.go('home')
          }
          

        });
         
      },
      goBack(){
        router.go(window.history.back())
      },
    }

  }
  </script>