<template>
  <div class="newsList w12">
    <div class="inNewsList">
      <ul v-if="newsList !=null && newsList.length>0">
        <li class="clearfix" v-for="(item,index) in newsList" :key="index">
          <div class="fl imgCon pr" v-if="item.imgUrl != undefined ">
            <div
              class="zoomImage"
              style="padding-bottom:54.75%;"
              :style="{'background-image':'url('+item.imgUrl+')'}"
            ></div>
          </div>
          <div
            class="fl msgCon pr"
            :class="{msgWid:item.imgUrl != undefined && item.imgUrl.length>0}"
          >
            <nuxt-link :to="'/news/detail/'+item.newsId" tag="a" class="ells1 f20 cp">
              <b v-if="item.type == 1">【公告】</b>
              <b v-else>【新闻】</b>
              {{item.title}}
            </nuxt-link>
            <div class="ells2 inMsgCon">{{item.summary}}</div>
            <div class="pa time f12" v-text="showDate(item.createTime)"></div>
          </div>
        </li>
      </ul>
    </div>
    <loadingCom v-show="isShowLoading"/>
    <div v-if="current < totalPage" class="loaderMore tac f16" @click.stop="loadeMoreFn">查看更多</div>
  </div>
</template>
<script>
import { getNewsList } from "@/request/userNotice";
import loadingCom from "@/components/loading/index";
import { showDate, traferVisibleMarchTime } from "@/assets/utils/time";
export default {
  data() {
    return {
      newsList: [],
      isShowLoading: true,
      current: 1,
      size: 10,
      totalPage: 1
    };
  },
  filters: {
    formatDate(time) {
      var d = new Date(time);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    }
  },
  components: {
    loadingCom
  },
  mounted() {
    this.getNewsList();
  },
  methods: {
    traferVisibleMarchTime,
    showDate(time) {
      return showDate("Y年M月D日h:m", time);
    },
    async getNewsList() {
      let res = await getNewsList(this.current, this.size);
      if (res.code == 200) {
        this.isShowLoading = false;
        this.totalPage = Math.ceil(res.data.total / this.size);
        if (this.current == 1) {
          this.newsList = res.data.records;
        } else {
          res.data.records.forEach(element => {
            this.newsList.push(element);
          });
        }
      }
    },
    loadeMoreFn() {
      this.current += 1;
      this.isShowLoading = true;
      this.getNewsList();
    }
  }
};
</script>
<style lang="scss" scoped>
.newsList {
  color: rgba(128, 128, 138, 1);
  ul {
    width: 100%;
    padding: 0 50px 40px;
    border: 1px solid rgba(53, 61, 77, 1);
    box-shadow: 0px 2px 7px 0px rgba(26, 30, 38, 1);
    background: #242a35;
    box-sizing: border-box;
    li {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .imgCon {
      width: 230px;
      height: 126px;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
    .msgCon {
      width: 1032px;
      margin-left: 16px;
      height: 126px;
      &.msgWid {
        width: 800px;
      }
      h3 {
        color: #fff;
        margin-bottom: 16px;
        &:hover {
          color: #f1a116;
        }
      }
      .inMsgCon {
        line-height: 24px;
        height: 42px;
      }
      .time {
        color: #f1a116;
        bottom: 0;
      }
    }
  }
}
</style>