<template>
    <div class="nodata"
            v-if="show">
            暂无数据
        </div>
</template>

<script>
export default {
    props:{
        show:Boolean
    }
}
</script>

<style lang="scss" scoped>
.nodata {
    text-align: center;
    padding-top: 50px;
}
</style>
