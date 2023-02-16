export default {
    props:['pages','getAllproducts'],
    methods: {
        emitgetAllproducts(page){
           this.$emit('emitgetAllproducts')
        }
    },
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
    <!-- 以下是分頁的往前的箭頭使用emit--> 
    <li class="page-item" :class='{disabled:!pages.has_pre}' >
        <a @click.prevent="$emit('emitget-allproducts',pages.current_page-1)" class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
    </li>

      <!--以下是分頁的頁碼 -->
      <li v-for='page in pages.total_pages' :key='page + 122' class="page-item" :class='{active:page===pages.current_page}'>
        <a  @click.prevent='getAllproducts(page)' class="page-link" href="#">{{page}}</a>
      </li>
      
      <!--以下是分頁的下一頁箭頭  -->
      <li class="page-item" :class='{disabled:!pages.has_next}'>
        <a @click.prevent='getAllproducts(pages.current_page+1)' class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,

}