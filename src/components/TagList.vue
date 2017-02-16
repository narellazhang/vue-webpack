
  <!-- src/components/Home.vue -->

  <template>
    
    <header class="bar bar-nav">
      <button class="button pull-right" v-link="'/addTag'">
        新增
      </button>
      <h1 class="title">账单条目</h1>
    </header>
    <div class="content">
        <div class="buttons-tab">
            <a href="#tab2" class="tab-link active button">收入</a>
            <a href="#tab3" class="tab-link button">支出</a>
        </div>
        <div class="content-block">
            <div class="tabs">
                <div id="tab2" class="tab active">
                    <div class="list-block media-list" v-if="tagIn">
                        <ul>
                            <li v-for="item in tagIn">
                              <div class="item-content">
                                <div class="item-media"><img src="{{getImg(item.id)}}" style='width: 2.2rem;'></div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">{{item.tag_name}}</div>
                                  </div>
                                  <div class="item-subtitle"><a href="#" v-on:click="delTag(item.id)"  class="button button-danger fr">删除</a></div>
                                </div>
                              </div>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block media-list" v-if="!tagIn">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><img src="/src/assets/img/Fruit-20.png" style='width: 2.2rem;'></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">暂无数据</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="tab3" class="tab">
                    <div class="list-block media-list" v-if="tagOut">
                        <ul>
                            <li v-for="item in tagOut">
                              <div class="item-content">
                                <div class="item-media"><img src="{{getImg(item.id)}}" style='width: 2.2rem;'></div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">{{item.tag_name}}</div>
                                  </div>
                                  <div class="item-subtitle"><a href="#" v-on:click="delTag(item.id)"  class="button button-danger fr">删除</a></div>
                                </div>
                              </div>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block media-list" v-if="!tagOut">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><img src="/src/assets/img/Fruit-20.png" style='width: 2.2rem;'></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">暂无数据</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
      this.getTag();
      return {
        tagIn:'',
        tagOut:'',
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
      getImg(id){
        return '/src/assets/img/Fruit-'+((20-id)%20)+'.png';
      },
      delNote(id){
        var params = {
          'url':'tag/deleteTag',
          'data':{
            'id':id
          }
        };
        API.GetRequest(this,params,(data) => {
         if(data.code==200){
              this.items = _.dropWhile(this.items, function(o) { return o.id==id }); 
              alert(data.msg);
              router.go('tag')

            }

        });   
      },
    }
  }
  </script>