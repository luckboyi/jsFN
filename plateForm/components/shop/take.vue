<template>
  <div class="shop-take pf pr" v-if="isShow" id="shopTake" ref="shopTake">
    <div class="inMaskCon pa center pr">
      <div class="closeIcon pa f18 cp" @click="closeFn">×</div>
      <h4 class="tac f16">{{params.title}}</h4>
      <div v-if="params.type==1" class="content">
        <div class="shop-describe">
          <p>您要提取的物品为:</p>
          <div class="describe-wrap">
            <label>商品名称:</label>
            <span>{{params.dataList.shopName}}</span>
          </div>
          <br>
          <div class="describe-wrap">
            <label>商品价值:</label>
            <span>{{params.dataList.shopPrice}}</span>
          </div>
          <div class="describe-wrap">
            <label>商品数量:</label>
            <span>{{params.dataList.shopNumber}}</span>
          </div>
        </div>
        <div class="shop-form">
          <p>请填写收货信息:</p>
          <div class="form-wrap">
            <label for>收货人姓名:</label>
            <input type="text" placeholder="长度不超过11个字符">
          </div>
          <div class="form-wrap">
            <label for>联系方式:</label>
            <input type="text" placeholder="请输入您的手机号码">
          </div>
          <div class="form-wrap">
            <label for>地址信息:</label>
            <div class="selectWrap">
              <select @change="getSelectList('A',$event)">
                <option
                  v-for="(item,index) in provinceList"
                  :value="item.cityId"
                  :key="index"
                >{{item.cityName}}</option>
              </select>
              <select @change="getSelectList('B',$event)">
                <option
                  v-for="(item,index) in cityList"
                  :value="item.cityId"
                  :key="index"
                >{{item.cityName}}</option>
              </select>
              <select @change="getSelectList('C',$event)">
                <option
                  v-for="(item,index) in areaList"
                  :value="item.cityId"
                  :key="index"
                >{{item.cityName}}</option>
              </select>
            </div>
          </div>
          <div class="form-wrap">
            <label for style="vertical-align: top;">详细地址:</label>
            <textarea
              v-model="textHtml"
              :class="{'color-gray':colorGray}"
              @focus="clearText"
              @blur="addText"
            ></textarea>
          </div>
        </div>
      </div>
      <div v-show="params.type==2" class="content">
        <p class="two-describe">
          请确认您要兑换的商品,
          <span>确认后将发送相关cdkey到您登录的手机，请注意查收短信。</span>
          如有延迟，请等待…
        </p>
        <div class="shop-describe">
          <div class="type-wrap">
            <p>您要提取的物品为:</p>
            <div class="describe-wrap">
              <label>商品名称:</label>
              <span>{{params.dataList.shopName}}</span>
            </div>
            <br>
            <div class="describe-wrap">
              <label>商品价值:</label>
              <span>{{params.dataList.shopPrice}}</span>
            </div>
            <div class="describe-wrap">
              <label>商品数量:</label>
              <span>{{params.dataList.shopNumber}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="params.type==3" class="content">
        <span class="two-describe"></span>
        <div class="shop-describe">
          <div class="type-wrap">
            <p>您要提取的物品为:</p>
            <div class="describe-wrap">
              <label>商品名称:</label>
              <span>{{params.dataList.shopName}}</span>
            </div>
            <br>
            <div class="describe-wrap">
              <label>商品价值:</label>
              <span>{{params.dataList.shopPrice}}</span>
            </div>
            <div class="describe-wrap">
              <label>商品数量:</label>
              <span>{{params.dataList.shopNumber}}</span>
            </div>
          </div>
        </div>
        <div class="form-wrap" style="margin:20px 0 0 0;">
          <label for>QQ号码:</label>
          <input type="text" placeholder="请输入您要提取到账的QQ号码">
        </div>
      </div>
      <div v-if="params.type==4" class="content type-4 tac">
        <p>您目前要兑换的商品信息如下:</p>
        <div class="type4-content">
          <div>
            <label for>[商品名]</label>
            <span>{{params.dataList.shopName}}</span>
          </div>
          <div class="v-middle">
            <label for>[消耗]</label>
            <span>{{params.dataList.shopPrice}}</span>
            <i class="goldIcon"></i>
          </div>
        </div>
      </div>
      <div v-if="params.type==5" class="content type-4 tac">
        <p>您要绑定的信息如下:</p>
        <div class="type4-content">
          <div>
            <label for>[游戏名]</label>
            <span>{{params.dataList.shopGameName}}</span>
          </div>
          <div class="mt-20">
            <label for>[区服]</label>
            <span>{{params.dataList.shopGameArea}}</span>
          </div>
          <div class="mt-20">
            <label for>[角色名]</label>
            <span>{{params.dataList.shopGameUserName}}</span>
          </div>
        </div>
      </div>
      <div v-if="params.type==6" class="content type-4 type-6 tac">
        <p class="two-describe">
          请
          <span>确认</span>
          您输入的角色名准确
          错误的角色名将无法参加比赛获得收益！
        </p>
        <div class="type4-content">
          <div>
            <select name id>
              <option
                v-for="(item,index) in params.dataList.shopGameAreaSelect"
                :key="index"
                :value="item.id"
              >{{item.name}}</option>
            </select>
          </div>
          <div class="mt-20">
            <input type="text" placeholder="请输入您的手机号码">
          </div>
        </div>
      </div>
      <div v-if="params.type==7" class="content type-4 type-7 tac">
        <h2>商品兑换二维码</h2>
        <div class="type7-content">
          <img :src="params.dataList.imgUrl" alt>
        </div>
        <div class="type7-text">5分钟内有效
          <br>请至本网吧收银台出示二维码
        </div>
        <div class="rangeBtn cp" @click="download">穿越至手机打开</div>
      </div>
      <div class="btnCon tac">
        <ul class="clearfix f12">
          <li
            class="fl rangeBtn cp"
            v-show="params.firstBtnTxt !='' && params.firstBtnTxt !=undefined"
            @click="firstBtnFn"
          >{{params.firstBtnTxt}}</li>
          <li
            class="fl cancelBtn cp"
            v-show="params.secBtnTxt !='' && params.secBtnTxt !=undefined"
            @click="secBtnFn"
          >{{params.secBtnTxt}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 示例
// this.$shopTakeCom({
//   type: 6,
//   title: "商品提取",
//   dataList: {
//     shopName: "aadwwda",
//     shopPrice: "qwdwqdqwdwqd",
//     shopNumber: 111,
//     shopGameName: "hahaha",
//     shopGameArea: "hahaha",
//     shopGameUserName: "www",
//     shopGameAreaSelect: [
//       {
//         name: "aa",
//         id: 111
//       },
//       {
//         name: "cc",
//         id: 222
//       }
//     ]
//   },
//   firstBtnTxt: "确定",
//   secBtnTxt: "取消"
// });
export default {
  data() {
    return {
      isShow: true,
      params: {
        title: "",
        dataList: {},
        type: 0,
        firstBtnTxt: "",
        secBtnTxt: "",
        firstBtnFn: "",
        secBtnFn: ""
      },
      // 省市区三级下拉
      provinceList: [], //省级数据
      cityList: [
        //市区级数据
        {
          cityId: 0,
          cityName: "请选择"
        }
      ],
      areaList: [
        //县区级数据
        {
          cityId: 0,
          cityName: "请选择"
        }
      ],
      textHtml: "请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息",
      colorGray: true
    };
  },
  methods: {
    clearText() {
      this.textHtml = "";
      this.colorGray = false;
    },
    addText() {
      if (this.textHtml == "") {
        this.colorGray = true;
        this.textHtml =
          "请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息";
      }
    },
    getSelectList: function getSelectList(grep, ele) {
      var self = this;
      var parame = {
        grep: grep
      };
      if (ele) {
        parame.id = ele.target.value;
      }
    },
    firstBtnFn() {
      this.isShow = false;
      if (typeof this.params.firstBtnFn == "function") {
        this.params.firstBtnFn();
      }
    },
    secBtnFn() {
      this.isShow = false;
      if (typeof this.params.secBtnFn == "function") {
        this.params.secBtnFn();
      }
    },
    closeFn() {
      this.isShow = false;
    },
    download() {
      alert("/download");
    }
  }
};
</script>

<style scoped lang="scss">
$size-14: 14px;
$color-868: #868686;
@mixin wrapLabel {
  color: $color-868;
  font-size: $size-14;
  margin-top: 15px;
  margin-bottom: 19px;
}
.mt-20 {
  margin-top: 20px;
}
.shop-take {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 99999;
  .inMaskCon {
    width: 430px;
    background: rgba(19, 23, 29, 0.95);
    border: 1px solid rgba(54, 61, 75, 0.95);
    border-radius: 4px;
    h4 {
      line-height: 40px;
      height: 40px;
      background: linear-gradient(
        0deg,
        rgba(42, 51, 64, 0.4),
        rgba(16, 21, 32, 1)
      );
      border-radius: 4px 4px 0px 0px;
    }
    .content {
      padding: 0 20px 15px;
    }
    .shop-describe {
      border-bottom: 1px solid #000;
      box-shadow: 0px 0.5px 0px rgba(255, 255, 255, 0.49);
      > p {
        @include wrapLabel;
      }
      .describe-wrap {
        min-width: 155px;
        color: #fff;
        display: inline-block;
        font-size: $size-14;
        margin-right: 15px;
        margin-bottom: $size-14;
        > label {
          color: $color-868;
        }
      }
    }
    .shop-form {
      > p {
        @include wrapLabel;
      }
    }
    .form-wrap {
      margin-bottom: 18px;
      > label {
        min-width: 80px;
        color: #b3b3b3;
        display: inline-block;
        font-size: $size-14;
        margin-right: 10px;
        text-align: right;
      }
      > input,
      textarea {
        width: 283px;
        height: 30px;
        background: #1c2026;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 8px 11px;
        resize: none;
      }
      textarea {
        height: 60px;
      }
      .selectWrap {
        display: inline-block;
      }
      .color-gray {
        color: $color-868;
      }
    }
    .two-describe {
      color: $color-868;
      font-size: $size-14;
      margin-top: 20px;
      span {
        color: #ff9900;
      }
      ~ .shop-describe {
        border: 0;
        box-shadow: none;
        .type-wrap {
          p {
            @include wrapLabel;
            margin-top: 0;
          }
          background: #1c2026;
          margin-top: 12px;
          padding: 16px 10px 0;
        }
      }
    }
    .btnCon {
      border-top: 0.5px solid rgba(255, 255, 255, 0.49);
      box-shadow: 0px -1px 0px #000;
      padding-top: 15px;
      ul {
        display: inline-block;
        li {
          line-height: 30px;
          margin: 0 10px;
          padding: 0 10px;
          min-width: 80px;
          box-sizing: border-box;
          border-radius: 4px;
          &.cancelBtn {
            border: 1px solid rgba(183, 183, 183, 1);
            color: rgba(183, 183, 183, 1);
            &:hover {
              background: rgba(183, 183, 183, 1);
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.type-4 {
  p {
    @include wrapLabel;
    font-size: 16px;
    margin-bottom: 0;
  }
  .type4-content {
    font-size: 16px;
    padding: 50px 0;
    margin: 0 auto;
    display: inline-block;
    text-align: left;
    label {
      color: #a7acb4;
      ~ span {
        color: #fff;
      }
    }
    .v-middle {
      display: inline-block;
      line-height: 16px;
      margin-top: 26px;
      vertical-align: middle;
      .goldIcon {
        background-size: contain;
      }
    }
  }
  &.type-6 {
    .two-describe {
      max-width: 300px;
      color: #a7acb4;
      font-size: 16px;
      margin: 20px auto 0;
    }
    select,
    input {
      min-width: 220px;
      min-height: 26px;
      background: #1c2026;
      border: 1px solid rgba(88, 97, 117, 1);
      color: rgba(255, 255, 255, 0.4);
      text-indent: 16px;
    }
  }
}
.type-7 {
  h2 {
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    margin: 10px 0;
  }
  .type7-content {
    img {
      width: 134px;
      height: 134px;
      margin-bottom: 20px;
    }
  }
  .type7-text {
    font-size: 14px;
    color: rgba(134, 134, 134, 1);
    margin-bottom: 30px;
  }
  .rangeBtn {
    width: 160px;
    height: 30px;
    margin: 0 auto;
    line-height: 30px;
  }
}

.closeIcon {
  color: #a9a9a9;
  right: 10px;
  top: 6px;
  &:hover {
    color: #d3d3d3;
  }
}
</style>
