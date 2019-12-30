import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 引入公共工具类 */
import utils from './util/utils.js'
Vue.prototype.$utils = utils

/* 引入ViewUI组件库 */
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

/* 引入axios */
import axios from 'axios'
Vue.prototype.$http = axios
import qs from 'qs'
Vue.prototype.$qs = qs

// 基本域名配置
if (location.port || location.host.indexOf("test.") != -1) {
    // 访问本地
    axios.defaults.baseURL = "https://api.htwhkj.com/"
        // axios.defaults.baseURL = 'http://192.168.101.233:8029';
} else {
    //访问线上
    axios.defaults.baseURL = "https://api.htwhkj.com/"
}


// 请求拦截器
axios.interceptors.request.use(config => {
    if (config.url.indexOf("token") == -1) {
        // 拿数据请求之前做些什么
        // 将对象序列化，多个对象之间用&拼接
        if (config.qs == "yes") {
            this.$qs.stringify(config.data)
        }
        //添加请求头
        config.headers.Authorization = "Bearer " + localStorage.getItem("token");
        return config
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => {
    // 对响应数据做些什么
    if (res.data.code === 401) {
        router.replace({
            path: '/Login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    }
    return res
}, err => {
    // 对响应错误做些什么
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log("错误请求")
                break
            case 401:
                // this.$store.commit('delToken')
                console.log("未授权，请重新登录")
                break
            case 403:
                console.log("拒绝访问")
                break
            case 404:
                console.log("请求错误，未找到该资源")
                break
            case 405:
                console.log("请求方法为允许")
                break
            case 408:
                console.log("请求超时")
                break
            case 500:
                console.log("服务器端出错")
                break
            case 501:
                console.log("网络未实现")
                break
            case 502:
                console.log("网络错误")
                break
            case 503:
                console.log("服务不可用")
                break
            case 504:
                console.log("网络超时")
                break
            case 505:
                console.log("http版本不支持该请求")
                break
            default:
                console.log(`连接错误${err.response.status}`)
        }
    } else {
        console.log('连接到服务器失败')
    }
})


/*退出登录*/
Vue.prototype.$logout = function() {
    // localStorage.removeItem('loginInfo')
    localStorage.removeItem('token')
    this.$router.replace("/Login")


}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')