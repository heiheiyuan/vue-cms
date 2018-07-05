<template>
    <div class="shopcar-container">
        <!--商品列表区域-->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$sotre.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">${{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)"></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">

                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

        <p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>
<script>
    import numbox from '../subcomponent/shopcar_numbox.vue';
    export default {
        data () {
            return {
                goodslist: []
            }
        },
        created () {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
                var idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                if (idArr.length <= 0) {
                    return;
                }
                this.$http.get("api/goods/getshopcarlist/" + idArr.join(","))
                    .then(result => {
                        if (result.body.returnCode === 0) {
                            this.goodslist = result.body.message;
                        }
                    });
            },
            remove(id,index) {
                this.goodslist.splice(index,1);
                this.$store.commit("removeFormCar",id);
            },
            selectedChanged (id,val) {
                this.$store.commit("updateGoodsSelected", {id: id,selected: val});
            }
        },
        components: {
            numbox
        }
    }
</script>
<style scoped lang="scss">
    .shopcar-container {
        background-color: #eeeeee;
        overflow: hidden;
        .good-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
            }
            h1 {
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>