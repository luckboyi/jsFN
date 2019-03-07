<template>
    <div class="teamList pr">
        <div class="fr searchCon f12 pr pa">
            <i class="searchIcon pa topCenter" @click="searchFn"></i>
            <input type="text" placeholder="请输入战队名称" @keyup.enter="searchFn"  v-model="searchMsg">
        </div>
        <div v-if="teamList !='' && teamList.length>0 ">
            <ul>
                <li v-for="(item,index) in teamList" :key="index">
                    <div class="inList clearfix pr">
                        <div class="imgCon fl tac">
                            <img :src="item.logoUrl" alt="">
                        </div>
                        <div class="fl teamMsgCon f14">
                            <h4 class="f18 pr">{{item.name}}<b class="teamRankCon pr "><i class="teamRank pa " :class="[`teamRank${item.level}`]"></i>{{item.level}}</b></h4>
                            <p>创建人：
                                <b class="cp" @click="showUserInfo(item.creatorUuid)">{{item.creatorName}}</b>
                            </p>
                            <p>当前人数：<b>{{item.joinedUserCount}}/{{item.totalUserCount}}</b></p>
                        </div>
                        <div class="pa center teamTarget clearfix">
                            <b class="fl">战队目标：</b>
                            <div  class="teamTag fl pr  selectedTag unClickFn" :class="[`teamTag${item.teamGoalId}`]">{{item.teamGoal}}</div>
                        </div>
                        <div v-if="item.joinedUserCount == item.totalUserCount" class="grayBtn pa topCenter accessionBtn tac cp blueBtn">已满</div>
                        <div v-else-if="item.isApplied" class="grayBtn pa topCenter accessionBtn tac cp blueBtn">已申请</div>
                        <div :class="{grayBtn:($store.state.user.basicInfo.team!=null && $store.state.user.basicInfo.team.name !='') || isUnclick}" v-else-if="!item.isApplied " class="pa topCenter accessionBtn tac cp blueBtn" @click="joinFn(index,item)">
                            申请加入
                        </div>
                        <div v-else class="pa topCenter cancelBtn cp">取消申请</div>
                    </div>
                </li>
            </ul>
            <loadingCom v-if="isLoading"/>
            <div  v-show="totalPage !=1" v-if="currentPage < totalPage" class="tac loaderMore" @click="addMore">
                加载更多
            </div>
        </div>
        <div class="tac nodata" v-else>
            暂无战队数据!
        </div>
    </div>
</template>
<script>
import {getTeamListData,joinTeamFn,searchTeamByName} from '@/request/team'
import loadingCom from '@/components/loading/index'
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            display:6,
            currentPage:1,
            teamList:[],
            scroll:true,
            totalPage:1,
            isLoading:true,
            gameId:'',
            appleNum:0,
            isUnclick:false,
            searchMsg:''
        }
    },
    components:{
        loadingCom 
    },
    watch:{
        'appleNum'(){
            if(this.appleNum == 5){
                this.isUnclick = true
                
            }
        }
    },
    computed:{
        ...mapState({
            loginState: state => state.user.loginState,
            basicInfo:state=>state.user.basicInfo
        })
    },
    mounted() {
        this.getTeamListData()
    },
    methods:{
        showUserInfo(id){
            userInfoCom({
                type:2,
                uuid:id,
                gameList:this.$store.state.init.gameList
            })
        },
        searchFn(){
            this.searchTeamByName()
        },
        async searchTeamByName(){
            let res = await searchTeamByName(this.searchMsg)
            if(res.code == 200){
                this.teamList = res.data.records
                this.totalPage = Math.ceil(res.data.total/this.display)
            }
        },
        ...mapActions([
            'login/actionShowLoginBox',
            'init/actionGetGameList'
        ]),
        async getTeamListData(){
            let res = (await getTeamListData(this.gameId,this.currentPage,this.display))
            if(res.code == 200){
                this.isLoading=false
                this.totalPage = Math.ceil(res.data.total/this.display)
                if(this.currentPage == 1){
                    this.teamList = res.data.records
                }else{
                    res.data.records.forEach( (val) =>{
                        //val.isApply= false
                        this.teamList.push(val)
                    })
                }
            }
        },
        handleScroll(){
            if(this.$el.scrollTop+this.$el.offsetHeight>this.$el.scrollHeight){
                this.scloll=true;
                this.currentPage +=1
                if(this.currentPage < this.totalPage){
                    this.getTeamListData()
                }
            }else{
                this.scloll=false;
            }
        },
        addMore(){
            this.isLoading = true
            this.currentPage +=1
            if(this.currentPage <= this.totalPage){
                this.getTeamListData()
            }
        },
        async joinFn(index,item){
            if(this.$store.state.user.basicInfo.nickName ==''){
                maskCom({
                    txt: ['您暂未登录或登录超时，请前往登录！'],
                    firstBtnTxt: '前往登录',
                    firstBtnFn: () => {
                        $nuxt.$store.dispatch('login/actionShowLoginBox')
                    }
                })
            }else{
                let res = await joinTeamFn({
                    teamId:item.teamId
                })
                if(res.code == 200 ||res.code ==10002){
                    item.isApplied = true
                    this.appleNum+=1
                }else if(res.code == 10007){
                    this.isUnclick = true
                    maskCom({
                        txt:['你已申请过多，请等待战队队长审批通过！'],
                        firstBtnTxt:'确定',
                    })
                }
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
        .searchCon{
            top:-54px;
            right: 0;
            input{
                 width:170px;
                height:30px;
                background:#323941;
                border:1 solid #576272;
                border-radius:15px;
                text-indent: 30px;
            }
            .searchIcon{
                left: 10px;
            }
        }
    .teamList{
        background:rgba(34,38,48,1);
        li{
            width: 100%;
            padding:22px; 
            box-sizing: border-box;
            border-bottom: 1px solid rgba(19,21,29,1);
            &:last-child{
                border: 0;
            }
        }
        .inList{
            width: 100%;
            height: 78px;
            .imgCon{
                width: 78px;
                height: 78px;
                overflow: hidden;
                img{
                    width: auto;
                    height: 100%;
                    display: inline-block;
                }
            }
        }
    }
    .teamTarget{
        line-height: 66px;
        height: 66px;
        width: 300px;
        b{
            display: inline-block;
            line-height: 66px;
        }
        img{
            width: 134px;
            height: 66px;
        }
    }
    .teamMsgCon{
        margin-left: 24px;
        color: #919398;
        h4{
            color: rgba(241,161,22,1);
        }
        p{
            margin-top: 8px;
            b{
            color: #fff;
            }
        }
    }
    .accessionBtn{
        width: 82px;
        height: 32px;
        line-height: 32px;
        border-radius: 5px;
        right: 80px;
    }
    .teamRankCon{
        padding-left: 60px;
        color: #fff;
        .teamRank{
            left: -18px;
            top:-38px;
            &.teamRank2{
                top: -42px;
            }
        }
    }
    .cancelBtn{
        right: 10px;
    }
    .nodata{
        padding: 20px 0;
        color:#919398;
    }
    .teamTag{margin-top: 8px;}
</style>
