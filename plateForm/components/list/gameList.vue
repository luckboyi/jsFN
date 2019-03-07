<template>
    <div class="box">
        <ul style="max-height:350px;overflow:hidden;">
            <li :class="{'active':activeGame==''}"
                @click="selectGame('')">
                <div>
                    <i class="icon-game"></i>
                </div>
                <span class="ells1">全部游戏</span>
            </li>
            <li v-for="(item,index) in gameList" 
                :class="{'active':activeGame==item.gameId}"
                :key="index"
                @click="selectGame(item.gameId)">
                <div style="text-align:center;padding-top:10px;">
                    <div style="width:30px;height:30px;margin:auto;">
                        <div class="zoomImage"
                            :title="item.gameName"
                            :style="{'background-image':'url('+item.gameImg+')'}">
                        </div>
                    </div>
                </div>
                <span class="ells1"
                    v-text="item.gameName"></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getGameListData } from '@/request/game'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            activeGame: '',
            // gameList: [
            //     {
            //     gameId: '',
            //     gameImg: '',
            //     gameName: ''
            //     }
            // ],
        }
    },
    computed: {
        ...mapState({
            gameList: state => state.init.gameList
        })
    },
    methods: {
        async getGameList() {
            // this.gameList = await getGameListData()
        },
        selectGame(gameId) {
            this.activeGame = gameId
            this.$emit('select', gameId)
        },
        init() {
            this.selectGame('')
            // this.getGameList()
        }
    }
}
</script>

<style lang="scss" scoped>
$liHeight: 50px;
.box {
    width: 220px;
    // background: rgba(19, 23, 29, 1);
}
.box {
    li {
        overflow: hidden;
        height: $liHeight;
        line-height: $liHeight;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        > div {
            width: $liHeight;
            height: $liHeight;
            float: left;
            overflow: hidden;
            text-align: center;
            line-height: $liHeight;
            margin-left: 10px;
            margin-right: 10px;
            i {
                vertical-align: middle;
            }
        }
        span {
            width: 150px;
            height: $liHeight;
            float: left;
            color: rgba(201, 201, 201, 1);
        }
        > div {
            width: $liHeight;
            height: $liHeight;
            float: left;
            overflow: hidden;
            text-align: center;
            line-height: $liHeight;
            margin-left: 10px;
            margin-right: 10px;
        }
        &:hover {
            background: rgba(30, 35, 43, 1);
            span {
                color: rgba(211, 211, 211, 1);
            }
            // &:before {
            //     content: "";
            //     display: block;
            //     position: absolute;
            //     width: 3px;
            //     height: $liHeight;
            //     background: rgba(199, 113, 8, 1);
            // }
        }
    }
    li.active {
        background: rgba(118, 132, 164, 0.3);
        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 3px;
            height: $liHeight;
            background: #f1a116;
        }
        span {
            color: #fff;
        }
    }
}
</style>


