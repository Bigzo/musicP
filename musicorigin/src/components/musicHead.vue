<template>
	<div class="music_head" id="mhead">
	    <div class="my_music_box">
	      <div class="my_music" @click='changeLeftOverflow'>
	        <img src="../../static/img/music.png">
	        <span>我的音乐</span>
	      </div>
	    </div>
	    <div class="search_music" v-clickoutside='handleClickOutside'>
	        <img src="../../static/img/search_music.png">
	        <input type="text" name="smusic" @keyup.enter='toSearchMusic' v-model='searchWord' v-on:input='changeSearchWord'>
	        <div class="search_result" v-if='ifresult'>
	            <div class="my_search_result">
	                <div class="result_title">列表</div>
	                <p v-if="(listMusic.length < 0 || listMusic.length === 0) ? true : false">未搜索到歌曲</p>
	                <ul v-else>
	                  <li v-for='(m, index) in listMusic'><span class="hidden-text">{{m.title}} - {{m.author}}</span><img class="rt" src="../../static/img/l_b.png" @click='dbplayMusic(m)'></li>
	                </ul>
	            </div>
	            <div class="my_search_music">
	                <div class="result_title">音乐库</div>
	                <p v-if="(myListMusic.length < 0 || myListMusic.length === 0) ? true : false">未搜索到歌曲</p>
	                <ul>
	                  <li v-for='(music, index) in myListMusic'>
	                    <img class="lf" :src="music.pic_small">
	                    <div class="lf"><p>{{music.title}}</p><p>{{music.author}}</p></div>
	                    <img class="rt m_img" src="../../static/img/l_b.png" @click='dbplayMusic(music)'>
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
  			allMusicList: [],	//全部的我的音乐
  			iIndex: -1		//搜索添加到我音乐的index
		}
	},
	directives: {
	  clickoutside
	},
	computed: {
		...mapState(['mySortList', 'imusic', 'wordSetTimeout', 'dbType', 'nowMusicType', 'nowMyMusicIndex', 'dbIndex', 'ifmusiclist'])
	},
	methods: {
		...mapMutations(['getNowSongId', 'changeLeftOverflow', 'ifSortListFun', 'getNowMyMusicIndex', 'getNowMusicType', 'setcurrentIndex', 'setScrollT', 'getIMusic', 'changeDbTypeIndex', 'ifimusicFun', 'nowMusic']),
		changeSearchWord() {
			this.toSearchMusic()
		},
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
		dbplayMusic(m) {
			clearTimeout(this.wordSetTimeout)	//歌词定时器
			this.addMyOneList(m)
			this.clickMyMusicLi()
			this.setcurrentIndex(0)		//歌曲播放时间变为0
			this.setScrollT(0)		//歌词滚动变为0
			this.getIMusic(this.iIndex)	//当前歌曲index
			this.getNowSongId(this.iIndex)
			this.changeDbTypeIndex()		//nowMusicType nowMyMusicIndex 赋值
			if(this.dbType === this.nowMusicType && this.dbIndex === this.nowMyMusicIndex) {
				this.ifimusicFun(true)
			}else {
				this.ifimusicFun(false)
			}
			this.$emit('headPlayMusic')
		},
		// 获取数据
		searchMusic() {
			var _this = this
			_this.searchList = []
			this.getAllMusicList()
			async.parallel([
				(cb) => {
					this.$http.get('https://api.mling.cc/searchmusic?query=' + this.searchWord).then((response) => {
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
					_this.myListMusic = []
					_this.listMusic = []
					async.each(this.searchList, (item, callback) => {
						// console.log(item)
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
							this.$http.get('https://api.mling.cc/onemusic?songid=' + item.songid).then((response) => {
								_this.listMusic.push(response.body.songinfo)
							}).catch((response) => {
								console.log(response)
							})
						}
					}, (err) => {
						if(err) {
							console.log('error!')
						}else {
							console.log('success!')
						}
					})
					// console.log(this.listMusic)
				}
			})
		},
		// 整合我的音乐
		getAllMusicList() {
			this.mySortList.forEach((obj) => {
				this.allMusicList = this.allMusicList.concat(obj.dataList)
			})
		},
		// 添加到我的音乐
		addMyOneList(item) {
			var x = false
			this.mySortList[1].dataList.forEach((music, index) => {
				if(item.song_id === music.song_id) {
					x = true
					this.iIndex = index
				}
			})
			if(x === true) {
			}else {
				if(this.ifmusiclist === true || this.nowMyMusicIndex !== 1 ) {
					this.iIndex = this.mySortList[1].dataList.length
				}else {
					this.iIndex = this.imusic + 1
				}
				this.mySortList[1].dataList.splice(this.iIndex, 0, item)
			}
		},
		// 跳转到我的音乐
		clickMyMusicLi() {
			this.getNowMyMusicIndex(1)
			this.getNowMusicType(0)
			this.ifSortListFun(false)
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
	.my_search_result>p,.my_search_music>p {
		text-align: center;
		color: #999;
		font-size: 12px;
		line-height: 26px;
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
	  margin-top: 0px;
	  cursor: pointer;
	}
	@media screen and (max-width: 1024px) {
	  .search_result {top: 44px;left: 7px;}
	  .search_music {height: 40px;}
	  .search_music>img {height: 30px;}
	  .search_music>input[type=text] {height: 40px;width: 300px;border-radius: 20px;padding-left: 45px;font-size: 20px;}
	}
	@media screen and (max-width: 414px) {
	  .search_result {left: -100px;}
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