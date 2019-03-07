<template>
  <modal-1 :show="show">
    <div class="modal-box" style="width:420px;">
      <div class="modal-header" style="text-align:left;text-indent:1em;">
        <span class="modal-title" style="font-size:14px;">申请官方赛事</span>
        <span class="close" @click="close">×</span>
      </div>
      <div class="modal-body" style="width:760px;">
        <h3>基本信息设置</h3>
        <ul class="model-from">
          <li class="pr">
            <label>输入赛事名称</label>
            <input type="text" @focus="matchNameFoucsFn('isShowMatchName')" @blur="matchBlurFn('machName','isShowMatchName')" v-model="machName" placeholder="最多16个字符">
            <p class="pa text-red" v-show="isShowMatchName" style="left:120px;">包含敏感词汇，请重新输入</p>
          </li>
          <li>
            <label>选择游戏</label>
            <div class="feeDesc-wrap" v-for="(item,index) in newGameList" :key="index">
              <input
                :value="index"
                class="medium"
                name="Password"
                type="radio"
                id="no_password"
                :checked="gameId==item.gameId"
                @change="selectGameFn(item.gameId)"
              >
              <label for="no_password">{{item.gameName}}</label>
            </div>
          </li>
          <li>
          <li>
            <label>比赛日期</label>
            <input type="text" id="datePicker2" placeholder="选择开始和结束日期">
          </li>
          <li class="hide">
            <label>选择游戏玩法</label>
            <div class="feeDesc-wrap">
              <input
                class="medium"
                name="Password"
                type="radio"
                id="no_password"
              >
              <label for="no_password">单人</label>
            </div>
            <div class="feeDesc-wrap">
              <input
                class="medium"
                name="Password"
                type="radio"
                id="no_password"
              >
              <label for="no_password">组队</label>
            </div>
          </li>
          <!-- 比赛类型添加 -->
          <li class="hide">
            <label>选择奖励模式</label>
            <select>
              <option
                v-for="(item,index) in rewardList"
                :value="item.id"
                :key="index"
              >{{item.name}}</option>
            </select>
          </li>
          <!-- 比赛类型添加 -->
         
          <li class="pr">
            <label>举办人名称</label>
            <input type="text"  @focus="matchNameFoucsFn('isShowCreateName')" @blur="matchBlurFn('createrName','isShowCreateName')" v-model="createrName"  placeholder="输入举办人名称">
            <p class="pa text-red" v-show="isShowCreateName" style="left:120px;">包含敏感词汇，请重新输入</p>
          </li>
          <li class="hide">
            <label>举办人官方地址</label>
            <input type="text" v-model="createrWebsite"  placeholder="输入举办人官方地址">
          </li>
        </ul>
        <div>
           <h3>比赛规则设置</h3>
           <ul class="model-from borderStyle">
              <li class="pr">
                <label>输入总奖金</label>
                <input type="text"  @focus="matchNameFoucsFn('isShowtotalMoney')" @blur="matchBlurFn('totalMoney','isShowtotalMoney')"  v-model="totalMoney" placeholder="例如：5000贝壳">
                <p class="pa text-red" v-show="isShowtotalMoney" style="left:120px;">包含敏感词汇，请重新输入</p>
              </li>
              <li class="pr">
                <label>第1名奖金</label>
                <input type="text"   @focus="matchNameFoucsFn('isShowfirstMoney')" @blur="matchBlurFn('firstMoney','isShowfirstMoney')"  v-model="firstMoney" placeholder="例如：888贝壳">
                <p class="pa text-red"   v-show="isShowfirstMoney"  style="left:120px;">包含敏感词汇，请重新输入</p>
              </li>
             <li class="pr">
                <label>胜负判定条件</label>
                <input type="text"  @focus="matchNameFoucsFn('isShowruleInfo')" @blur="matchBlurFn('ruleInfo','isShowruleInfo')"  v-model="ruleInfo" style="width:600px;" placeholder="例如：击杀1人得1分">
                <p class="pa text-red" v-show="isShowruleInfo" style="left:120px;">包含敏感词汇，请重新输入</p>
              </li>
              <li class="pr">
                <label>惩罚与奖励</label>
                <input type="text"  @focus="matchNameFoucsFn('isShowrewardInfo')" @blur="matchBlurFn('rewardInfo','isShowrewardInfo')"  v-model="rewardInfo" style="width:600px;" placeholder="例如：1人头得100贝壳">
                <p class="pa text-red" v-show="isShowrewardInfo" style="left:120px;">包含敏感词汇，请重新输入</p>                
              </li>
              <li class="pr">
                <label style="vertical-align:top;">其他信息</label>
                <textarea v-model="remark"  @focus="matchNameFoucsFn('isShowremark')" @blur="matchBlurFn('remark','isShowremark')" style="padding:5px;width:600px; height:52px; border:1px solid #586175; background:#16191f;resize:none;" name="" id="" cols="30" rows="10" placeholder="请输入你要注明的信息"></textarea>
                <p class="pa text-red"  v-show="isShowremark" style="left:120px;">包含敏感词汇，请重新输入</p>
              </li>
           </ul>
        </div>
        <div class="match-footer">
          <div @click="insertMatch">创建比赛</div>
        </div>
      </div>
    </div>
  </modal-1>
