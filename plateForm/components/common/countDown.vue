<template>
    <div>
        <div v-show="countTime!=0">
            <span v-text="countTime"></span>
            <span>秒</span>
        </div>
        <div v-show="countTime==0">
            <span v-text="content"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        time: Number,
        content:String
    },
    data() {
        return {
            countTime: 0,
            activeState:0
        }
    },
    methods: {
        start() {
            if (this.countTime == 0) {
                this.activeState=1
                this.countTime = this.time
                this.countDown()
            }
        },
        isActive(){ //当前按钮是否处于倒计时激活中状态
            if(this.activeState){
                return true
            }else{
                return false
            }
        },
        countDown() {
            setTimeout(() => {
                if (this.countTime != 0) {
                    this.countTime--
                    this.countDown()
                }else{
                    this.activeState=0
                }
            }, 1000)
        },
        reset(){
            this.countTime = 0
        }
    }
}
</script>

<style lang="scss" scoped>
</style>


