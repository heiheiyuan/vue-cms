<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ photoinfo.add_time | dateFilter }}</span>
            <span>点击: {{ photoinfo.click }} 次</span>
        </p>

        <hr>

        <!--缩略图-->
        <div class="thumbs">
            <img class="preview-img" v-for="(item,i) in list" : src="item.src" height="100" @click="$preview.open(i,list)" :key="item.src">
        </div>

        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content"></div>

        <!--评论子组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>

    import comment from "../subcomponent/Comment.vue";

    export default {
        name: "PhotoInfo",
        data() {
            return {
                //从路由中获取到的图片ID
                id: this.$route.params.id,
                //图片详情
                photoinfo: {},
                //缩略图的数组
                list: []
            }
        },
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            getPhotoInfo () {
                //获取图片详情
                this.$http.get("api/getimageInfo/" + this.id).then(result => {
                    if (result.body.returnCode === 0) {
                        this.photoinfo = result.body.message[0];
                    }
                });
            },
            getThumbs() {
                //获取图片缩略图
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.returnCode === 0) {
                        //补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        this.list = result.body.message;
                    }
                });
            }
        },
        components: {
            "cmt-box": comment
        }
    }
</script>

<style lang="scss" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }
        .thumbs {
            img {
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>