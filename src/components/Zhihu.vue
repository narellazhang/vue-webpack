  <template>
  	<ul class="list-group" id="stories">
  		<li class="list-group-item" v-for="item in stories"><a  v-link="{name:'ZhihuDetail',params:{id:item.id}}">{{item.title}}</a></li>
  	</ul>
  </template>

  <script>
  
  export default {
    data() {
    this.getStories();	
      return {
        stories:[]  
      }
    },
    methods: {
     
       getStories(){
   
          	this.$http.get('http://news-at.zhihu.com/api/4/news/latest', (data) => {
            	console.log(data);
            	this.stories = data.stories;
       		})
          	.error((err) => console.log(err))

       	}
    }
  }
  </script>