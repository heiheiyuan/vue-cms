import Vue from 'vue'

import VueResource from 'vue-resource'

import app from './App.vue'

//导入路由并安装
import VueRouter from 'vue-router'

// import { Header, Swipe, SwipeItem  } from 'mint-ui'

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
Vue.http.options.root = 'http://localhost:666';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
// Vue.http.options.emulateJSON = true;
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
import MintUI from 'mint-ui'

Vue.use(MintUI)

import VuePreview from 'vue-preview'
Vue.use(VuePreview);
import 'mint-ui/lib/style.css'

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Sotre({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false;
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            //如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsinfo);
            }
            //当更新car之后,把car数组存储到本地的localstorage
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    }
});

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})