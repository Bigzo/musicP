<template>
  <div class="contain">
	<div class="music_head">
		<div class="music_head_center clear">
			<div class="logo_music"><img src="../static/img/music-logo.png"></div>
		  	<div class="nav_contain">
		  		<router-link to='/findmusic' active-class='router-link-active'><span class='nav_img'><img src="../static/img/si.png"><br></span>发现音乐</router-link>
		  		<router-link to='/mymusic'><span class='nav_img'><img src="../static/img/mu.png"><br></span>我的音乐</router-link>
		  		<router-link to='/friends'><span class='nav_img'><img src="../static/img/fr.png"><br></span>朋友</router-link>
		  		<div class="m_nav_contain">
		  			<router-link to='/mall'>商城</router-link>
		  			<router-link to='/musicpeople'>音乐人</router-link>
		  			<router-link to='/loading'>下载客户端</router-link>
		  		</div>
		  	</div>
		  	<div class="login_account">
		  		<div class="search_input">
		  			<input type="text" name="music" placeholder="搜索喜欢的音乐">
		  			<img src="../static/img/search.png">
		  		</div>
		  		<div class="person_ac">
		  			<img src="../static/img/person.png">
		  		</div>
		  	</div>
		</div>
	</div>
	<div class="small_sreen">
		mark
	</div>
  	<div class="page_center">
  		<router-view></router-view>
  	</div>
  	<div class="page_footer">
  		<music-footer></music-footer>
  	</div>
  </div>
</template>

<script>
import musicFooter from './components/mfooter'
export default {
	components:{
	  musicFooter
	},
	methods: {
		document
	}
}
</script>

<style scoped>
.contain {
	width: 100%;
}
.music_head {
	width: 100%;
	background: #242424;
	position: fixed;
	left: 0px;
	z-index: 5;
}
@media screen and (min-width: 415px) {
   .music_head{top: 0px;}
}
.music_head_center{
	max-width: 1200px;
	margin: 0 auto;
	padding: 15px 90px 15px 0px;
}
.logo_music,.nav_contain {
	float: left;
	color: #fff;
}
.logo_music {
	width: 200px;
}
.login_account {
	float: right;
	margin-top: 12px;
	position: relative;
}
.search_input{
	position: relative;
	float: left;
}
.person_ac{
	float: left;
}
.person_ac{
	position: absolute;
	right: -70px;
	top: -7px;
	cursor: pointer;
}
.person_ac>img{
	height: 40px;
	
}
.search_input>img{
	height: 25px;
	position: absolute;
	right: 5px;
	top: 0px;
	cursor: pointer;
}
.search_input>input {
	height: 25px;
	width: 250px;
	border-radius: 10px;
	padding: 0px 5px 0px 5px;
}
@media screen and (max-width: 770px) {
   .search_input>input{width: 200px;}
}
.nav_contain{margin-top: 5px;}
@media screen and (max-width: 415px) {
   .logo_music,.login_account{display: none;}
   .music_head{bottom: 0px;}
   .nav_contain{width: 100%;font-size: 0px;}
}
.m_nav_contain {
	color: #fff;
	float: right;
}
@media screen and (max-width: 770px) {
   .m_nav_contain{display: none;}
}
.nav_contain>a,.m_nav_contain>a{
	display: inline-block;
	color: #fff;
	padding: 10px;
}
@media screen and (max-width: 415px) {
   .nav_contain>a{display: inline-block;width: 33.3333%;text-align: center;padding: 0px;font-size: 12px;}
   .music_head_center{padding: 0px;}
}
.nav_contain>a>span>img {
	max-width: 30px;
}
.nav_contain>a.router-link-active,.m_nav_contain>a.router-link-active {
	background: #464343;
}
.nav_img{display: none;}
@media screen and (max-width: 415px) {
   .nav_img{display: block;}
   .nav_contain{margin-top: 0px;}
}
.page_center>div {
	margin: auto;
}
.page_footer{border-top: 1px solid #ccc;}
.small_sreen{
	text-align: center;
	background: #000;
	color: #fff;
	display: none;
}
@media screen and (max-width: 415px) {
   .small_sreen{display: block;}
}
</style>
