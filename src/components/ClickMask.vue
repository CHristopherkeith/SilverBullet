<!-- 目标被击中时的效果组件 -->
<template>
	<div class="clickMask" :style="{left: clickMaskStyle.left+'px', top: clickMaskStyle.top+'px', width: clickMaskStyle.width+'px', height: clickMaskStyle.height+'px'}">
	</div>
</template>
<script>
export default{
	name: 'ClickMask',
	props: ['clickMaskStyle'],
	data(){
		return {
		}
	}
}
</script>
<style scope>
	.clickMask{
        background-color: transparent;
        border-radius: 50%;
        border: 1px solid gray;
        z-index: 1;
        position: absolute;
	}
</style>