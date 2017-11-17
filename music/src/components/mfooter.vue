<template>
	<div class="footer_center clear">
		<div class="lf server_li">
			<ul class="clear">
				<li v-for='i in serverData'><a href="#">{{i}}</a><span>|</span></li>
			</ul>
			<p>小花公司版权所有©1993-2017   深圳小花科技有限公司运营：粤网文[2015] 0456-123号</p>
		</div>
		<div class="rg p_li">
			<ul class="clear">
				<li v-for='i in 4'><a href="#"><img :src="'static/img/foot_enter_0' + i + '.png'"></a></li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			serverData: ['关于音乐', '客户服务', '服务条款', '意见反馈']
		}
	},
	name: 'footer'
}
</script>
<style scoped>
.footer_center {
	height: 140px;
	max-width: 1000px;
	margin: auto;
}
.server_li {
	padding-top: 35px;
}
.server_li>ul>li {
	line-height: 24px;
	float: left;
	padding-right: 10px;
}
.server_li>ul>li>a {
	padding-right: 10px;
	color: #999;
	line-height: 24px;
}
.server_li>ul>li>span {
	color: #999;
	font-size: 12px;
}
.server_li>p {
	color: #666;
	line-height: 24px;
}
.p_li>ul {
	margin-top: 21px;
}
.p_li>ul>li {
	float: left;
	margin-left: 30px;
}
@media screen and (max-width: 770px) {
	.p_li {display: none;}
	.server_li{margin-left: 120px;}
	.server_li>ul>li:nth-child(1) {margin-left: 100px;}
}
@media screen and (max-width: 415px) {
	.footer_center{display: none;}
}
@media screen and (max-width: 770px) {
	.footer_center{height: 100px;}
}
</style>