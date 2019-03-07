<template>
    <div class="w12" style="margin-top:35px;">
        <div class="breadcrumb">
            <nuxt-link to="/">首页</nuxt-link>
            <span>/</span>
            <nuxt-link class="active" :to="$PAGE_API.record_recharge">充值记录</nuxt-link>
        </div>
        <table-list ref="table" style="margin-top:20px;"></table-list>
    </div>
</template>

<script>
import TableList from '@/components/table/record/rechargeTable'
export default {
    components:{
        TableList
    },
    beforeRouteEnter (to, from, next) {
        next((vm)=>{
            vm.$refs.table.initTableData()
        })
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>


