<template>
    <div class="mui-numbox" data-bumbox-min="1" style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input type="number" :value="initcount" @change="countChanged" ref="numbox" readonly id="test" class="mui-input-nimbox">
        <button class="mui-btn mui-btn-numbox-minus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        mounted() {
            //初始化数字选择框控件
            mui('.mui-numbox').numbox();
        },
        methods: {
            countChanged() {
                this.$store.commit("updateGoodsInfo",{
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                });
            }
        },
        props: ["initcount","goodsid"]
    }
</script>

<style scoped>

</style>