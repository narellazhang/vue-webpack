  <template>
    <div id="cont" class="content news_detail">

    <h1 class="news_title" >{{item.title}}</span></h1>
      <p class="news_info" >
        发布人：
        <span id="author">{{item.author}}</span>
        <span class="f-fr">
          发布日期：
          <span id="createTime">{{longtimeFormat(item.createTime)}}</span>

        </p>
     
        <div class="news_summary">
          <p>
            <span class="summary">摘要</span>
            <span id="omit1" >{{item.contentDigest}}</span>
          </p>
        </div>
        

        <p class="news_content">{{{item.content}}}</p>
        <p class="appraise">
          <span class="zan icon-thumbs-o-up"></span>
          <span id="praiseAmount"></span>
        </p>

      </div>

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
     
       getDetail(id){
   
            this.$http.get('http://wx.hstc.edu.cn/hs-mobile-portal/hanshi_public/toNewsDetail.do?hsCampusInfoDto.id='+id, (data) => {
              console.log(data);
              this.item = data.obj;
          })
            .error((err) => console.log(err))

        },
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
            this.$http.jsonp('http://gzzh.eduitv.cn/mp-jxhd-xlfd-server/rest/xlfd/news/get_xlfd_news_callback?news_id='+this.topicId+'&viewOpenId=',function(data){
               
                   this.item = data.obj;

                
            });
        }
    }
  }
  </script>