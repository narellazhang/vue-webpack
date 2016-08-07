 <!-- src/components/Login.vue -->

  <template>
    <header class="bar bar-nav">
	  <h1 class='title'>账单详情</h1>
	</header>
	<div class="content">
	  <div class="card">
	    <div class="card-header">{{item.tag_name}}<a href="javascript:void(0);" class="button button-dark" v-on:click="goBack">返回</a></div>
	    <div class="card-content">
	      <div class="card-content-inner">
	      	<p>金额：{{item.money}}</p>
	      	<p>类型：{{item.type==0?'支出':'收入'}}</p>
	      	<p>备注：{{item.remark}}</p>
	      	<p>时间：{{longTimeFormat(item.create_time)}}</p>
	      </div>
	    </div>
	    <div class="card-footer"><a v-link="{name:'NoteUpdate',params:{id:item.id}}" class="button">修改</a><a href="#" v-on:click="delNote(item.id)"  class="button button-danger">删除</a></div>
	  </div>
	</div>
  </template>

  <script>
  var _ = require('lodash');
   import API from '../auth/api'
   import common from '../auth/common'
   import {router} from '../index'
  export default {

    data() {
      return {
        item:{},  
      }
    },
    route:{
      data (transition){
      	var user_id = localStorage.getItem('user_id');
        if(!user_id){
           alert('登陆失效，请重新登陆');
           router.go('login')

        }
        var params = {
          'url':'notes/queryById',
          'data':{
            'id':transition.to.params.id
          }
        };
        API.GetRequest(this,params,(data) => {
          if(data&&data.length>0){
            this.item = data[0];
            console.log(this.item);
          } 
        });
      }
    },
    methods: {
      longTimeFormat(ns){
        return common.longTimeFormat(ns)
      },
      delNote(id){
        var params = {
          'url':'notes/deleteNote',
          'data':{
            'id':id
          }
        };
        API.GetRequest(this,params,(data) => {
         if(data.code==200){
              this.items = _.dropWhile(this.items, function(o) { return o.id==id }); 
              alert(data.msg);
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