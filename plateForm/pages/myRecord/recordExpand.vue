<template>
  <div class="record-wrap">
    <div class="columns">
      <div v-for="(item,index) in columns" :key="index">{{item.title}}</div>
    </div>
    <div class="datas">
      <div v-for="(item,index) in data" :key="index" :class="'noBorder'+item.sort">
        <div class="rankStyle">{{item.data[0].rank}}</div>
        <div v-for="(element,i) in item.data" :key="i">
          <div></div>
          <div class="name">
            <span>{{element.name}}</span>
          </div>
          <div>{{element.damageDealt}}</div>
          <div>{{element.kills}}</div>
          <div>{{element.headShotKills}}</div>
          <div>{{element.assists}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// request
import { getPubgMatchStatsList } from "@/request/game";
export default {
  props: {
    row: Object,
    tagIndex: Number
  },
  data() {
    return {
      columns: [
        {
          title: "排名",
          key: "rank"
        },
        {
          title: "玩家",
          key: "name"
        },
        {
          title: "伤害",
          key: "damageDealt"
        },
        {
          title: "击杀/击倒",
          key: "kills"
        },
        {
          title: "爆头",
          key: "headShotKills"
        },
        {
          title: "助攻",
          key: "assists"
        }
      ],
      data: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getPubgMatchStatsList();
    });
  },
  methods: {
    async getPubgMatchStatsList() {
      let params = {
        roomId: this.row.roomId
      };
      let res = await getPubgMatchStatsList(params);
      // this.data = res.data;
      var map = {},
        dest = [];
      for (var i = 0; i < res.data.length; i++) {
        var ai = res.data[i];
        if (!map[ai.sort]) {
          dest.push({
            sort: ai.sort,
            data: [ai]
          });
          map[ai.sort] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.sort == ai.sort) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      this.data = dest;
    }
  }
};
</script>
<style lang="scss">
$Columns: 100;
@mixin nthStyle {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-self: center;
}
.record-wrap {
  background: #1d2331;
  padding: 0 60px 20px;
  .columns {
    background: #1c1f29;
    display: flex;
    justify-content: space-around;
    align-self: center;
    text-align: center;
    > div {
      flex: 1;
      line-height: 40px;
    }
  }
  @for $i from 1 through $Columns {
    $boolean: $i % 2 == 0;
    .noBorder#{$i} {
      border-top: 1px solid rgba(255, 255, 255, 0.16);
      position: relative;
      @if $boolean {
        background: #1c1f29;
      } @else {
        background: #1d2331;
      }
    }

    .noBorder#{$i} + .noBorder#{$i} {
      border-top: none;
    }
  }
  .rankStyle {
    width: 10px !important;
    position: absolute;
    left: 90px;
    top: 50%;
    transform: translateY(-50%);
  }
  .datas {
    display: flex;
    flex-direction: column;
    align-self: center;
    text-align: center;
    > div {
      @include nthStyle;
      flex-direction: column;
      padding: 6px 0;
      > div {
        @include nthStyle;
        .name {
          > span {
            display: inline-block;
            width: 178px;
            height: 16px;
            border-radius: 2px;
            color: #fff;
            line-height: 16px;
          }
        }
        &:nth-of-type(2) {
          .name {
            > span {
              background: #ccc325;
            }
          }
        }
        &:nth-of-type(3) {
          .name {
            > span {
              background: #bc593e;
            }
          }
        }
        &:nth-of-type(4) {
          .name {
            > span {
              background: #366291;
            }
          }
        }
        &:nth-of-type(5) {
          .name {
            > span {
              background: #05aba3;
            }
          }
        }
        > div {
          flex: 1;
          line-height: 25px;
        }
      }
    }
  }
}
</style>