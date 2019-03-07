<template>
    <div>
        <ul>
            <li :class="{'active':matchId==0}"
                @click="selectMatch(0)">个人赛事</li>
            <li :class="{'active':matchId==1}"
                @click="selectMatch(1)">官方赛事</li>
            <li v-if="canCreateMatch"
                :class="{'active':matchId==2}"
                @click="selectMatch(2)">我的游戏</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'mallList',
    props: {
        matchId: {
            type: Number,
            default: 0
        },
        canCreateMatch: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        selectMatch(id) {
            this.$emit('selectMatch', id)
        }
    }
}
</script>
<style lang="scss" scoped>
ul {
    overflow: hidden;
}
li {
    width: 100px;
    line-height: 60px;
    float: left;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    color: rgba(128, 128, 138, 1);
    transition: all 0.3s;
    &:hover {
        color: rgba(211, 211, 211, 1);
    }
    &.active {
        color: rgba(52, 178, 250, 1);
    }
}
</style>

