<template>
    <div class="cmt-container">
        <h3>发表评论</h3>

        <hr>

        <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <span>第 {{ i + 1 }} 楼 用户: {{ item.user_name }}</span>
                    <span>发表时间: {{ item.add_time | dateFilter}}</span>
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒,啥都没说': item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        data() {
            return {
                //默认展示第一页数据
                pageIndex: 1,
                //所有评论内容
                comments: [],
                //评论输入内容
                msg: ""
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments() {
                //获取评论
                this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.comments = this.comments.concat(result.body.message);
                        }else {
                            Toast("获取评论失败!");
                        }
                    });
            },
            getMore() {
                this.pageIndex++;
                this.getComments();
            },
            postComment() {
                //校验内容是否为空
                if (this.msg.trim().length === 0) {
                    return Toast("评论内容不能为空!");
                }
                this.$http
                    .post("api/postcomment/" + this.$route.params.id, {
                        content: this.msg.trim()
                    })
                    .then(result => {
                        //拼接评论对象
                        var cmt = {
                            user_name: "匿名用户",
                            add_time: Date.now(),
                            content: this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg = "";
                    })
            }
        },
        components: {},
        props: ["id"]
    };
</script>

<style scoped lang="scss">
    .cmt-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    padding: 0 4px;
                    line-height: 30px;
                    background-color: #cccccc;
                    display: flex;
                    justify-content: space-between;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>