import Vue from 'vue'

import VueResource from 'vue-resource'

import app from './App.vue'

//导入路由并安装
import VueRouter from 'vue-router'

import { Header, Swipe, SwipeItem  } from 'mint-ui'

import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'
//导入自己的router
import router from './router.js'
//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFilter',function (dateStr,pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern)
})
//安装路由
Vue.use(VueRouter)

//安装资源请求
Vue.use(VueResource)

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})