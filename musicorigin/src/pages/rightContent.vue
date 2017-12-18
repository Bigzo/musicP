<template>
	<div class="list_right lf">
	  <div class="music_img">
	    <img :src="nowpic" alt='没有相关图片'>
	  </div>
	  <div class="music_text" id="box">  
	    <div class="music_word" v-if="wordHtml.length === 0 ? false : true">
	    	<p v-for='(word, index) in wordHtml' :class="[ (index === currentIndex) ? 'activep' : '']" :id='word.time'>{{word.text}}</p>
	    </div>
	    <div v-else>
		    没有相关歌词    
	    </div>
	  </div>
	</div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
	name: 'rightContent',
	data() {
		return {
			wordHtml: [],
			timeArray: []
		}
	},
	computed: {
		...mapState(['nowSongId', 'nowpic', 'currentTime', 'wordSetTimeout', 'scrollT', 'currentIndex'])
	},
	watch: {
		nowSongId: function() {
			this.getMusicWords()
		},
		currentTime: function() {
			for(var i = 0; i < this.timeArray.length; i++) {
				if(this.currentTime === this.timeArray[i]) {
					clearTimeout(this.wordSetTimeout)
					this.setcurrentIndex(i)
					if(i > 4) {
						this.setWordSetTimeout(this.timeArray[i+1])
						document.getElementById('box').scrollTop = this.scrollT
					}else {
						document.getElementById('box').scrollTop = 0
					}
				}
			}
		}
	},
	methods: {
		...mapMutations(['haveTotalWord', 'setWordSetTimeout', 'setcurrentIndex', 'setScrollT']),
		// 获取歌词
		getMusicWords() {
			this.wordHtml = []
			this.timeArray = []
			this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.lry&songid=' + this.nowSongId).then((response) => {
				var wordArray = response.body.lrcContent.split('[')
				for(var i = 0; i < wordArray.length; i++) {
					if(wordArray[i].split(']')[1] !== '' && wordArray[i].split(']')[1] !== undefined) {
						var timearr = wordArray[i].split(']')[0].split('.')
						var m = timearr[0].split(":")
						var times = m[0] * 60 + m[1] * 1
						var texts = this.transferString(wordArray[i].split(']')[1])
						if(texts !== "") {
							this.wordHtml.push({time: times, text: texts})
							this.timeArray.push(times)
						}
					}
				}
				this.haveTotalWord(this.wordHtml.length)
			}).catch((response) => {
				console.log('error!')
			})
		},
		// 去掉回车键
		transferString(content) {    
		    var string = content;    
		    try{    
		        string=string.replace(/\r\n/g,"")    
		        string=string.replace(/\n/g,"");    
		    }catch(e) {    
		        alert(e.message);    
		    }    
		    return string;    
		}  
	},
	created() {
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
  width: 280px;
  margin: auto;
  line-height: 30px;
  font-size: 14px;
  height: 400px;
  overflow-y: scroll;
}
.music_text>div.music_word {
  font-size: 13px;
  line-height: 30px;
}
.music_text>div.music_word>p.activep {
	color: orange;
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