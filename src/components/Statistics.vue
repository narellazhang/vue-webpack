
  <!-- src/components/statistics.vue -->

  <template>
    
    <header class="bar bar-nav">
      <h1 class="title">账单统计</h1>
    </header>
    <div class="content">
        <div class="buttons-tab">
            <a href="#tab4" class="tab-link active button">全部</a>
            <a href="#tab5" class="tab-link button">收入</a>
            <a href="#tab6" class="tab-link button">支出</a>
        </div>
        <div class="content-block">
            <div class="tabs">
                <div id="tab4" class="tab active">
                   <!-- <pie-example></pie-example> -->
                   <canvas id="myChart" v-if="modalShow"></canvas>
                    <button @click="rerender">rerender</button>
                </div>
                <div id="tab5" class="tab">
                  <p>tab5</p>
                </div>
                <div id="tab6" class="tab">
                  <p>tab6</p>
                </div>
            </div>
        </div>
    </div>
  </template>

  <script>
    import $ from 'zepto'
    import API from '../auth/api'
    import common from '../auth/common'
    import {router} from '../index'
    /*import PieExample from './PieExample'*/
    import Chart from 'chart'
    import {Pie} from 'chart'
  export default {

    data() {
     
      this.getQuote();
      return {
        opt:'',
        items: '',
        modalShow:''
       
      }
    },
    methods: {
     
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
            //this.items = data;
            this.opt = {
              segmentStrokeColor:'#f00',
              fillColorBackground:'rgb(0,255,0)'
            };
            this.items = [
              {
                value: 30,
                color:"#F38630", 
                highlight: "#FF5A5E",
                label: "Red"
              },
              {
                value : 50,
                color : "#E0E4CC",
                highlight: "#5AD3D1",
                label: "Green"
              },
              {
                value : 100,
                color : "#69D2E7",
                highlight: "#FFC870",
                label: "Yellow"
              }     
            ];
            this.modalShow = true;
            var ctx = document.getElementById("myChart").getContext("2d");
            new Chart(ctx).Pie(this.items,this.opt);
            
          } 
        });
       
      },
      rerender() { 

        this.modalShow = true;
        var ctx = document.getElementById("myChart").getContext("2d");
        var myPieChart = new Chart(ctx,{
            type: 'pie',
            data: this.items,
            options: this.opt
        });
      }
    }/*,
    components: { PieExample }*/
}
  </script>