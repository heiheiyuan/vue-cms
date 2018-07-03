import VueRouter from 'vue-router'

import CartComponent from './components/tabbar/CartContainer.vue'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ContactContainer from './components/tabbar/ContactContainer.vue'
import NewsListContainer from './components/news/NewsList.vue'
import NewsInfoContainer from './components/news/NewsInfo.vue'
import PhotoListContainer from './components/photos/PhotoList.vue'
import PhotoInfoContainer from './components/photos/PhotoInfo.vue'
import GoodListContainer from './components/goods/GoodsLIst.vue'
import GoodInfoContainer from './components/goods/GoodsInfo.vue'
import GoodsDescContainer from './components/goods/GoodsDesc.vue'
import GoodsCommentContainer from './components/goods/GoodsComment.vue'

// 3. 创建路由对象
const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/search', component: SearchContainer},
        {path: '/cart', component: CartComponent},
        {path: '/contact', component: ContactContainer},
        {path: '/home/newslist', component: NewsListContainer},
        {path: '/home/photolist', component: PhotoListContainer},
        {path: '/home/photoinfo', component: PhotoInfoContainer},
        {path: '/home/shopping', component: ShoppingContainer},
        {path: '/home/newsInfo/:id', component: NewsInfoContainer},
        {path: '/home/goodslist',component: GoodListContainer},
        {path: '/home/gooodsinfo/:id', component: GoodInfoContainer, name: 'goodsinfo'},
        {path: '/home/goodsdesc/:id', component: GoodsDescContainer, name: 'goodsdesc'},
        {path: '/home/goodcomment/:id', component: GoodsCommentContainer, name: 'goodscomment'}
    ],
    //覆盖默认的路由高亮的类,默认的类为router-link-active
    linkActiveClass: 'mui-active'
});

// 把路由对象暴露出去
export default router