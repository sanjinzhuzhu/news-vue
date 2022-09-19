import newAxios from 'axios'
const axios = newAxios.create({
    baseURL: 'http://geek.itheima.net/',
    timeout: 20000
})

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