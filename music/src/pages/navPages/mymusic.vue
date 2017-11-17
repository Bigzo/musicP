<template>
  <div id="mymusic">
  	<div v-for='music in allMusicData'>
  		<h4>{{music.num}}</h4>
  		<h4>{{music.musicName}}</h4>
  		<ul>
  			<li v-for='i in music.musicArray'>{{i.title}}</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
import async from 'async'
export default {
  name: 'mymusic',
  data() {
  	return {
  		allMusicData: [{num: 1}, {num: 2}, {num: 11}, {num: 12}]
  	}
  },
  methods: {
	getMusicianData () {
		var _this = this
		async.each(this.allMusicData, function(item, callback) {
			_this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=' + item.num + '&size=5&offset=1').then(function (response) {
				if(item.num === 1) {
					item.musicName = '新歌'
				} else if (item.num === 2) {
					item.musicName = '摇滚'
				} else if (item.num === 11) {
					item.musicName = '爵士'
				} else {
					item.musicName = '流行'
				}
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
  created() {
  	this.getMusicianData()
  	console.log(this.allMusicData)
  }
}
</script>

<style scoped>
#mymusic{
	min-height: 940px;
	margin-top: 40px;
	background: #fff url(../../../static/img/music_bg3.jpg) no-repeat center 150px;
	background-attachment: fixed;
}
</style>