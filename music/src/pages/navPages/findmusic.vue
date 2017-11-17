<template>
  <div id="find_music">
  	<div class="banner_pic">
  		<div class="banner_music_video">
  			<div class="banner_video">
  				<div class="img_bg"></div>
  				<video src="static/video/littlegirl.mp4" autoplay="autoplay"></video>
  				<div class="video_bg"></div>
  			</div>
  		</div>
  	</div>
  	<div id="findmusic">
  		<div class="music_detail_contain">
  			<div class="music_lf">
  				<div class="classify_music">
  					<router-link to='/findmusic/recommendmusic' active-class='router-link-active'>推荐音乐</router-link>
  					<router-link to='/findmusic/hotmusic'>热门音乐</router-link>
  					<router-link to='/findmusic/rankingmusic'>音乐排名</router-link>
  				</div>
  				<div class="music_context">
  					<router-view></router-view>
  				</div>
  			</div>
  			<div class="music_rg">
  				<div class="musician_item">
  					<div class="musician_item_title">
  						入驻歌手
  						<span class="rg">查看全部<i>></i></span>
  					</div>
  					<ul>
  						<li v-for='item in musicianId' class="clear">
  							<img class="lf" :src="item.mMessage.avatar_s500">
  							<div class="musicianMsg rg">
  								<span>{{item.mMessage.birth}}</span><br>
  								<span class="artist_name">{{item.mMessage.intro}}</span>
  							</div>
  						</li>
  					</ul>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import async from 'async'
export default {
  name: 'findmusic',
  data() {
  	return {
  		musicianData: [],
  		musicianId: []
  	}
  },
  methods: {
  		getMusicianData (i) {
  			async.parallel([
		  		(cb) => {
  			  		this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=' + i + '&size=5&offset=1').then(function (response) {
  				      this.musicianData = response.body.song_list
  				      cb()
  				    }, function (response) {
  				      cb(response)
  				    })
		  		}
  			], (err) => {
  				if(err) {
  					cb(err)
  				}else {
  					async.each(this.musicianData, (item, callback) => {
  						this.musicianId.push({mId: item.ting_uid, mMessage: {}})
  					}, (err) => {
  						if(err) {
  							console.log('error!')
  						} else {
  							console.log('success!')
  						}
  					})
  					this.getMusicianMessage()
  				}
  			})
  		},
  		getMusicianMessage () {
  			async.each(this.musicianId, (item, callback) => {
		  		this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.artist.getInfo&tinguid=' + item.mId).then(function (response) {
			     	item.mMessage = response.body
			    }, function (response) {
			      callback(response)
			    })
  			}, (err) => {
  				if(err) {
  					console.log('error!')
  				} else {
  					console.log('success!')
  				}
  			})
  		}
  },
  created() {
  	this.getMusicianData(25)
  	console.log(this.musicianId)
  }
}
</script>

<style scoped>
#find_music{
	margin-top: 40px;
}
.banner_pic {
	background: rgba(50, 32, 30,0.4);
}
.banner_music_video{
	max-width: 1000px;
	margin: 0px auto;
}
#findmusic {
	max-width: 1000px;
	margin: 0px auto;
}
@media screen and (max-width: 415px) {
	#find_music{margin-top: 0px;}
}
.banner_video {
	position: relative;
	font-size: 0px;
}
.banner_video>video{
	width: 100%;
}
.img_bg,.video_bg{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
}
.video_bg{
	background: rgba(255,255,255,0.3);
	width: 100%;
	height: 100%;
	z-index: 3;
}
.img_bg {
	background: url(../../../static/img/littlegirl.png) no-repeat left top;
	background-size: 100%;
	z-index: -1;
}
@media screen and (max-width: 415px) {
	.banner_video{height: 211px;}
	.img_bg{z-index: 1;}
	.banner_video>video{display: none;}
}
@media screen and (max-width: 415px) {
	.banner_video{height: 180px;}
}
.music_detail_contain{
	border: 1px solid #d3d3d3;
	border-bottom: none;
	position: relative;
	background: #fff url(../../../static/img/music_bg.jpg) no-repeat center 150px;
	background-attachment: fixed;
}
.music_lf{
	width: 80%;
	padding: 20px 20px 40px;
}
.classify_music{
	height: 33px;
	line-height: 33px;
	background: #C10D0C;
}
.classify_music>a{
	padding: 8px;
	color: #ccc;
}
.classify_music>a.router-link-active {
	background: #d35352;
	color: #fff;
}
.classify_music>span,.classify_music>a{
	cursor: pointer;
}
.music_rg{
	width: 20%;
	border-left: 1px solid #d3d3d3;
	height: 100%;
	position: absolute;
	right: 0px;
	top: 0px;
}
@media screen and (max-width: 770px) {
	.music_lf{width: 75%;}
	.music_rg{width: 25%;}
}
@media screen and (max-width: 415px) {
	.music_detail_contain{padding: 0px;}
	.music_lf{width: 100%;}
	.music_rg{display: none;}
}
.music_context {
	min-height: 420px;
}

/*入驻歌手*/
.musician_item{
	padding: 15px;
}
.musician_item_title{
	height: 33px;
	line-height: 33px;
	color: #333;
	font-size: 14px;
	border-bottom: 1px solid #ccc;
}
.musician_item_title>span,.musician_item_title>span>i{
	color: #666;
	font-size: 14px;
	cursor: pointer;
}
.musician_item>ul>li{
	overflow: hidden;
	border: 1px solid #e9e9e9;
	margin-top: 14px;
}
.musician_item>ul>li>div>span{
	font-size: 14px;
}
.musician_item>ul>li>img {
	max-width: 70px;
}
.musicianMsg {
	padding-top: 15px;
	text-align: center;
	line-height: 25px;
}
.artist_name {
	display: inline-block;
	width: 88px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>