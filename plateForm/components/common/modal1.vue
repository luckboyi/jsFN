<template>
	<div class="modal modal1" :class="{'modal-show':show}">
		<div class="box">
			<slot></slot>
		</div>
	</div>
</template>
<script>
// 一级模态窗
export default {
    name:'modal1',
    props:{
        show:Boolean
    },
    data(){
        return {
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


