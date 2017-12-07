<template>
	<div class="list_right lf">
	  <div class="music_img">
	    <img :src="nowpic" alt='没有相关图片'>
	  </div>
	  <div class="music_text">  
	    <pre v-if="typeof(nowSongContent) === 'undefined' || nowSongContent === '' ? false : true">{{nowSongContent}}</pre>
	    <pre v-else>

		    没有相关歌词

		    
	    </pre>
	  </div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	name: 'rightContent',
	data() {
		return {
			nowSongContent: ''
		}
	},
	computed: {
		...mapState(['nowSongId', 'nowpic'])
	},
	watch: {
		nowSongId: function() {
			this.getMusicWords(this.nowSongId)
		}
	},
	methods: {
		// 获取歌词
		getMusicWords() {
			this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.lry&songid=' + this.nowSongId).then((response) => {
				this.nowSongContent = response.body.lrcContent
			}).catch((response) => {
				console.log('error!')
			})
		},
	}
}
</script>
<style scoped>
/*right*/
.list_right {
  width: 25%;
  height: 100%;
}
.list_right>div.music_img {
  text-align: center;
  width: 172px;
  min-height: 172px;
  margin: auto;
}
.list_right>div.music_img>img {
  margin-top: 20px;
  width: 172px;
  border: none;
}
.list_right>div.music_text {
  text-align: center;
  width: 225px;
  margin: auto;
  line-height: 30px;
  font-size: 14px;
  height: 400px;
  overflow-y: scroll;
}
pre {
  text-align: left;
  font-size: 12px;
}

/*media*/
@media screen and (max-width: 1024px) {
  .list_right>div.music_text {font-size: 20px;}
  .list_right {display: none;}
}
@media screen and (max-width: 414px) {
  .list_right>div.music_text {font-size: 14px;}
}
</style>