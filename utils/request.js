/* 
请求模块
*/
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'// 基础路径
})

// 请求拦截器
request.interceptors.request.use(config => {
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config);
    //务必返回配置对象 否则请求发不出去
    return config
}, err => {
    console.log(err)
})
// 响应拦截器

export default request