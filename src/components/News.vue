<!-- src/components/News.vue -->

<template>
  
   

    <ul class="list-group" id="news">
      <li class="list-group-item" v-for="item in news">
      <a  v-link="{name:'Detail',params:{id:item.id}}"><img src="{{item.coverPic}}" class="img-responsive" alt="Responsive image"><h4 class="title">{{item.title}}</h4></a>

      </li>
    </ul>

</template>

<script>
  
  export default {
    data() {
      this.getNews();
      return {
       
        news:[]
         
        
      }
    },
    methods: {
      getNews() {
        this.$http
          .get('http://gzzh.eduitv.cn/mp-jxhd-xlfd-server/rest/xlfd/news/query?page_number=1&page_size=10&state=1&type=&viewOpenId=', (data) => {
            this.news = data.resultList;

          })
          .error((err) => console.log(err))
      }
    }
  }
  </script>