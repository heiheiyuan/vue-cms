<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-right" :src="item.imgUrl">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间: {{ item.addTime | dateFilter}}</span>
                            <span>点击: {{ item.click }} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    import { Toast } from 'mint-ui'

    export default {
        data() {
            return {
                newsListCondition: {
                    pageNo: 0,
                    pageSize: 10
                },
                newslist: []
            }
        },
        created() {
          this.getNewsList();
        },
        methods: {
            getNewsList() {
                this.$http.post("api/getNewsList",this.newsListCondition).then(result => {
                    if (result && result.body.returnCode === 0) {
                        this.newslist = result.body.data;
                    } else {
                        Toast("获取新闻列表信息失败");
                    }
                })
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    .mui-table-view {
        li {
            h1 {
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #007aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>