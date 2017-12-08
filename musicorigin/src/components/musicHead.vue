<template>
	<div class="music_head" id="mhead">
	    <div class="my_music_box">
	      <div class="my_music" @click='changeLO'>
	        <img src="../../static/img/music.png">
	        <span>我的音乐</span>
	      </div>
	    </div>
	    <div class="search_music" v-clickoutside='handleClickOutside'>
	        <img src="../../static/img/search_music.png">
	        <input type="text" name="smusic" @keyup.enter='toSearchMusic' v-model='searchWord'>
	        <div class="search_result" v-if='ifresult'>
	            <div class="my_search_result">
	                <div class="result_title">列表</div>
	                <ul>
	                  <li v-for='(m, index) in listMusic'><span class="hidden-text">{{m.songname}} - {{m.artistname}}</span><img class="rt" src="../../static/img/l_b.png" @click='dbplayMusic({i: index, data: listMusic})'></li>
	                </ul>
	            </div>
	            <div class="my_search_music">
	                <div class="result_title">音乐库</div>
	                <ul>
	                  <li v-for='(music, index) in myListMusic'>
	                    <img class="lf" :src="music.pic_small">
	                    <div class="lf"><p>{{music.title}}</p><p>{{music.artist_name}}</p></div>
	                    <img class="rt m_img" src="../../static/img/l_b.png" @click='dbplayMusic({i: index, data: myListMusic})'>
	                  </li>
	                </ul>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
import clickoutside from '../assets/js/clickoutside'
import async from 'async'
import {mapState, mapMutations} from 'vuex'
export default {
	name: 'musichead',
	data() {
		return {
  			ifresult: false,	//显示搜索框
  			searchWord: '',		//搜索关键字
  			searchList: [],		//获取搜索数据
  			listMusic: [],		//列表数据
  			myListMusic: [],	//我的音乐数据
  			allMusicList: []	//全部的我的音乐
		}
	},
	directives: {
	  clickoutside
	},
	computed: {
		...mapState(['mySortList'])
	},
	watch: {
		searchWord: function() {
			this.toSearchMusic()
		}
	},
	methods: {
		...mapMutations(['changeNowSongId', 'changeLO', 'ifimusicFalse']),
		// 搜索
		toSearchMusic() {
			if(this.searchWord === '') {
				this.ifresult = false
			}else {
				this.ifresult = true
				this.searchMusic()
			}
		},
		// 点击搜索框之外隐藏
		handleClickOutside() {
			this.ifresult = false
			this.searchWord = ''
		},
		// 播放音乐
		dbplayMusic(id) {
			this.changeNowSongId(id)
			// 应该取消自动下一曲播放。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
		},
		// 获取数据
		searchMusic() {
			var _this = this
			_this.myListMusic = []
			_this.listMusic = []
			this.getAllMusicList()
			async.parallel([
				(cb) => {
					this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.search.catalogSug&query=' + this.searchWord).then((response) => {
						this.searchList = response.body.song
						cb()
					}).catch((response) => {
						cb(response)
					})
				}
			], (err) => {
				if(err) {
					cb(err)
				}else {
					async.each(this.searchList, (item, callback) => {
						var x = 0
						var pMu = {}
						for(var i = 0; i < this.allMusicList.length; i++){
							if(this.allMusicList[i].song_id === item.songid) {
								x = 1
								pMu = this.allMusicList[i]
							}
						}
						if(x === 1) {
							_this.myListMusic.push(pMu)
						}else {
							_this.listMusic.push(item)
						}
					}, (err) => {
						if(err) {
							console.log('error!')
						}else {
							console.log('success!')
						}
					})
				}
			})
		},
		// 整合我的音乐
		getAllMusicList() {
			this.mySortList.forEach((obj) => {
				this.allMusicList = this.allMusicList.concat(obj.dataList)
			})
		}
	}
}
</script>
<style scoped>
	.music_head {
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  -webkit-box-align: center;
	  -ms-flex-align: center;
	  align-items: center;
	  height: 7%;
	  background: rgba(204, 204, 204, 0.3);
	}
	.my_music_box {
	  height: 100%;
	  display: none;
	}
	.my_music {
	  height: 100%;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  -webkit-box-align: center;
	  -ms-flex-align: center;
	  align-items: center;
	}
	.my_music>img {
	  width: 30px;
	}
	.my_music>span {
	  font-size: 16px;
	  margin-left: 5px;
	  color: #fff;
	}
	.search_music {
	  height: 30px;
	  margin-left: 220px;
	  position: relative;
	}
	.search_music>img {
	  height: 20px;
	  position: absolute;
	  left: 10px;
	  top: 5px;
	}
	.search_music>input[type=text] {
	  height: 30px;
	  width: 215px;
	  padding-left: 35px;
	  border-radius: 15px;
	  background: rgba(0,0,0,0.15);
	}
	.search_result {
	  width: 280px;
	  background: #fff;
	  position: absolute;
	  border: 1px solid #bababa;
	  z-index: 10;
	  left: 0px;
	  top: 33px;
	  border-radius: 3px;
	}
	.result_title {
	  background: #f0f0f0;
	  color: #aaaaaa;
	  height: 30px;
	  text-indent: 20px;
	  line-height: 30px;
	}
	.my_search_result>ul {
	  padding: 10px 0px 10px 0px;
	}
	.my_search_music>ul {
	  padding: 15px 0px 25px 0px;
	}
	.my_search_result>ul>li, .my_search_music>ul>li {
	  height: 30px;
	  padding: 0px 20px 0px 20px;
	  margin-bottom: 10px;
	}
	.my_search_result>ul>li>span {
		display: inline-block;
		width: 200px;
	}
	.my_search_music>ul>li>div {
	  margin-left: 8px;
	  width: 180px;
	}
	.my_search_music>ul>li>div>p {
	  font-size: 12px;
	  line-height: 14px;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	.my_search_music>ul>li>img {
	  height: 30px;
	}
	.my_search_result>ul>li>img, .my_search_music>ul>li>img.m_img {
	  height: 20px;
	  margin-top: 5px;
	  cursor: pointer;
	}
	@media screen and (max-width: 1024px) {
	  .search_result {top: 33px;}
	  .search_music {height: 40px;}
	  .search_music>img {height: 30px;}
	  .search_music>input[type=text] {height: 40px;width: 300px;border-radius: 20px;padding-left: 45px;font-size: 20px;}
	}
	@media screen and (max-width: 414px) {
	  .search_music {height: 30px;}
	  .search_music>img {height: 20px;}
	  .search_music>input[type=text] {height: 30px;width: 200px;border-radius: 20px;padding-left: 35px;font-size: 14px;}
	  .search_music {margin-left: 50px;}
	  .my_music_box {display: block;margin-left: 220px;}
	}
	@media screen and (max-width: 360px) {
	  .search_music {height: 26px;}
	  .search_music>img {height: 18px;}
	  .search_music>input[type=text] {height: 26px;width: 180px;border-radius: 20px;padding-left: 35px;font-size: 14px;}
	  .search_music {margin-left: 20px;}
	  .my_music_box {display: block;margin-left: 220px;}
	  .my_music>img {
	    width: 23px;
	  }
	  .my_music>span {
	    font-size: 14px;
	  }
	}
</style>