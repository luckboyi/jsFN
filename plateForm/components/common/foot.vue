<template>
    <div class="footCon">
        <div class="nav tac">
            <ul class="clearfix f14">
                <nuxt-link  to="/faq" class="fl hide">FAQ</nuxt-link>
                <nuxt-link  to="/aboutUs" class="fl">关于我们</nuxt-link>
                <nuxt-link  to="/contactUs" class="fl">联系我们</nuxt-link>
            </ul>
        </div>
        <div class="content tac">
            <ul class="clearfix">
                <li class="fl">Copyright © 2018 www.17dfgame.com All Rights Reserved 浙江网云软件有限公司 版权所有</li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .footCon{
        width: 100%;
        height: 120px;
        background:rgba(14,15,18,.8);
        margin-top: 40px;
        ul{
            display: inline-block;
            li{margin: 0 15px;}
            a{
                margin:  0 15px;
                color: #fff;
                &:hover{
                    color:#34b2fa;
                }
            }
        }
        .nav{
            padding-top: 40px;
        }
    }
    .content{
        color:rgba(255, 255, 255, 0.5) ;
    }
</style>
