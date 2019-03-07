<template>
    <div class="w12">
        <div class="box content-bg"
            style="margin-top:45px;padding-top:70px;padding-bottom:70px;">
            <img src="~assets/img/icon/404.png"
                style="margin:auto;display:block;" />
            <h2 v-if="error.statusCode === 404">404:页面出错啦</h2>
            <p>
                <span v-text="time"></span>秒后自动跳转页面...</p>
            <p>
                <nuxt-link :to="$PAGE_API.index">前往首页</nuxt-link>
            </p>
        </div>
    </div>

</template>

<script>
export default {
    props: ['error'],
    head() {
        return {
            title: `${this.$PROJECT_INFO.name}(${this.error.statusCode})`,
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
                }
            ]
        }
    },
    mounted() {
        this.time = 5
        this.countDown()
    },
    data() {
        return {
            time: 5
        }
    },
    methods: {
        countDown() {
            setTimeout(() => {
                if (this.time == 0) {
                    this.$router.push(this.$PAGE_API.index)
                } else {
                    this.time--
                    this.countDown()
                }
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
h2 {
    font-size: 36px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    padding-bottom: 10px;
    padding-top: 20px;
}
p {
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    margin-bottom: 60px;
    a {
        font-size: 14px;
        text-decoration: underline;
        color: rgba(184, 184, 184, 1);
    }
}
</style>
