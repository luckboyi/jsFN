<template>
    <div>
        <ul class="list clearfix">
            <li v-for="(item,index) in list"
                :class="{'active':activeId==item.id}"
                @click="setAcitiveId(item.id)"
                >
                <span v-text="item.name"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        list:Array,
        activeId:Number
    },
    data(){
        return {
            // list:[{
            //     name:'今日',
            //     id:1
            // },{
            //     name:'所有',
            //     id:2
            // }],
        }
    },
    methods:{
        setAcitiveId(id){
            this.$emit('active',id)
        }
    }
}
</script>

<style lang="scss" scoped>
$height:30px;
.list{
    li{
        height: $height;
        line-height: $height;
        background:rgba(34,38,48,1);
        padding-left:40px;
        padding-right:40px;
        font-size:14px;
        float:left;
        transition:all .3s;
        cursor: pointer;
        color:rgba(112,116,126,1);
        &:hover{
            background:rgba(30,35,43,1);
        }
    }
    li.active{
        background:rgba(47,52,67,1);
        color:#fff;
    }
}
</style>


