import newAxios from 'axios'
import router from '@/router'
import { Notify } from 'vant';
import {getToken} from '@/utils/token'
const axios = newAxios.create({
    baseURL: 'http://toutiao.itheima.net/',
    timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);

    //?.可选链字符，如果前面对象里没有length，整个表达式原地返回undefined
    //如果getToken()在原地有值token字符串，才能调用length长度
    if(getToken()?.length>0 && config.headers.Authorization===undefined){
        config.headers.Authorization= `Bearer ${getToken()}`
    }
    return config;
   
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    // console.dir(error);
    //只有401，登录过期才重新跳转至登录页
    if(error.response.status === 401){
    //这里不能使用this.$router(因为this不是vue组件对象无法调用$router)
    //解决:this.$router为例拿到router路由对象，所以直接去上面引入@/router下的router对象
     Notify({type:'warning',message:'身份已过期,请重新登录'})   
    router.replace('/login')
    }
    return Promise.reject(error);
  });

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
    return axios({
        url,
        method,
        params,
        data,
        headers
    })
    // return new Promise((resolve, reject) => {
    //     $.ajax({
    //         url,
    //         data,
    //         headers,
    //         type: method,
    //         success:(res)=>{
    //             resolve(res)
    //         },
    //        error:err=>{
    //         reject(err)
    //        }
    //     })
    // })
}

// export default axios
// 上面有局限

// axios({
//     url:'请求地址',
//     method:'请求方式'，
//     params:{},
//     data:{},
//     headers:{}
// })