</template>

<script>
// 下载模态窗
import Modal1 from "@/components/common/modal1";
import { applyOfficialMatch } from "@/request/officialMatch"
import {checkBadWords} from '@/request/other'
export default {
  props: {
    show: Boolean,
    PatternInfo: Array,
    
  },
  components: {
    Modal1
  },
  mounted() {
    var myDate = new Date();
    let that = this
    let minDate =
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getDate() +
      " " +
      myDate.getHours() +
      ":" +
      myDate.getMinutes() +
      ":" +
      myDate.getSeconds();
    var _t = new Date().getTime() + 45 * 60 * 1000;
    var maxRestDate = new Date(_t);
    let maxDate =
      maxRestDate.getFullYear() +
      "-" +
      (maxRestDate.getMonth() + 1) +
      "-" +
      maxRestDate.getDate() +
      " " +
      maxRestDate.getHours() +
      ":" +
      maxRestDate.getMinutes() +
      ":" +
      maxRestDate.getSeconds();
    window.laydate.render({
      elem: "#datePicker2", //指定元素
      type: "date",
       min: minDate,
      // max: maxDate,
      theme: "#1C2026",
      calendar: true,
      range: true, //设置时间区域
      change: function(value, date, endDate) {
        that.startDate = date.year+'-'+date.month+'-'+date.date
        that.endDate = endDate.year+'-'+endDate.month+'-'+endDate.date
        if (this.dataType == 1) {
          return false;
        }
      },
      done: function(value, date, endDate) {
        that.startDate = date.year+'-'+date.month+'-'+date.date
        that.endDate = endDate.year+'-'+endDate.month+'-'+endDate.date
        that.changeDate = new Date(value).getTime();
      }
    });
  },
  data() {
    return {
      changeDate: "", //选中时间
      startDate:'',
      endDate:'',
      gameId: "",
      selectGameIndex:0,
      machName:'',
      rewardList:'',
      totalMoney:'',
      firstMoney:'',
      createrName:'',
      createrWebsite:'',
      ruleInfo:'',
      rewardInfo:'',
      remark:'',
      errorMsg:'',
      isShowMatchName:'',
      isShowCreateName:'',
      isShowtotalMoney:'',
      isShowfirstMoney:'',
      isShowruleInfo:'',
      isShowrewardInfo:'',
      isShowremark:''
    };
  },
  computed: {
    newGameList() {
      this.gameNewList = this.$store.state.init.gameList.slice(0);
      if(this.gameNewList.length>0){
        this.gameId = this.gameNewList[0].gameId

      }
      return this.gameNewList;
    }
  },
  methods: {
    matchNameFoucsFn(obj){
      this[obj]=''
    },
    matchBlurFn(data,obj){
      if(this[data] !=''){
        this.checkBadWords(data,obj)
      }
    },
    async checkBadWords(data,msg){
        let res = await checkBadWords(this[data])
        if(res.code == 200){
          if(res.data){
            this[msg] = '包含敏感词，请重新输入'
          }
        }
    },
    insertMatch(){
      if(this.machName.length<17 && this.machName.length >0 && this.startDate.length>0 &&
      this.totalMoney.length>0 && 
      this.firstMoney.length>0 && 
      this.createrName.length>0 && 
      this.ruleInfo.length>0 && 
      this.rewardInfo.length>0 &&
      !this.isShowMatchName &&
      this.remark.length>0){
        this.createOfficialMatch()
      }else{
        maskCom({
          title:'提示',
          'txt':['请仔细查看您填写的内容是否有不符合要求的或未填写项']
        })
      }
    },
    async createOfficialMatch(){
      let json={
        officialName: this.machName,
        gameId : this.gameId,
        beginDate:this.startDate,
        endDate:this.endDate,
        organizersName:this.createrName,
        totalMoney:this.totalMoney,
        firstMoney:this.firstMoney,
        ruleInfo:this.ruleInfo,
        rewardInfo:this.rewardInfo,
        remark:this.remark
      }
      let res = await applyOfficialMatch(json)
      let txt
      if(res.code == 200){
        txt ='创建成功'
      }else{
        txt ='重新创建'
      }
      maskCom({
        txt:[res.msg],
        firstBtnTxt:txt,
        isShowColoseBtn:false,
        firstBtnFn:() =>{
          if(res.code == 200){
            this.close()
          }
        }
      })
    },
    selectGameFn(id){
      this.gameId =id
    },
    close() {
      this.$emit("update:show", false);
    },
    datePickerChange(e) {
      this.changeDate = new Date(e).valueOf();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/basicColor.scss";
h3{
  color: #fff;
  text-indent: 26px;
  margin: 20px 0;
}
.modal-box{
  border-radius: 6px;
  overflow: hidden;
}
.modal-body{
  border-top: 1px solid #343b48;
}
h2 {
  color: #fff;
  font-size: 18px;
  text-align: center;
  padding-top: 10px;
}
.modal-body {
  padding: 0;
  .model-from {
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    &.borderStyle{
      border-color: #000;
    }
    padding-bottom: 20px;
    li {
      margin-bottom: 18px;
      &:last-child {
        margin-bottom: 0;
      }
      label{
        color: #fff;
        font-size: 14px;
      }
      >label {
        min-width: 116px;
        display: inline-block;
        font-size: 12px;
        color: rgba(255, 255, 255, .5);
        text-indent: 26px;
      }
      input[type="text"],
      select {
        width: 220px;
        height: 26px;
        background: #16191f;
        border: 1px solid rgba(88, 97, 117, 1);
        color: #fff;
        font-size: 14px;
        text-indent: 8px;
      }
      .gameFeeDesc {
        width: calc(100% - 140px);
        display: inline-block;
        .feeDesc-wrap {
          margin-bottom: 18px;
        }
      }
      .feeDesc-wrap {
        min-width: 140px;
        &:nth-child(6), &:nth-child(10){
          margin-left:118px;
        }
        &:nth-child(6),&:nth-child(7),&:nth-child(8),&:nth-child(9),&:nth-child(10){
          margin-top: 20px;
        }
        // color: #fff;
        display: inline-block;
        font-size: 14px;
        line-height: 18px;
        vertical-align: middle;
        .feeDesc-content{
          min-width: 140px;
          display: inline-block;
        }
        label {
          min-width: 16px;
          text-indent: 6px;
          margin-right: 10px;
        }
      }
      input[type="radio"] {
        appearance: none;
        margin: 0;
        width: 17px !important;
        height: 17px !important;
        background: #13171d;
        border: 1px solid #fff;
        border-radius: 50%;
        transition: 0.2s;
        cursor: pointer;
        color: #363945;
        vertical-align: text-bottom;
        &:hover,
        &:checked {
          background: #97a5b7;
          box-shadow: inset 0 0 0 3px #13171d;
        }

        &:focus {
          outline: 0;
        }
      }
      option {
        text-indent: 8px;
      }
    }
  }
  .match-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 14px;
    padding: 10px 0;
    text-align: center;
    > div {
      width: 126px;
      height: 36px;
      background: linear-gradient(0deg, #ef901f, #db6f11);
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      line-height: 36px;
      margin: 0 auto;
    }
    > p {
      color: #fcfcfc;
      margin: 10px 0;
    }
  }
}
.modal-box {
  width: 762px !important;
  // background: #1C2026;
}
.modal-header {
  background: rgba(0,0,0,0);
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
#datePicker2{
        width: 220px;
        height: 26px;
        background: #16191f;
        border: 1px solid rgba(88, 97, 117, 1);
        color: #fff;
        font-size: 14px;
        text-indent: 8px;
}
</style>



