<template>
    <div class="createTeam">
        <loadingCom v-show="isLoading"/>
        <div v-show="!isLoading">
            <div class="selectCon f14">
                <div class="clearfix inCon inputCon">
                    <div class="fl name">输入战队名称:</div>
                    <div class="fl pr">
                        <input @blur="blurFn" @focus="focusFn" type="text" v-model="teamName" placeholder="4-16个字母、数字、中文字符">
                        <p class="errorMsg text-red" v-show="showError">
                            {{errorMsg}}
                        </p>
                    </div>
                </div>
                <div class="clearfix inCon">
                    <div class="fl name">选择游戏：</div>
                    <div class="fl clearfix">
                        <div class="fl clearfix gameList cp" @click="selectGameFn(index,item.gameId)" v-for="(item,index) in gameList" :key="index">
                            <div class="selectIcon pr fl"><b class="pa center" v-show="isSelectGame == index"></b></div>
                            <div class="fl gameInconCon clearfix">
                                <img class="fl" :src="item.gameImg" :alt="item.gameName">
                                <b class="fl">{{item.gameName}}</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix inCon teamLogo">
                    <div class="fl name">选择战队标志:</div>
                    <div class="fl clearfix logoCon">
                        <div class="fl imgCon pr cp" :key="index" v-for="(item,index) in teamLogos"  @click="selectTeamLogo(index,item.id)">
                            <div class="teamLogoSelectIcon pr fl pa" :class="{isSelected:selectIndex == index}"></div>
                            <img class="pa center" :src="item.logoUrl" alt="">
                        </div>
                    </div>
                </div>
                <div class="clearfix inCon teamTagCon">
                    <div class="fl name">选择战队目标：</div>
                    <div class="fl clearix">
                        <div @click="selectTeamGoalFn(index,item.id)" v-for="(item,index) in teamGoals" :key="index" class="cp teamTag fl pr" :class="[`teamTag${index}`,{selectedTag:teamGoalsIndex==index}]">
                            {{item.teamGoal}}
                            <i class="isSelectIcon pa pr"><b v-show="teamGoalsIndex == index" class="gouIcon pa"></b></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnCon tac">
                <div class="rangeBtn btn f18 cp" @click="createFn">创建战队</div>
                <p class="f14 hide">消耗10钻石</p>
            </div>
            <div class="tac hasTeam text-red">
                （注：每个用户只能加入或创建一个战队！）
            </div>
        </div>
    </div>
</template>
<script>
import {getTeamLogoList,getTeamGoalsList,creatTeamFn} from '@/request/team'
import loadingCom from '@/components/loading/index'
import { mapState } from 'vuex';

export default {
    data () {
        return{
            selectIndex:0,
            selectTagIndex:0,
            teamTagAndLogo:{},
            teamLogos:[],
            teamGoals:[],
            showError:false,
            "gameId": 1,
            "remark": "",
            "teamGoalId": 0,
            "teamLogoId": 0,
            "teamName": "",
            "wechatGroupName": "",
            "wechatGroupQrcodeUrl": "",
            isLoading:true,
            errorMsg:"",
            isSelectGame:0,
            teamGoalsIndex:0
        }
    },
    components:{
        loadingCom 
    },
    computed:{
        // ...mapState({
        //     teamTagAndLogo:state => state.team.teamTagAndLogo
        // })
        ...mapState({
            gameList:state => state.init.gameList
        })
    },
    mounted(){
        this.getTeamLogoList()
        this.getTeamGoalsList()
    },
    methods:{
        selectGameFn(val,id){
            this.isSelectGame =val
            this.gameId = id
        },
        async getTeamLogoList() {
            let res = await getTeamLogoList()
            if(res.code == 200){
                this.isLoading = false
                this.teamLogos = res.data
                this.teamLogoId = res.data[0].id
            }
            
        },
        async getTeamGoalsList(){
            let res = await getTeamGoalsList()
            if(res.code == 200){
                this.teamGoals = res.data
                this.teamGoalId = res.data[0].id
            }
        },
        checkInput(){
            if(!this.IsOK(this.teamName)){
                this.showError = true
                this.errorMsg = '请以中文或者英文字母开头，输入4-16位字母、数字、中文组成的字符'
            }else{
                this.showError = false
                this.errorMsg = ''
            }
        },
        IsOK(str){
            if(str.length>0){
                var ta=str.split(""),str_l=0;
                var str_fa=Number(ta[0].charCodeAt());
                if((str_fa>=65&&str_fa<=90)||(str_fa>=97&&str_fa<=122)||(str_fa>255))
                {
                    for(var i=0;i<=ta.length-1;i++)
                    {
                    str_l++;
                    if(Number(ta[i].charCodeAt())>255){str_l++;}
                    }
                    if(str_l>=4&&str_l<=16){return true;}
                }
                return false;
            }
        },
        selectTeamGoalFn(val,id){
            this.teamGoalsIndex = val
            this.teamGoalId = id
        },
        async createTeamFn() {
            let res = await creatTeamFn({
                "gameId": this.gameId,
                "teamGoalId": this.teamGoalId,
                "teamLogoId": this.teamLogoId,
                "teamName": this.teamName,
            })
            if(res.code == 200){
                this.$maskCom({
                    txt:['创建战队成功！'],
                    firstBtnTxt:'查看我的战队',
                    firstBtnFn:() =>{
                        this.$router.push('/team/myTeam')
                        this.$store.dispatch('user/actionGetUserInfo')
                    }
                })
            }else if(res.code == 10006){
                this.errorMsg = '您输入的战队名称已存在，请更改！'
                this.showError = true
            }else if(res.code == 10003){
                maskCom({
                    txt:['您已拥有战队，立即前往查看！'],
                    firstBtnTxt:'查看我的战队',
                    firstBtnFn:() =>{
                        this.$router.push('/team/myTeam')
                        this.$store.dispatch('user/actionGetUserInfo')
                    }
                })
            }
        },
        createFn() {
            if(!this.IsOK(this.teamName)){
                this.showError = true
                this.errorMsg = '请以中文或者英文字母开头，输入4-16位字母、数字、中文组成的字符'
            }else{
                this.createTeamFn()
            }
           
        },
        focusFn(){
            this.showError = false
        },
        blurFn(){
            this.checkInput()
        },
        selectTeamLogo(val,id){
            this.selectIndex = val
            this.teamLogoId = id
        }
    }
}
</script>

