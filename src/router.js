import VueRouter from 'vue-router'

import CartComponent from './components/tabbar/CartContainer.vue'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ContactContainer from './components/tabbar/ContactContainer.vue'

// 3. 创建路由对象
const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/search', component: SearchContainer},
        {path: '/cart', component: CartComponent},
        {path: '/contact', component: ContactContainer},
    ],
    //覆盖默认的路由高亮的类,默认的类为router-link-active
    linkActiveClass: 'mui-active'
});

// 把路由对象暴露出去
export default router