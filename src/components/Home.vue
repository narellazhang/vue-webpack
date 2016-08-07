
  <!-- src/components/Home.vue -->

  <template>
    
    <header class="bar bar-nav">
      <h1 class="title">账单条目</h1>
    </header>
    <div class="content">
        <div class="buttons-tab">
            <a href="#tab1" class="tab-link active button">全部</a>
            <a href="#tab2" class="tab-link button">收入</a>
            <a href="#tab3" class="tab-link button">支出</a>
        </div>
        <div class="content-block">
            <div class="tabs">
                <div id="tab1" class="tab active">
                    <div class="list-block media-list" v-if="items">
                        <ul>
                            <li v-for="item in items">
                                <!-- <a href="#" class="item-link item-content" v-on:click="delNote(item.id)"> -->
                                <a v-link="{name:'NoteDetail',params:{id:item.id}}" class="item-link item-content">
                                    <div class="item-media"><img src="{{getImg(item.id)}}" style='width: 4rem;'></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">{{ longTimeFormat(item.create_time) }}</div>
                                            <div class="item-after text-danger" v-if="item.type==0">￥{{ item.money }}</div>
                                            <div class="item-after text-success" v-if="item.type==1">￥{{ item.money }}</div>
                                        </div>
                                        <div class="item-subtitle">{{ item.tag_name }}</div>
                                        <div class="item-text">{{ item.remark }}</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block media-list" v-if="!items">
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
                <div id="tab2" class="tab">
                    <div class="list-block media-list" v-if="itemsIn">
                        <ul>
                            <li v-for="item in itemsIn">
                                <a v-link="{name:'NoteDetail',params:{id:item.id}}" class="item-link item-content">
                                    <div class="item-media"><img src="{{getImg(item.id)}}" style='width: 4rem;'></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">{{ longTimeFormat(item.create_time) }}</div>
                                            <div class="item-after text-success">￥{{ item.money }}</div>
                                        </div>
                                        <div class="item-subtitle">{{ item.tag_name }}</div>
                                        <div class="item-text">{{ item.remark }}</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block media-list" v-if="!itemsIn">
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
                    <div class="list-block media-list" v-if="itemsOut">
                        <ul>
                            <li v-for="item in itemsOut">
                                <a v-link="{name:'NoteDetail',params:{id:item.id}}" class="item-link item-content">
                                    <div class="item-media"><img src="{{getImg(item.id)}}" style='width: 4rem;'></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">{{ longTimeFormat(item.create_time) }}</div>
                                            <div class="item-after text-danger">￥{{ item.money }}</div>
                                        </div>
                                        <div class="item-subtitle">{{ item.tag_name }}</div>
                                        <div class="item-text">{{ item.remark }}</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block media-list" v-if="!itemsOut">
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
      this.getQuote();
      return {
        items: '',
        itemsIn:'',
        itemsOut:'',
      }
    },
    methods: {
      longTimeFormat(ns){
        return common.longTimeFormat(ns)
      },
      getQuote() {
        var user_id = localStorage.getItem('user_id');
        if(!user_id){
           alert('登陆失效，请重新登陆');
           router.go('login')

        }
        var params = {
          'url':'notes/query',
          'data':{
            'user_id':user_id
          }
        };
        API.GetRequest(this,params,(data) => {
          if(data&&data.length>0){
            this.items = data;
          } 
        });
        var paramIn = {
          'url':'notes/queryByType',
          'data':{
            'user_id':user_id,
            'type':1
          }
        }
        API.GetRequest(this,paramIn,(data) => {
          if(data&&data.length>0){
            this.itemsIn = data;
          }
        });
        var paramOut = {
          'url':'notes/queryByType',
          'data':{
            'user_id':user_id,
            'type':0
          }
        }
        API.GetRequest(this,paramOut,(data) => {
          if(data&&data.length>0){
            this.itemsOut = data;
          }
        });
         
      },
      getImg(id){
        return '/src/assets/img/Fruit-'+(id%20)+'.png';
      }
    }
  }
  </script>