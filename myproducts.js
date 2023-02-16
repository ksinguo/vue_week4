import pagination from "./pagination.js";
import productModal from './modal.js';
const {
    createApp
} = Vue;
let editModal = ''
let deleteModal =''
const app = createApp({
    data() {
        return {
            
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'ksin588',
            products: [],
            tempProduct: {
                imagesUrl: []
            },
            isNew: false, //用來判斷是建立新產品or編輯，因為要共用modal
            pages:{},
        }
    },
    methods: {
        getAllproducts(page = 1) {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`).then((res) => {
                    this.products = res.data.products
                    //console.log(res.data)
                    this.pages = res.data.pagination
                    //console.log(this.pages)
                })
                .catch((error) => {
                    //console.log(error)
                    alert('錯誤發生')
                })
        },
        check() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log(token) //要刪除
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${this.apiUrl}/api/user/check`)
                .then((res) => {
                    //console.log(res.data) //要刪掉
                    this.getAllproducts();
                })
                .catch((error) => {
                    //console.log(error); //要刪掉
                    alert('身分驗證錯誤，重新登入');
                    window.location = 'login.html';
                })
        },
        // editProduct(product){
        //     editModal.show();
        //     this.tempProduct = product;
        // },
        openModal(status, product) {
            editModal.show()
            if (status === 'create') {
                //要新增產品所以要將tempProduct清空，不然會帶出前一次編輯所賦予的資料
                this.isNew = true
                this.tempProduct = {}
                //console.log(this.tempProduct)
            } else if (status === 'edit') {
                this.isNew = false
                //this.tempProduct = {...product}，如果api回傳的資料沒有imagesUrl陣列(可能沒有多圖)，在新增圖片時(tempProduct.imagesUrl.push(''))因為沒有陣列所以呼叫push會出錯
                this.tempProduct = {
                    imagesUrl: [],
                    ...product
                }
                //console.log(this.tempProduct)
            }
        },
        updateProduct() {
            //用isNew來判斷要用哪一個api
            //建立新產品的code
            if (this.isNew === true) {
                axios.post(`${this.apiUrl}/api/${this.apiPath}/admin/product`, {
                        'data': this.tempProduct
                    })
                    .then((res) => {
                        //console.log(res.data)
                        alert('產品已經新增成功')
                        editModal.hide()
                        this.getAllproducts()
                    })
                    .catch((error) => {
                        //console.log(error.data)
                        alert(`${error.data.message[0]}`)
                    })
            } else if (this.isNew === false) {
                //編輯資料的code
                axios.put(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`, {
                        'data': this.tempProduct
                    })
                    .then(
                        (res) => {
                            console.log(res.data)
                            alert('產品已經更新成功')
                            editModal.hide()
                            this.getAllproducts()
                        }
                    )
                    .catch((error) => {
                        //console.log(error.data)
                        alert(`${error.data.message[0]}`)
                    })
            }
        },
        deleteProduct(){
            //console.log(this.tempProduct.id)
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
            .then((res)=>{
                //console.log(res.data)
                alert('刪除成功')
                deleteModal.hide()
                this.getAllproducts()
            })
            .catch((error)=>{
                //console.log(error)
                alert('錯誤發生')
            })
        },
        openDeleteModal(product){
            this.tempProduct = product
            deleteModal.show()
            
        }
    },
    mounted() {
        this.check();
        const modal = document.querySelector('#productModal');
        editModal = new bootstrap.Modal(modal);
        deleteModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
    },
    components:{
        pagination
    }
})
app.component('productModal',productModal)
app.mount('#app')