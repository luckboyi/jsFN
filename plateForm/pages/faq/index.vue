<template>
  <div class="newsDetailCon w12">
    <div class="inNewDetailCon">
      <ul class="faq-anchor">
        <li>FAQ快速导航</li>
        <li
          v-for="(item,index) in faqAnchor"
          :key="index"
          :class="{anchorActive:index==faqIndex}"
          @click="goAnchor(item.link,index)"
        >{{item.title}}</li>
      </ul>
      <div class="title tac">
        <h2 class="tac f20">FAQ</h2>
        <p class="time f12">2018-11-23 08:30</p>
      </div>
      <div class="content f14">
        <div v-for="(item,index) in data" :key="index">
          <h3 class="f16 fw" :id="item.id" v-show="item.title !=''">{{item.title}}</h3>
          <p v-for="(list,key) in item.msg" :key="key">{{list}}</p>
          <p class="tac imgCon" v-show="item.img !=''">
            <img :src="item.img">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: "1、如何登陆？",
          msg: [
            "进入平台后首先需要登陆，有两种登陆方式：手机登录和维护大师账号登录；"
          ],
          img: "/static/faq/1.1.png",
          id: "isLogin"
        },
        {
          title: "",
          msg: [
            "手机登录方式为输入手机号后发送验证码登录，无需注册，直接登录；"
          ],
          img: "/static/faq/1.2.png"
        },
        {
          title: "",
          msg: [
            "通过维护大师账号登录，需要先注册维护大师账号，登录维护大师官网www.weihudashi.com免费注册账号，再使用维护大师账号登录；"
          ],
          img: ""
        },
        {
          title: "2、如何创建战队？",
          msg: ["战队创建过程如下图："],
          img: "/static/faq/2.1.png",
          id: "createTeam"
        },
        {
          title: "",
          msg: ["在客户端点击“战队”"],
          img: "/static/faq/2.2.png"
        },
        {
          title: "",
          msg: ["点击“创建战队”"],
          img: "/static/faq/2.3.png"
        },
        {
          title: "",
          msg: ["填写战队名称及标志信息"],
          img: "/static/faq/2.4.png"
        },
        {
          title: "",
          msg: [
            "创建完成，完成后可在战队列表中查看自己的战队信息；",
            "创建战队的好处：创建战队后即成为该战队的战队长，当战队人数超过50人时，战队长拥有发起比赛的权限，战队长发起的比赛战队长可获得5%的门票分成；副队长发起比赛可获得4%的门票分成，战队长得1%；"
          ],
          img: ""
        },
        // {
        //   title:'',
        //   msg:['当创建战队完成后，队长或副队长可发起比赛，副队长由队长从队员中选拔，一个战队最多三个副队长；'],
        //   img:''
        // },
        {
          title: "3、如何加入战队",
          msg: [
            "在战队页面找到自己想要加入的战队，点击“申请加入”，等待战队长的同意；"
          ],
          img: "/static/faq/2.5.png",
          id: "addTeam"
        },
        {
          title: "",
          msg: [
            "战队长在我的战队中的申请名单中可看到申请人的申请，可选择同意或拒绝；"
          ],
          img: "/static/faq/2.6.png"
        },
        {
          title: "",
          msg: ["队长可在战队成员中选拔副队长，副队长人数最多为3人；"],
          img: "/static/faq/2.7.png"
        },
        {
          title: "4、如何发起比赛",
          msg: ["发起比赛的要求必须是有发起比赛权限的账号；"],
          img: "/static/faq/2.8.png",
          id: "LaunchMatch"
        },
        {
          title: "",
          msg: [""],
          img: "/static/faq/2.9.png"
        },
        {
          title: "",
          msg: ["创建比赛的信息；"],
          img: "/static/faq/3.0.png"
        },
        {
          title: "",
          msg: ["进入房间后可查看玩家及房间信息、奖金等；"]
          // img:'/static/faq/3.1.png'
        },
        {
          title: "",
          msg: [
            "当比赛即将开始时系统会自动在游戏中开设房间，房主只需打开PUBG客户端即可；"
          ],
          img: "/static/faq/3.2.png"
        },
        {
          title: "",
          msg: [""],
          img: "/static/faq/3.3.png"
        },
        {
          title: "",
          msg: ["进入大厅后可平台会倒计时5分钟，倒计时结束后比赛开始；"],
          img: ""
        },
        {
          title: "5、如何加入比赛？",
          msg: [
            "登录巅峰电竞客户端，选择想加入的游戏房间，进入房间后，点击“加入比赛”，既可以完成比赛报名；或搜索房间号码可以快速找到房间；",
            "临近比赛开始，客户端会弹出游戏官方房间提示，玩家进入游戏后进入指定的房间就可以加入比赛。",
            "当房间信息弹出后，5分钟内需进入官方房间内，5分钟游戏将开始。"
          ],
          img: "/static/faq/3.4.png",
          id: "addMatch"
        },
        {
          title: "",
          msg: ["选择想进入的房间，点击“加入”"],
          img: "/static/faq/3.5.png"
        },
        {
          title: "",
          msg: [
            "在房间中等待比赛开始，进入房间后要点击右下角加入比赛进入等待序列，如已进入比赛序列后退出将返回房间费的80%；"
          ],
          img: "/static/faq/3.6.png"
        },
        {
          title: "",
          msg: ["等游戏房间信息弹出后复制信息进入游戏；"],
          img: "/static/faq/3.7.png"
        },
        {
          title: "",
          msg: [""],
          img: "/static/faq/3.8.png"
        },
        {
          title: "6、关于比赛的支付",
          msg: [
            "不同的比赛报名费用不同，收取报名费的比赛，您必须充值获得钻石后才可以报名进入比赛。如果您已经点击“加入比赛”报名成功后，退出还未开始的比赛，则返还报名费的80%。"
          ],
          img: "",
          id: "MatchPay"
        },
        {
          title: "关于钻石、金币的作用：",
          msg: [
            "A、钻石：用于加入付费房间，可以通过支付宝与微信进行充值；",
            "B、金币：房间比赛后会根据房间规则发放相应的金币作为奖励，金币可用于商城购买；"
          ],
          img: ""
        },
        {
          title: "7、关于比赛的结算",
          msg: [
            "当正常在巅峰电竞报名后，并且进入游戏，当游戏完成后，在个人消息中既可以收到该场比赛的结算信息，该场比赛结束后大概需要10-15分钟的时间，您将收到比赛结算信息。",
            "如果：该场比赛游戏开始后，您没有正常进入游戏，则比赛结束后将100%退还报名费"
          ],
          img: "/static/faq/3.9.png",
          id: "MatchSettlement"
        },
        {
          title: "",
          msg: [
            "当比赛结束后等待10-15分钟，点击平台客户端右上角信封按钮查看通知，会出现战报结算；"
          ],
          img: "/static/faq/4.0.png"
        },
        {
          title: "",
          msg: ["战报结算会显示上场比赛的结算信息；"],
          img: ""
        }
      ],
      faqAnchor: [
        {
          title: "如何登陆",
          link: "#isLogin"
        },
        {
          title: "如何创建战队",
          link: "#createTeam"
        },
        {
          title: "如何加入战队",
          link: "#addTeam"
        },
        {
          title: "如何发起比赛",
          link: "#LaunchMatch"
        },
        {
          title: "如何加入比赛",
          link: "#addMatch"
        },
        {
          title: "关于比赛的支付",
          link: "#MatchPay"
        },
        {
          title: "关于比赛的结算",
          link: "#MatchSettlement"
        }
      ],
      faqIndex: 0,
      isClick: true
    };
  },
  methods: {
    goAnchor(el, index) {
      if (!this.isClick) {
        return;
      }
      let self = this;
      self.isClick = false;
      this.$nextTick(() => {
        self.faqIndex = index;
        let odiv = document.querySelector(".bodyCon");
        let itarget = document.querySelector(el).offsetTop;
        let timer = setInterval(function() {
          let speed = (itarget - odiv.scrollTop) / 3;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          if (odiv.scrollTop == itarget) {
            self.isClick = true;
            clearInterval(timer);
          } else {
            odiv.scrollTop = odiv.scrollTop + speed;
          }
        }, 40);
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@mixin activeClass {
  background: rgba(162, 173, 200, 0.3);
  color: #fff;
  position: relative;
}
.newsDetailCon {
  .inNewDetailCon {
    width: 980px;
    background: rgba(36, 42, 53, 1);
    border: 1px solid rgba(53, 61, 77, 1);
    box-sizing: border-box;
    float: right;
    position: relative;
    overflow-y: scroll;
    .faq-anchor {
      width: 178px;
      min-height: 200px;
      background: transparent;
      margin-left: -600px;
      position: fixed;
      top: 100px;
      left: 50%;
      li {
        width: 100%;
        height: 44px;
        background: #242a35;
        color: #7c7e81;
        cursor: pointer;
        font-size: 14px;
        line-height: 44px;
        text-align: center;
        transition: 0.3s;
        &:hover {
          @include activeClass;
        }
        &:first-child {
          height: 31px;
          background: rgba(19, 23, 29, 1);
          border: 1px solid rgba(53, 61, 77, 1);
          color: rgba(207, 207, 207, 1);
          cursor: default;
          font-size: 16px;
          line-height: 31px;
          margin-bottom: 8px;
        }
        &.anchorActive {
          @include activeClass;
          &::after {
            content: "";
            width: 3px;
            height: 44px;
            background: rgba(52, 178, 250, 1);
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
  .title {
    color: rgba(128, 128, 138, 1);
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    margin-bottom: 20px;
    h2 {
      color: rgba(255, 255, 255, 1);
      margin-bottom: 10px;
    }
  }
  .content {
    color: rgba(202, 200, 200, 1);
    line-height: 26px;
    padding-left: 2em;
    p {
      margin-bottom: 10px;
    }
  }
  .imgCon {
    width: 100%;
    display: inline-block;
    img {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>

