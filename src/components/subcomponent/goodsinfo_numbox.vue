<template>
    <div class="mui-numbox" data-numbox-min="1">
        <!-- 问题： 我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
        <!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值 -->
        <button class="mui-btn ui-btn-numbox-minus" type="button">-</button>
        <input @change="countChanged" type="number" id="test" class="mui-input-numbox" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";
    export default {
        mounted() {
            //初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods: {
            countChanged() {
                this.$emit("getcount",parseInt(this.$refs.numbox.value));
            }
        },
        props: ["max"],
        watch: {
            //属性监听
            max: function (newValue,oldValue) {
                mui(".mui-numbox")
                    .numbox()
                    .setOption("max",newValue);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>