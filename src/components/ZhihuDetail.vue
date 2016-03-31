  <template>
    <div id="cont" class="content news_detail">

    {{{item}}}
    </div>

  </template>

  <script>
  
  export default {
    data() {
      /* this.topicId=transition.to.params.id;
        this.getDetail(this.topicId); */
      return {
        item:{}
      }
    },
    methods: {
        longtimeFormat(ns){
          var now = new Date(ns)
          var   year=now.getFullYear();     
          var   month=now.getMonth()+1;     
          var   date=now.getDate();     
                
          return   year+"-"+month+"-"+date; 
        }
    },
    route:{
        data (transition){
            //获取url传的tab参数
            this.topicId=transition.to.params.id;

            //加载主题数据
            this.$http.get('http://news-at.zhihu.com/api/4/news/'+this.topicId,function(data){
               
                   this.item = data.body;

                
            });
        }
    }
  }
  </script>