<template>
  <modal-1 :show="show">
    <div class="modal-box" style="width:420px;">
      <div class="modal-header" style="text-align:left;text-indent:1em;">
        <span class="modal-title" style="font-size:14px;">发起比赛</span>
        <span class="close" @click="close">×</span>
      </div>
      <div class="modal-body" style="width:760px;">
        <ul class="model-from">
          <!-- <li>
            <label>输入房间名</label>
            <input type="text" placeholder="请输入房间ID">
          </li>-->
          <li>
            <label>选择游戏</label>
            <select v-model="gameId">
              <option
                v-for="(item,index) in newGameList"
                :value="item.gameId"
                :key="index"
              >{{item.gameName}}</option>
            </select>
          </li>
          <!-- 比赛类型添加 -->
          <li v-show="$store.state.user.basicInfo.canCreateOfficialMatch && officialRoomList">
            <label>选择比赛类型</label>
            <select v-model="officialId" @change="getofficialId">
              <option
                v-for="(item,index) in officialRoomList"
                :value="item.officialId"
                :key="index"
              >{{item.officialName}}</option>
            </select>
          </li>
          <!-- 比赛类型添加 -->
          <li class="hide">
            <label>选择比赛类型</label>
            <select>
              <option
                v-for="(item,index) in PatternInfo"
                :value="item.gameId"
                :key="index"
              >{{item.gameName}}</option>
            </select>
          </li>
          <!-- 比赛类型添加 -->
          <li>
            <label>选择报名模式</label>
            <div class="gameFeeDesc">
              <div class="feeDesc-wrap">
                <input
                  value="1"
                  class="medium"
                  type="radio"
                  id="patternType1"
                  v-model="patternType"
                  @change="changePatternType(1)"
                >
                <label for="patternType1">付费</label>
              </div>
              <div class="feeDesc-wrap">
                <input
                  value="2"
                  class="medium"
                  type="radio"
                  id="patternType2"
                  v-model="patternType"
                  @change="changePatternType(2)"
                >
                <label for="patternType2">
                  免费
                  <span class="bonusType" v-if="patternType==2">
                    (
                    <span v-if="rankPattern==1">击杀数X{{bonusPerKill}}金币</span>
                    <span v-if="rankPattern==2">总奖金{{bonusTotal}}金币</span>
                    )
                  </span>
                </label>
              </div>
            </div>
          </li>
          <li>
            <label>选择比赛模式</label>
            <select v-model="patternId">
              <option
                v-for="(item,index) in newGameModel"
                :key="index"
                :value="item.patternId"
              >{{item.patternName}}</option>
            </select>
            <div class="profitError" style="display:inline-block">
              *
              <span v-if="rankPattern==1">赏金赛</span>
              <span v-if="rankPattern==2">排名赛</span>
              人数要求≥{{leastStartNum}}
            </div>
          </li>
          <li>
            <label>选择服务器</label>
            <select v-model="gameServerNo">
              <option
                v-for="(item,index) in selectmatchServer"
                :key="index"
                :value="item.gameServerNo"
              >{{item.matchServerDesc}}</option>
            </select>
          </li>
          <li>
            <label>选择地图</label>
            <select v-model="gameMap">
              <option
                v-for="(item,index) in mapSelect"
                :value="item.gameMap"
                :key="index"
              >{{item.gameMapDesc}}</option>
            </select>
          </li>
          <li>
            <label style="vertical-align: top;">选择报名费用</label>
            <div class="gameFeeDesc">
              <div class="feeDesc-wrap" v-for="(item,index) in enrollMoneySelect" :key="index">
                <input
                  :value="index"
                  :checked="index==0"
                  :id="index"
                  class="medium"
                  type="radio"
                  v-model="gameFee"
                  @change="changeEnrollMoney(item)"
                >
                <label :checked="index==0" :for="index">{{item.gameFeeDesc}}</label>
              </div>
            </div>
          </li>
          <li v-if="rankPattern==1">
            <label>我的收益</label>
            <input type="text" :value="predictMoney">
          </li>
          <li v-if="rankPattern==2">
            <label class="fl">排名收益(占报名费比例)</label>
            <div class="fl profitError" v-if="!profitCaheck">*{{profitError}}</div>
            <br>
            <ul class="profit-wrap">
              <li v-for="(item,index) in profitList" :key="index">
                <span>第{{index+1 | setStr}}名</span>
                <input
                  v-model.number="item.profit"
                  placeholder="0"
                  maxlength="2"
                  :class="{profitInputError:item.inputError}"
                  @keydown="handleInput($event,item.profit,index)"
                  @keyup="upInput(item,index)"
                > %
              </li>
              <li class="add-circle">
                <i class="ivu-icon ivu-icon-ios-add-circle-outline" @click="addProfit"></i>
              </li>
            </ul>
          </li>
          <li>
            <label>比赛密码</label>
            <div class="feeDesc-wrap">
              <div class="feeDesc-content">
                <input
                  value="1"
                  class="medium"
                  name="Password"
                  type="radio"
                  id="no_password"
                  v-model="isPwd"
                >
                <label for="no_password">不需要密码</label>
              </div>
              <div class="feeDesc-content">
                <input
                  value="2"
                  class="medium"
                  name="Password"
                  type="radio"
                  id="set_password"
                  v-model="isPwd"
                >
                <input type="number" placeholder="设置4位房间密码" v-model="roomPwd">
              </div>
            </div>
          </li>
          <li>
            <label>确定比赛时间</label>
            <div class="feeDesc-wrap">
              <div class="feeDesc-content">
                <input
                  value="1"
                  class="medium"
                  name="setDtae"
                  type="radio"
                  id="no_date"
                  v-model="dataType"
                >
                <label for="no_date">人满即开</label>
              </div>
              <div class="feeDesc-content">
                <input
                  value="2"
                  class="medium"
                  name="setDtae"
                  type="radio"
                  id="set_date"
                  checked
                  v-model="dataType"
                >
                <input type="text" id="datePicker" placeholder="比赛开始时间">
              </div>
            </div>
          </li>
          <!-- <li>
            <label>其他限制</label>
            <input type="text" name id>
          </li>-->
        </ul>
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
import {
  insertMatch,
  getPassportOfficialMatchInfo,
  validateRoomPwd,
  addPossportRoom
} from "@/request/match";
export default {
  props: {
    show: Boolean,
    PatternInfo: Array
  },
  components: {
    Modal1
  },
  watch: {
    PatternInfo() {
      this.PatternInfo.forEach(el => {
        el.slectGameMap = [];
        el.gameMapDesc = this.arrSplit(el.gameMapDesc);
        el.gameMap = this.arrSplit(el.gameMap);
        el.gameMapDesc.forEach((e, index) => {
          var json = {
            gameMap: "",
            gameMapDesc: ""
          };
          json.gameMap = el.gameMap[index];
          json.gameMapDesc = e;
          el.slectGameMap.push(json);
        });
        el.selectGamePattern = [];
        el.gamePatternDesc = this.arrSplit(el.gamePatternDesc);
        el.gamePattern = this.arrSplit(el.gamePattern);
        el.gamePatternDesc.forEach((e, index) => {
          let json = {
            gamePattern: "",
            gamePatternDesc: ""
          };
          json.gamePattern = el.gamePattern[index];
          json.gamePatternDesc = e;
          el.selectGamePattern.push(json);
        });
        el.selectgameFeeDesc = [];
        el.gameFee = this.arrSplit(el.gameFee);
        el.gameFeeDesc = this.arrSplit(el.gameFeeDesc);
        el.gameFeeDesc.forEach((e, index) => {
          let json = {
            gameFee: "",
            gameFeeDesc: ""
          };
          json.gameFee = el.gameFee[index];
          json.gameFeeDesc = e;
          el.selectgameFeeDesc.push(json);
        });
        el.selectmatchPattern = [];
        el.matchPattern = this.arrSplit(el.matchPattern);
        el.matchPatternDesc = this.arrSplit(el.matchPatternDesc);
        el.matchPatternDesc.forEach((e, index) => {
          let json = {
            matchPattern: "",
            matchPatternDesc: ""
          };
          json.matchPattern = el.matchPattern[index];
          json.matchPatternDesc = e;
          el.selectmatchPattern.push(json);
        });
        el.selectmatchServer = [];
        el.matchServer = this.arrSplit(el.matchServer);
        el.matchServerDesc = this.arrSplit(el.matchServerDesc);
        el.matchServerDesc.forEach((e, index) => {
          let json = {
            gameServerNo: "",
            matchServerDesc: ""
          };
          json.gameServerNo = el.matchServer[index];
          json.matchServerDesc = e;
          el.selectmatchServer.push(json);
        });
        el.selectpatternId = {
          patternId: el.patternId,
          patternName: el.patternName
        };
        el.selectrewardBonusCalculateType = [];
        el.rewardBonusCalculateType = this.arrSplit(
          el.rewardBonusCalculateType
        );
        el.rewardBonusCalculateTypeDesc = this.arrSplit(
          el.rewardBonusCalculateTypeDesc
        );
        el.rewardBonusCalculateTypeDesc.forEach((e, index) => {
          let json = {
            rewardBonusCalculateType: "",
            rewardBonusCalculateTypeDesc: ""
          };
          json.rewardBonusCalculateType = el.rewardBonusCalculateType[index];
          json.rewardBonusCalculateTypeDesc = e;
          el.selectrewardBonusCalculateType.push(json);
        });
        el.selectrewardCalculateType = [];
        el.rewardCalculateType = this.arrSplit(el.rewardCalculateType);
        el.rewardCalculateTypeDesc = this.arrSplit(el.rewardCalculateTypeDesc);
        el.rewardCalculateTypeDesc.forEach((e, index) => {
          let json = {
            rewardCalculateType: "",
            rewardCalculateTypeDesc: ""
          };
          json.rewardCalculateType = el.rewardCalculateType[index];
          json.rewardCalculateTypeDesc = e;
          el.selectrewardCalculateType.push(json);
        });
      });
      this.gameNewList.forEach(ele => {
        let selectGamePattern = [];
        let selectgameFeeDesc = [];
        let selectmatchServer = [];
        let selectrewardBonusCalculateType = [];
        let selectrewardCalculateType = [];
        let selectrewardRuleType = [];
        let slectGameMap = [];
        this.gameModel[ele.gameId] = [];
        this.PatternInfo.forEach((el, index) => {
          if (ele.gameId == el.gameId) {
            let json = {
              bonusPattern: el.bonusPattern,
              bonusPerKill: el.bonusPerKill,
              bonusTotal: el.bonusTotal,
              patternId: el.patternId,
              patternName: el.patternName,
              patternName: el.patternName,
              peopleUp: el.peopleUp,
              rewardRuleType: el.rewardRuleType,
              rankPattern: el.rankPattern,
              maxTotalRewardPercent: el.maxTotalRewardPercent,
              leastStartNum: el.leastStartNum,
              rewardRuleTypeDesc: this.PatternInfo[index].rewardRuleTypeDesc,
              selectGamePattern: this.PatternInfo[index].selectGamePattern,
              selectgameFeeDesc: this.PatternInfo[index].selectgameFeeDesc,
              selectmatchServer: this.PatternInfo[index].selectmatchServer,
              selectrewardBonusCalculateType: this.PatternInfo[index]
                .selectrewardBonusCalculateType,
              selectrewardCalculateType: this.PatternInfo[index]
                .selectrewardCalculateType,
              slectGameMap: this.PatternInfo[index].slectGameMap
            };
            this.gameModel[ele.gameId].push(json);
          }
        });
      });
      if (this.gameModel[this.gameId].length > 0) {
        this.patternId = this.gameModel[this.gameId][0].patternId;
      } else {
        this.patternId = "";
      }
      this.gameModel[this.gameId].unshift([], []);
      this.gameModel[this.gameId].forEach(element => {
        if (element.bonusPattern == 1) {
          this.gameModel[this.gameId][0].push(element);
        } else if (element.bonusPattern == 2) {
          this.gameModel[this.gameId][1].push(element);
        }
      });
      this.gameModel[this.gameId].length = 2;

      this.getPassportOfficialMatchInfo();
    },
    gameId() {
      this.changePatternType(1);
    },
    patternId() {
      let _i = parseInt(this.patternType - 1);
      if (this.gameModel[this.gameId].length > 0) {
        this.gameModel[this.gameId][_i].forEach(el => {
          if (el.patternId == this.patternId) {
            this.selectmatchServer = el.selectmatchServer;
            this.gameServerNo = this.selectmatchServer[0].gameServerNo;
            this.mapSelect = el.slectGameMap;
            this.gameMap = this.mapSelect[0].gameMap;
            this.enrollMoneySelect = el.selectgameFeeDesc;
            this.gameFee = this.enrollMoneySelect[0].gameFee;
            this.peopleUp = el.peopleUp;
            this.predictMoney = Number(this.gameFee) * Number(el.peopleUp);
            this.rankPattern = el.rankPattern;
            this.maxTotalRewardPercent = el.maxTotalRewardPercent;
            this.leastStartNum = el.leastStartNum;
            this.bonusPerKill = el.bonusPerKill;
            this.bonusTotal = el.bonusTotal;
            // if(el.rewardRuleType == '人头赛'){
            //   this.firstMoney ='"'+ this.enrollMoney +'x' + el.rewardRuleType+'"'
            // }
          }
        });
        this.newGameModel = this.gameModel[this.gameId][_i];
      } else {
        this.newGameModel = [];
      }
    }
  },
  mounted() {
    this.layuiDate();
  },
  data() {
    return {
      getInfo: [],
      z: [],
      gameModel: {},
      newGameModel: [],
      bonusPerKill: 0,
      bonusTotal: 0,
      changeDate: "", //选中时间
      matchPw: "", //比赛密码
      gameId: "",
      predictMoney: 0, //预计收益
      enrollMoney: 0, //报名费用占位符
      enrollMoneyTrue: 0, //报名费用
      patternId: "", //玩法模式
      gameServerNo: "", //服务器地址
      gameMap: "", //地图,
      gameFee: "",
      selectmatchServer: [], //服务器数组,
      mapSelect: "", //地图，
      enrollMoneySelect: "", //是否收费
      dataType: 1, //比赛类型  人满||时间
      isPwd: 1, //是否需要密码
      rankPattern: 1, //排名模式 1 赏金赛， 2 排位赛
      patternList: [],
      patternType: 1, //选择报名模式 2免费 1付费
      maxTotalRewardPercent: 100, //排位赛最大赏金比例
      leastStartNum: 0, //最小开始比赛人数
      profitError: "", //收益错误提示信息
      profitList: [
        {
          profit: ""
        },
        {
          profit: ""
        },
        {
          profit: ""
        },
        {
          profit: ""
        },
        {
          profit: ""
        }
      ], //排名赛收益列表
      profitCaheck: true, //是否可以开始
      profitTotal: 0, //收益总数
      roomPwd: "",
      roomBeginDate: "",
      firstMoney: 1,
      matchType: 1,
      peopleUp: "",
      matchType: 1,
      officialRoomList: [],
      officialIdNum: "",
      officialId: "",
      isClick: true
    };
  },
  computed: {
    newGameList() {
      this.gameNewList = this.$store.state.init.gameList.slice(0);
      if (this.gameNewList.length > 0) {
        this.gameId = this.gameNewList[0].gameId;
      }
      return this.gameNewList;
    }
  },
  filters: {
    setStr(section) {
      var chnNumChar = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ];
      var chnUnitChar = ["", "十", "百", "千"];
      var strIns = "",
        chnStr = "";
      var unitPos = 0;
      var zero = true;
      while (section > 0) {
        var v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr.replace(/一十/, "十");
    }
  },
  methods: {
    // 修改报名模式
    changePatternType(type) {
      this.patternType = type;
      if (JSON.stringify(this.gameModel) !== "{}") {
        if (this.gameModel[this.gameId].length > 0) {
          this.newGameModel = this.gameModel[this.gameId][type - 1];
          this.patternId = this.newGameModel[0].patternId;
        } else {
          this.newGameModel = [];
          this.patternId = "";
        }
      } else {
        this.newGameModel = [];
        this.patternId = "";
      }
    },
    // 输入错误警告
    profitErrorFn(val, str) {
      this.profitCaheck = false;
      this.profitError = str;
      val.inputError = true;
    },
    // 输入错误纠正
    profitSuFn(val) {
      this.profitCaheck = true;
      val.inputError = false;
    },
    // 键盘抬起事件
    upInput(val, index) {
      let Total = 0;
      let errorNum = 0;
      if (index > 0) {
        if (
          val.profit != "" &&
          val.profit >= this.profitList[index - 1].profit
        ) {
          // n+1位不能大于 n位的数值
          this.profitErrorFn(val, "不得≥前一名奖励");
        } else if (val.profit != "" && this.profitList.length > index + 1) {
          if (val.profit <= this.profitList[index + 1].profit) {
            // n-1位不能小于 n位的数值
            this.profitErrorFn(val, "不得≤后一名奖励");
          } else {
            this.profitSuFn(val);
          }
        } else if (val.profit == "") {
          let strNum = 0;
          for (let i = index; i < this.profitList.length; i++) {
            const element = this.profitList[i];
            if (element.profit > 0) {
              strNum += element.profit;
            }
          }
          if (strNum > 0) {
            // n-1位不能小于 n位的数值
            this.profitErrorFn(val, "不得≤后一名奖励");
          } else {
            this.profitSuFn(val);
          }
        } else {
          this.profitSuFn(val);
        }
      }
      this.profitList.forEach(element => {
        if (element.inputError) {
          errorNum++;
        }
        if (element.profit != "") {
          Total += parseInt(element.profit);
        }
      });
      if (Total >= this.maxTotalRewardPercent) {
        this.profitCaheck = false;
        this.profitError = `奖金总额不得≥${this.maxTotalRewardPercent}%`;
      } else {
        if (errorNum > 0) {
          this.profitCaheck = false;
        } else {
          this.profitCaheck = true;
        }
      }
    },
    handleInput(e) {
      if (
        (e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 8 || e.keyCode > 9) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    },
    delProfitList() {
      this.patternType = 1;
      this.rankPattern = 1;
      this.profitList.length = 5;
      this.profitCaheck = true;
      this.profitList.forEach(element => {
        element.profit = "";
        element.inputError = false;
      });
    },
    addProfit() {
      this.profitList.push({
        profit: ""
      });
    },
    getofficialId() {
      // console.log(this.officialId);
    },
    layuiDate() {
      var myDate = new Date();
      let minDate = new Date().getTime() + 10 * 60 * 1000;
      // let minDate = new Date().getTime();
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
      var _t = new Date().getTime() + 12 * 60 * 60 * 1000;
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
        elem: "#datePicker", //指定元素
        type: "datetime",
        min: minDate,
        max: maxDate,
        theme: "#1C2026",
        calendar: true,
        change: function(value, date, endDate) {
          if (this.dataType == 1) {
            return false;
          }
        },
        done: function(value, date, endDate) {
          window.changeDate = new Date(value).getTime();
        }
      });
    },
    async getPassportOfficialMatchInfo() {
      let res = await getPassportOfficialMatchInfo();
      let json = {
        officialId: 0,
        officialName: "个人赛事"
      };
      res.records.unshift(json);
      this.officialRoomList = res.records;
      this.officialId = this.officialRoomList[0].officialId;
    },
    async validateRoomPwd(roomId, pwd) {
      var json;
      if (pwd == "") {
        json = {
          roomId: roomId
        };
      } else {
        json = {
          roomId: roomId,
          pwd: pwd
        };
      }
      let that = this;
      let res = await validateRoomPwd(json);
      if (res.code == 200) {
        that.$emit("joinGame", roomId);
      } else {
        maskCom({
          title: "提示",
          txt: [res.msg],
          firstBtnTxt: "确定"
        });
      }
    },
    async addPossportRoom(roomId) {
      let that = this;
      let res = await addPossportRoom({
        roomId: roomId
      });
      if (res.code == 200) {
        that.$emit("joinGame", roomId);
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 11,
          data: { roomId: roomId }
        });
        window.$nuxt.$store.dispatch("toClient/sendMsg", {
          type: 12,
          data: { msg: "获取roomId" }
        });
      } else {
        maskCom({
          title: "提示",
          txt: [res.msg],
          firstBtnTxt: "确定"
        });
      }
    },
    async insertMatch() {
      if (!this.profitCaheck) {
        return false;
      }
      let profitStr = [];
      let errorNum = 0;
      this.profitList.forEach(element => {
        profitStr.push(element.profit);
        if (element.inputError) {
          errorNum++;
        }
      });
      if (errorNum > 0) {
        return;
      }
      let json = {
        gameId: this.gameId,
        dataType: this.dataType,
        enrollMoney: this.enrollMoney,
        predictMoney: this.predictMoney,
        patternId: this.patternId,
        gameMap: this.gameMap,
        firstMoney: this.firstMoney,
        gameServerNo: this.gameServerNo,
        matchType: this.matchType,
        rankReward: profitStr.toString()
      };
      if (this.isPwd == 1) {
        //this.dataType = 1
        this.isClick = true;
      } else {
        if (this.roomPwd.length != 4) {
          maskCom({
            txt: ["请输入4位房间密码"],
            firstBtnTxt: "确定"
          });
          this.isClick = false;
        } else {
          json.roomPwd = this.roomPwd;
          this.isClick = true;
        }
      }
      if (this.dataType != 1) {
        if (window.changeDate == undefined) {
          maskCom({
            txt: ["请选择比赛开始时间"],
            firstBtnTxt: "确定"
          });
          this.isClick = false;
        } else {
          json.roomBeginDate = window.changeDate;
          this.isClick = true;
        }
      }
      if (this.officialId != 0) {
        this.matchType = 2;
        json.officialId = this.officialId;
        json.matchType = 2;
      } else {
        json.matchType = 1;
      }
      if (
        this.gameId &&
        this.patternId &&
        this.gameServerNo &&
        this.gameMap &&
        this.isClick
      ) {
        let res = await insertMatch(json);
        if (res.code == 200) {
          this.$emit("update:show", false);
          this.delProfitList();
          let that = this;
          setTimeout(() => {
            if (that.isPwd == 2) {
              that.validateRoomPwd(res.data.roomId, that.roomPwd);
            } else {
              that.addPossportRoom(res.data.roomId);
            }
          }, 100);
        } else {
          maskCom({
            txt: [res.msg],
            firstBtnTxt: "确定"
          });
        }
      } else {
        if (this.isClick) {
          maskCom({
            txt: ["请填写正确比赛信息"],
            firstBtnTxt: "确定"
          });
        }
      }
    },
    getGameMap(e) {
      this.gameMap = e.target.value;
    },
    getmMtchServer(e) {
      this.matchServer = e.target.value;
    },
    changeEnrollMoney(i) {
      // 需要修改
      this.enrollMoney = i.gameFee;
      if (this.rankPattern == 1) {
        this.predictMoney =
          (Number(i.gameFee) * Number(this.peopleUp) * 5) / 100;
      }
    },
    close() {
      this.$emit("update:show", false);
      this.delProfitList();
    },
    datePickerChange(e) {
      this.changeDate = new Date(e).valueOf();
    },
    arrSplit(str) {
      if (str.length > 0 && str != undefined) {
        return str.split(",");
      }
    },
    StrSplit(str, key) {
      if (isNaN(str)) {
        if (key == "patternName" || str instanceof Array) {
          return str;
        }
        return str.split(",");
      } else {
        return str;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/style/components/modal1.scss";
@import "~assets/style/basicColor.scss";
.modal-box {
  border-radius: 6px;
  overflow: hidden;
}
h2 {
  color: #fff;
  font-size: 18px;
  text-align: center;
  padding-top: 10px;
}
.modal-body {
  .model-from {
    border-bottom: 1px solid #000;
    padding-bottom: 20px;
    li {
      margin-bottom: 18px;
      &:last-child {
        margin-bottom: 0;
      }
      label {
        color: #fff;
        font-size: 14px;
      }
      > label {
        min-width: 116px;
        display: inline-block;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        text-indent: 26px;
      }
      #datePicker {
        width: 220px;
        height: 26px;
        background: #16191f;
        border: 1px solid rgba(88, 97, 117, 1);
        color: #fff;
        font-size: 14px;
        text-indent: 8px;
      }
      input[type="text"],
      input[type="number"],
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
        // color: #fff;
        display: inline-block;
        font-size: 14px;
        line-height: 18px;
        // vertical-align: middle;
        .feeDesc-content {
          min-width: 140px;
          display: inline-block;
        }
        label {
          min-width: 16px;
          cursor: pointer;
          text-indent: 6px;
          margin-right: 10px;
        }
      }
      .profitError {
        font-size: 12px;
        color: #ef901f;
        margin-left: 16px;
      }
      .profit-wrap {
        width: 560px;
        height: 79px;
        background: rgba(27, 32, 40, 1);
        border: 1px solid rgba(60, 63, 69, 1);
        margin: 6px 0 0 118px;
        padding: 10px;
        overflow-y: auto;
        > li {
          width: 123px;
          color: #fff;
          font-size: 14px;
          display: inline-block;
          margin-right: 12px;
          &:nth-child(4n + 4) {
            margin-right: 0;
          }
          &.add-circle {
            width: 120px;
          }
          & > i {
            cursor: pointer;
            font-size: 26px;
          }
          input {
            width: 30px;
            height: 26px;
            background: transparent;
            border: 1px solid rgba(88, 97, 117, 1);
            padding: 0 4px;
            transition: 0.3s;
            &.profitInputError {
              border-color: #745243;
            }
          }
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
  background: rgba(0, 0, 0, 0) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
}
</style>
