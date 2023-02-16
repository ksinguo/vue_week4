const app={
    data(){
      return{
        user:{
            username:'',
            password:''
        },
      }
    },
   methods:{
     login(){
        axios.post('https://vue3-course-api.hexschool.io/v2/admin/signin',this.user)
        .then((res)=>{
            //console.log(res.data)
            document.cookie = `hexToken = ${res.data.token};expires=${new Date(res.data.expired)}`;
            window.location = 'myproducts.html'
        })
        .catch((err)=>{
            //console.log(err)
            alert('帳號或密碼錯誤請重新輸入')
        })
     }
   }
  }
  Vue.createApp(app).mount('#app')