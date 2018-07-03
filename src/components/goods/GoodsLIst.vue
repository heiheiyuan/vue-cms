<template>
    <div class="good-list">
        <div class="goods-tiem" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{ item.title }}</h1>\
            <div class="info">
                <p class="price">
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩 {{item.stock_quantity}} 件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "GoodsLIst",
        data () {
            return {
                //页数
                pageindex: 1,
                //存放商品 列表数组
                goodslist: []
            }
        },
        created () {
            this.getGoodsList();
        },
        methods: {
            getGoodsList () {
                //获取商品列表
                this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
                    if (result.body.returnCode === 0) {
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                });
            },
            getMore() {
                this.pageindex++;
                this.getMore();
            },
            goDetail (id) {
                // 1. 最简单的
                // this.$router.push("/home/goodsinfo/" + id);
                // 2. 传递对象
                // this.$router.push({ path: "/home/goodsinfo/" + id });
                //传递命名路由
                this.$router.push({ name: "goodsinfo",params: {id} });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            border: 1px solid #cccccc;
            box-shadow: 0 0 8px #cccccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100px;
            }
            .title {
                font-size: 14px;
            }
            .info {
                background-color: #eeeeee;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old {
                        /*文本中间的一条线*/
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }

        }
    }

</style>