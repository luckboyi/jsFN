<template>
    <div style="width:100%;max-width:1920px;margin:0 auto;" 
        v-if="bannerList.length>0">
        <div style="position:relative;"
            class="w12">
            <div class="swiper-container">
                <div class="swiper-wrapper" >
                    <div class="swiper-slide"
                        v-for="(item,index) in bannerList"
                        @click.stop="openUrl(item.linkUrl)"
                        :key="index">
                        <a href="javascript:;"
                            class="zoomImage"
                            style="padding-bottom:37.89%;"
                            :style="{'background-image':'url('+item.imgUrl+')'}">
                        </a>
                    </div>
                </div>
                <div class="pagination"></div>
            </div>
            <div class="swiper-container11"
                style="display:none;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"
                        v-for="(item,index) in bannerList"
                        @click.stop="openUrl(item.linkUrl)"
                        :key="index">
                        <a :href="item.linkUrl"
                            class="zoomImage"
                            style="padding-bottom:18.75%;"
                            :style="{'background-image':'url('+item.imgUrl+')'}">
                        </a>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="banner-pagination"></div>
                <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div> -->
                <!-- 如果需要滚动条 -->
                <!-- <div class="swiper-scrollbar"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
let Swiper
import 'swiper/dist/idangerous.swiper.css';
import { getbannerListData } from '@/request/other'
if (process.client) {
    Swiper = require('swiper/dist/idangerous.swiper.js')
}


export default {
    data() {
        return {
            bannerList: []
        }
    },
    methods: {
        openUrl(url){
            window.$nuxt.$store.dispatch("toClient/sendMsg", {
                type: 6,
                data: {
                msg: "打开外链",
                src: url
                }
            });
        },
        async init() {
            let res = await getbannerListData()
            this.bannerList = res
            this.$nextTick(() => {
                if (this.bannerList.length == 1) {
                    new Swiper('.swiper-container', {
                        paginationClickable: true,
                        preventClicks : false,//默认true
                    })
                } else {
                    new Swiper('.swiper-container', {
                        autoplay: false,
                        loop: false,
                        pagination: '.banner-pagination',
                        paginationClickable: true,
                        slidesPerView: 3,
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss">
.swiper-container {
    width: 100%;
    color: #fff;
    text-align: center;
    height: 132px!important;
}
.swiper-slide{
    a{
        width: 390px;
        height: 144px;
        // width: 96%;
    }
}
.pagination {
    position: absolute;
    z-index: 20;
    left: 10px;
    bottom: 10px;
}
.swiper-pagination-switch {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #222;
    margin-right: 5px;
    opacity: 0.8;
    border: 1px solid #fff;
    cursor: pointer;
}
.swiper-visible-switch {
    background: #aaa;
}
.swiper-active-switch {
    background: #fff;
}
</style>


