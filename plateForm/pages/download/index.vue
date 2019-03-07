<template>
    <div class="downloadCenter">
        <div class="clearfix w12 f12">
            <div class="fl">
                <div class="imgCon">
                    <img src="../../assets/img/background/down.png" alt="">
                </div>
            </div>
            <div class="fr plateformVison ">
                <h2 class="name">巅峰电竞 <b class="f12 ">V1.1</b></h2>
                <a href="http://yzhloss.oss-cn-hangzhou.aliyuncs.com/17dfgame/client/BattleClientSetup.exe"  class="btn tac f22 cp">
                    点击下载
                </a>
                <p class="f14">
                    运行环境：Windows7、Windows10
                </p>
                <p class="f14">最新版本：1.0.0</p>
                <p class="f14">文件大小：3.5MB</p>
                <p class="f14">更新时间：2018-12-06</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.downloadCenter{
}
    .plateformVison{
        width: 320px;
        .name{
            font-size: 48px;
            color:rgba(207,207,207,1);
            font-weight: 400;
            border-radius: 2px;
            margin: 56px 0 60px 0;
            b{
                padding:6px 8px;
                background:  #303A51;
                vertical-align:text-top;
            }
        }
        .btn{
            width: 270px;
            line-height: 66px;
            background:rgba(25,28,33,.65);
            border-radius:2px;
            border:1px solid rgba(255,156,0,1);
            color: #EF901F;
            margin-bottom: 30px;
            &:hover{
                background:rgba(0,0,0,.3);
            }
            &:active{
                background:rgba(0,0,0,.7);

            }
        }
        p{
            color:rgba(255,255,255,.5);
            margin-top: 10px;
        }
    }
    .imgCon{
        width: 828px;
        height: 688px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .txtCon{
        margin-left: -15px;
        li{
            width: 256px;
            height: 200px;
            line-height: 200px;
            background: #222630;
            margin: 10px 15px;
        }
    }
</style>
