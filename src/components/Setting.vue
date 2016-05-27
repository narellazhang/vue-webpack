
  <!-- src/components/Home.vue -->  

  <template></div>
  <div class="list-block">
    <ul>
      <li class="item-content item-link">
        <div class="item-media"> <i class="icon icon-f7"></i>
        </div>
        <div class="item-inner">
          <div class="item-title">商品名称</div>
          <div class="item-after">杜蕾斯</div>
        </div>
      </li>
      <li class="item-content item-link">
        <div class="item-media"> <i class="icon icon-f7"></i>
        </div>
        <div class="item-inner">
          <div class="item-title">型号</div>
          <div class="item-after">极致超薄型</div>
        </div>
      </li>
    </ul>
  </div>

  </template>

  <script>
  export default {
    data() {
      return {
        quote: '',
        title:'设置'
      }
    },
    methods: {
      getQuote() {
        this.$http
          .get('http://localhost:3001/api/random-quote', (data) => {
            this.quote = data;
          })
          .error((err) => console.log(err))
      }
    }
  }
  </script>