<style lang="scss" scoped>
$borderCol:rgba(255,255,255,.1);
    .createTeam{
        background:rgba(34,38,48,1);
        .selectCon{
            padding:70px 70px 40px;
            border-bottom: 1px solid $borderCol;
            .name{
                width: 110px;
            }
            .inCon{
                line-height: 42px;
                height: 42px;
                margin-bottom: 50px;
            }
            .inputCon{
                input{
                    width: 260px;
                    line-height: 40px;
                    height: 40px;
                    border: 1px solid rgba(215,218,227,.2);
                    background: rgba(0,0,0,0);
                    text-indent: 10px;
                }
                
            }
            .selectIcon{
                width: 14px;
                height: 14px;
                border-radius: 50px;
                border: 1px solid rgba(215,218,227,.5);
                margin: 14px 10px 0 0;
                
                b{
                    width: 8px;
                    height: 8px;
                    border-radius: 50px;
                    background: #fff;
                }
                i{
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    border-radius: 50px;
                    color: #000;
                }
            }
            .gameInconCon{
                height: 24px;
                line-height: 24px;
                margin-top: 10px;
                img{
                    width: auto;
                    height: 24px;
                    margin-right: 10px;
                }
            }
        }
        .btnCon{
            margin-top: 50px;
            .btn{
                width:162px;
                line-height: 46px; 
                display: inline-block;
                border-radius: 5px;
            }
            p{
                color:rgba(255,255,255,.5);
                padding: 20px 0 20px; 
            }
        }
    }
    .teamTagCon{
        line-height: 68px !important;
        .teamTag{margin-right:20px; }
    }
    .teamLogo{
        width: 100%;
        height: auto !important;
        .imgCon{
            width: 120px;
            height: 100px;
            background: #000;
            margin:0 20px 20px 0;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
    }
    .isSelectIcon{
        width: 30px;
        height: 30px;
        overflow: hidden;
        right: -1px;
        bottom: -1px;
        border-radius: 5px;
    }
    .hasTeam{
        padding: 10px 0 40px;
    }
    .gameList{
        margin-right: 20px;
    }
    .teamLogo{
        .selectIcon{
            width: 20px !important;
            height: 20px !important;
            right: -6px;
            top: -6px;
            z-index: 99;
            
        }
    }
    .logoCon{
        width: 700px;
    }
    .gouIcon{
        width: 16px !important;
        height: 16px !important;
        background: url('../../assets/img/icon/gou.png') no-repeat center !important;
    }
    .teamTagCon .gouIcon{
        right: 1px;
        top:12px;
    }
    .teamLogoSelectIcon{
        width: 20px;
        height: 20px;
        z-index: 999;
        right: 6px;
        top:6px;
        background: url('~assets/img/icon/icon-check.png') no-repeat center;
        &.isSelected{
            background-image: url('~assets/img/icon/icon-checked.png');
        }
    }
</style>

