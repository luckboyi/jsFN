<template>
    <div class="sort-btn"
        @click="active">
        <span class="sort-title" v-text="title">总奖励</span>
        <span class="sort icon-sort-desc"
            :class="{'icon-sort-desc-active':desc}"
            ></span>
        <span class="sort icon-sort-asc"
            :class="{'icon-sort-asc-active':asc}"
            ></span>
    </div>
</template>

<script>
// 表头排序样式
export default {
    props:{
        desc:Boolean,
        asc:Boolean,
        title:String
    },
    methods:{
        active(){
            this.$emit('active')
        }
    }
}
</script>
<style lang="scss" scoped>
// 表头排序按钮
.sort-btn {
    cursor: pointer;
    display: inline-block;
    transition: all 0.3s;
    overflow: hidden;
    span {
        float: left;
        position: relative;
    }
    .sort-title {
        margin-right: 3px;
    }
    // 排序箭头
    .sort {
        position: relative;
        top: 11px;
    }
    &:hover {
        color: #fff;
    }
}
</style>


