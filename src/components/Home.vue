
  <!-- src/components/Home.vue -->

  <template>
    
     <header class="bar bar-nav">
      <h1 class="title">账单条目</h1>
    </header>
    <div class="list-block media-list" v-if="items">
      <ul>
        <li v-for="item in items">
         <a href="#" class="item-link item-content" v-on:click="delNote({{item.id}})">
        <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">{{ item.create_time.substr(0,10) }}</div>
            <div class="item-after">￥{{ item.money }}</div>
          </div>
          <div class="item-subtitle">{{ item.tag_name }}</div>
          <div class="item-text">{{ item.remark }}</div>
        </div>
      </a>
        </li>
      </ul> 
    </div>
  
  </template>

  <script>
  var _ = require('lodash');
   import API from '../auth/api'
  export default {

    data() {
      this.getQuote();
      return {
        items: ''
      }
    },
    methods: {
      getQuote() {
        var params = {
          'url':'notes/queryAll'
        };
        API.GetRequest(this,params,(data) => {
          this.items = data;

        });
         
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

            }

        });
        /* this.$http.get('notes/deleteNote',{id:id}, (data) => {
            if(data.code==200){
              this.items = _.dropWhile(this.items, function(o) { return o.id==id }); 
              alert(data.msg);

            }

          })
          .error((err) => console.log(err))*/
      }
    }
  }
  </script>