<template>
  <div id="recommendMusic">
  	 <div class="new_music" v-for='music in allMusicData'>
  	 	<div class="music_title">{{music.musicName}}<span class="rg"><router-link to='/detail'>更多</router-link><i></i></span></div>
  	 	<ul class="clear">
  	 		<li class="lf" v-for='i in music.musicArray'><img :src='i.pic_big'><br><span>{{i.title}}</span></li>
  	 	</ul>
  	 </div>
  </div>
</template>

<script>
import async from 'async'
export default {
  name: 'recommendMusic',
  data() {
  	return {
  		allMusicData: [{num: 1, musicName: '新歌'}, {num: 2, musicName: '摇滚'}, {num: 11, musicName: '爵士'}, {num: 12, musicName: '流行'}]
  	}
  },
  methods: {
  	getMusicianData () {
  		var _this = this
  		async.each(this.allMusicData, function(item, callback) {
  			_this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=' + item.num + '&size=8&offset=1').then(function (response) {
  				_this.$set(item, 'musicArray', response.body.song_list)
  	        	callback();
  	    	}, function (response) {
  	      		callback(response)
  	    	})
  		}, function(err) {
  			if(err) {
  				console.log('error!')
  			}else{
  				console.log('success!')
  			}
  		})
  	}
  },
  mounted() {
  	this.getMusicianData()
  }
}
</script>

<style scoped>
.new_music>ul>li {
	width: 25%;
	text-align: center;
	margin-top: 10px;
}
@media screen and (max-width: 770px) {
 .new_music>ul>li {width: 33.333%;}
}
.new_music>ul>li>img {
	max-width: 150px;
}
.new_music>ul>li>span {
	display: inline-block;
	width: 97%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	background: rgba(255, 255, 255, 0.7);
}
@media screen and (max-width: 415px) {
 .new_music>ul>li>img {width: 80px;}
 .new_music>ul>li>span {font-size: 12px;}
}
.music_title {
	height: 33px;
	line-height: 33px;
	background: url(../../../static/img/bg.png) no-repeat;
	background-position: -228px -153px;
	padding-left: 34px;
	padding-right: 10px;
	border-bottom: 2px solid #C10D0C;
}
.music_title>span>i {
	height: 13px;
	width: 13px;
	display: inline-block;
	background: url(../../../static/img/bg.png) no-repeat;
	background-position: 0px -240px;
}
</style>