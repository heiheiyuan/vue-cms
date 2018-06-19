<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in carouselList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../img/news.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/shareimg">
                <img src="../../img/img_share.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/shopping">
                <img src="../../img/shopping.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/leavemsg">
                <img src="../../img/msg.png" alt="">
                <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/video">
                <img src="../../img/video.png" alt="">
                <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/contactus">
                <img src="../../img/contact.png" alt="">
                <div class="mui-media-body">联系我们</div></router-link></li>
        </ul>
    </div>
</template>
<script>

    import { Toast } from 'mint-ui'

    export default {
        data() {
            return {
                carouselList: []
            };
        },
        created() {
            this.getCarouselData();
        },
        methods: {
            getCarouselData() {
                this.$http.get("http://localhost:666/api/getCarousels").then(result => {
                    if (result && result.body.returnCode === 0)  {
                        this.carouselList = result.body.data;
                    }else {
                        Toast("获取轮播图数据异常")
                    }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .mint-swipe {
        height: 300px;
        .mint-swipe-item {
            vertical-align: center;
            &:nth-child(1) {
                background-color: #FFD705;
            }
            &:nth-child(2) {
                background-color: #0089DC;
            }
            &:nth-child(3) {
                background-color: #FF2D4B;
            }
            img {
                width: 100%;
            }
        }
    }
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img {
            width: 60px;
            height: 60px;
        }
        .mui-media-body {
            font-size: 14px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }
</style>