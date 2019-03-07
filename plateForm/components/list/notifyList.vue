<template>
    <div class="box">
        <div class="list-header">
            消息通知
        </div>
        <div class="list-body">
            <ul class="list">
                <li v-for="(item,index) in list"
                    class="clearfix">
                    <span v-text="item.name">版本更新提醒</span>
                    <div v-text="item.time">2018-10-22 18：00</div>
                </li>
            </ul>
        </div>
        <div class="list-bottom">
            <nuxt-link :to="$PAGE_API.index">查看更多</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                name: '版本更新通知',
                time: '2018-10-22 18:00',
                id: '190238'
            }]
        }
    }

}
</script>

<style lang="scss" scoped>
@import "~assets/style/basicColor.scss";
.box{
    width: 280px;
    background: #1B1F25;
}
.list-bottom a {
    color: $yellow;
}
.list {
    li {
        > span {
            float: left;
        }
        > div {
            float: left;
        }
    }
}
</style>

