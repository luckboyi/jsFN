<template>
    <modal-1 :show="show">
        <div class="modal-box"
            style="width:420px;">
            <div class="modal-header"
                style="text-align:left;text-indent:1em;">
                <span class="modal-title"
                    style="font-size:14px;">
                    加入游戏提示
                </span>
                <span class="close"
                    @click="close">×</span>
            </div>
            <div class="modal-body"
                style="width:360px;">
                <h2>请安装对战平台后登录客户端加入游戏</h2>
                <p>
                    <nuxt-link :to="download" style="font-size:16px;">
                        立即前往下载中心>>
                    </nuxt-link>
                </p>
            </div>
        </div>
    </modal-1>
</template>

<script>
// 下载模态窗
import Modal1 from '@/components/common/modal1'
import { PAGE_API } from '@/assets/config/api'
export default {
    props: {
        show: Boolean
    },
    components: {
        Modal1
    },
    data() {
        return {
            download: PAGE_API.download
        }
    },
    computed: {
    },
    methods: {
        close() {
            this.$emit('update:show', false)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/basicColor.scss";
h2 {
    color: #fff;
    font-size: 18px;
    text-align: center;
    padding-top:10px;
}
.modal-body{
    p{
        padding-top:70px;
        padding-bottom:40px;
        text-align: center;
        a{
            color:$yellow;
            transition: all .3s;
            &:hover{
                color:$yellowActive;
            }
        }
    }
}
</style>


