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
                <option value="1">生活必需品</option>
                <option value="2">娱乐</option>
                <option value="3">衣服鞋包</option>             
              </select>
              <select name="tag" v-model="tag_id" v-show="type==1">
                <option value="1">工资</option>
                <option value="2">投资理财</option>
                <option value="3">意外收入</option>             
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
      <div class="col-50"><a href="javascript:void(0);" class="button button-big button-fill">取消</a></div>
      
    </div>
  </div>
</div>
  </template>

  <script>

  import API from '../auth/api'
  export default {
    data() {
      $("#picker").picker({
        toolbarTemplate: '<header class="bar bar-nav">\
        <button class="button button-link pull-left">按钮</button>\
        <button class="button button-link pull-right close-picker">确定</button>\
        <h1 class="title">标题</h1>\
        </header>',
        cols: [
          {
            textAlign: 'center',
            values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
          }
        ]
      });
      

      return {
          money: '',
          type: '',
          remark: '',
          tag_id:'',
          tagOut : {
            '1':'生活必需品',
            '2':'娱乐',
            '3':'衣服鞋包'
          },
          tagIn:{
            '1':'工资',
            '2':'投资理财',
            '3':'意外收入'
          }
      }
    },
    methods: {
      submit() {
        var params = {
          'url':'notes/addNote',
          'data':{
            'user_id':localStorage.getItem('user_id'),
            'money':this.money,
            'type':this.type,
            'remark':this.remark,
            'tag_id':this.tag_id,
            'tag_name':this.type?this.tagIn[this.tag_id]:this.tagOut[this.tag_id]
          }
        };
        API.PostRequest(this,params,(data) => {
          if(data.code==200){
            alert(data.msg)
          }
          

        });
         
      },
    }

  }
  </script>