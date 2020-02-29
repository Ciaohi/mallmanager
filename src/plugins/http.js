// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:3000/api/'
  // 在请求发起之前 会先来到下面的回调函数
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    /* console.log('拦截器被触发') */
    /* console.log(config.url) */
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['token'] = AUTH_TOKEN
    }

    // 在请求发送之前做些什么
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  /* const AUTH_TOKEN = localStorage.getItem('token')
  axios.defaults.headers.common['token'] = AUTH_TOKEN */
  // 在请求发起之前 设置头部

  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer
