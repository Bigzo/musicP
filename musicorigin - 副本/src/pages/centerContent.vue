<template>
	<div class="list_center lf" id="mcenter">
	  <div class="center_title lightgray">
	    <div class="title_name">歌曲<span>（{{musicDataList.length}}）</span></div>
	    <div class="title_singer">演唱者</div>
	    <div class="title_special">专辑</div>
	  </div>
	  <!-- music list -->
	  <!-- 加载动图 -->
	  <div class="load_pic" v-if='musicDataList.length === [] ? true : false'><img src="../../static/img/load.gif"></div>
	  <!-- 列表 -->
	  <ul class="center_music_list" v-else @scroll='scrollSlice($event)' ref='scrollBox'>
		    <li v-for='(music, index) in musicDataList' @dblclick='dbplayMusic(index)' :class="[(imusic === index && ifimusic === true) ? 'activeLi' :'']">
		     <label>
		       <div class="music_box lf">
		         <span class="m_check lf"><input type="checkbox" :value="music" v-model='checkList'><img src="../../static/img/choose.png"></span>
		         <span class="m_num lightgray lf">
		         	<i v-if="(imusic === index && ifimusic === true) ? false : true">{{index + 1}}</i>
		         	<i v-else><img src="../../static/img/play.gif"></i>
		         </span>
		         <span class="m_name hidden-text lf">{{music.title}}</span>
		       </div>
		       <div class="m_singer lf hidden-text">{{music.author}}</div>
		       <span class="play_btn"><img src="../../static/img/l_b.png" @click.prevent='dbplayMusic(index)'></span>
		       <div class="m_special lf">
		       	<span class="hidden-text lf"><p v-if='music.album_title'>{{music.album_title}}</p><p v-else>&nbsp;</p></span>
		       	<span class="lf contorl_img">
		       		<img src="../../static/img/l_b.png" @click.prevent='dbplayMusic(index)'>
		       		<span class="add_img" @mouseover='ifcollect = true' @mouseout='ifcollect = false'>
		       			<img src="../../static/img/l_j.png">
		       			<div class="choose_collect" v-if='ifcollect'>
		       				<ul>
		       					<li v-for='(mySortName, index) in mySortList' @click.prevent='addMyOneList(index, music)' class="hidden-text">{{mySortName.mname}}</li>
		       				</ul>
		       			</div>
		       		</span>
		       		<img src="../../static/img/l_x.png" @click.prevent='deleteMusic(index)'>
		       	</span>
		       </div>
		     </label>
		   </li>
	  </ul>
	    <!-- btn -->
	  <div class="opration_btn">
	    <div class="btn_check"><input type="checkbox" name="" v-model='allcheck'><img src="../../static/img/choose.png"></div>
	    <div class="btn_button" @click='deleteSomeMusic'><span><img src="../../static/img/btn_x.png">删除</span></div>
	    <div class="btn_button" @click='pushMymusicList'><span><img src="../../static/img/btn_j.png">添加到歌单</span></div>
	  </div>
	</div>
</template>
<script>
import async from 'async'
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
	name: 'centerConetnt',
	data() {
		return {
		  ifcollect: false,		//控制图标显示隐藏
		  allcheck: false,		//全选
		  checkList: []		//歌曲的复选框 选中列表
		}
	},
	watch: {
		allcheck: function() {
			this.allcheckFun()
		}
	},
	computed: {
		...mapState(['nowMusicType', 'mySortList', 'nowMyMusicIndex', 'imusic', 'ifimusic', 'dbType', 'dbIndex', 'wordSetTimeout', 'ifSortList', 'musicDataList'])
	},
	methods: {
		...mapMutations(['pushMymusic', 'getIMusic', 'changeDbTypeIndex', 'ifimusicFun', 'setcurrentIndex', 'setScrollT', 'changeNowSong']),
		...mapActions(['']),
		// 播放音乐
		dbplayMusic(index) {
			clearTimeout(this.wordSetTimeout)	//歌词定时器
			this.setcurrentIndex(0)		//歌曲播放时间变为0
			this.setScrollT(0)		//歌词滚动变为0
			this.getIMusic(index)	//当前歌曲index
			this.changeNowSong(index) //播放
			this.changeDbTypeIndex()		//nowMusicType nowMyMusicIndex 赋值
			if(this.dbType === this.nowMusicType && this.dbIndex === this.nowMyMusicIndex) {
				this.ifimusicFun(true)
			}else {
				this.ifimusicFun(false)
			}
		},
		// 删除音乐
		deleteMusic(index) {
			this.musicDataList.splice(index, 1)
		},
		// 多个删除
		deleteSomeMusic() {
			this.checkList.forEach((item) => {
				this.musicDataList.forEach((music, index) => {
					if(item.song_id === music.song_id) {
						this.musicDataList.splice(index, 1)
					}
				})
			})
			this.checkList = []
			this.allcheck = false
		},
		// 全选
		allcheckFun() {
			if(this.allcheck === true) {
				this.musicDataList.forEach((item) => {
					this.checkList.push(item)
				})
			}else {
				this.checkList = []
			}
		},
		// 添加到我的音乐
		pushMymusicList() {
			this.checkList.forEach((item) => {
				var x = false
				this.mySortList[1].dataList.forEach((music) => {
					if(item.song_id === music.song_id) {
						x = true
					}
				})
				if(x === true) {
				}else {
					this.pushMymusic(item)
				}
			})
			this.checkList = []
			this.allcheck = false
		},
		// 添加一首歌
		addMyOneList(i, item) {
			var x = false
			this.mySortList[i].dataList.forEach((music) => {
				if(item.song_id === music.song_id) {
					x = true
				}
			})
			if(x === true) {
			}else {
				this.ifcollect = false
				this.mySortList[i].dataList.push(item)
			}
		},
		// 滚动加载歌曲
		scrollSlice(e) {
			if(this.ifSortList === true) {
				var h = this.$refs.scrollBox.clientHeight
				var eTop = e.currentTarget.scrollTop
			}
			this.$emit('scrollSlice', {eTop: eTop, h: h})
		}
	},
	created() {
		this.allcheckFun()
	}
}
</script>
<style scoped>
	/*center*/
	.list_center {
	  width: 60%;
	  height: 100%;
	}
	.center_title {
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  -webkit-box-align: center;
	  -ms-flex-align: center;
	  align-items: center;
	  height: 7%;
	  border-bottom: 1px solid  #dadada;
	  font-size: 14px;
	}
	.title_name {
	  padding-left: 65px;
	  width: 37%;
	}
	.title_singer {
	  width: 24%;
	}
	.title_special {
	  width: 39%;
	}
	.center_music_list,.load_pic {
	  height: 83%;
	  overflow-y: scroll;
	}
	.load_pic {
		text-align: center;
	}
	.load_pic>img {margin-top: 150px;width: 80px;}
	::-webkit-scrollbar {display: none;}
	.center_music_list>li {
	  width: 100%;
	  height: 40px;
	  line-height: 40px;
	  border-bottom: 1px solid #efefef;
	}
	.center_music_list>li:last-child {
	  border: none;
	}
	.center_music_list>li.activeLi {
		background: #f0f0f0;
	}
	.center_music_list>li:hover {
	  background: #f0f0f0;
	}
	.center_music_list>li:hover .contorl_img{
	  display: block;
	}
	.contorl_img {
	  display: none;
	  font-size: 0px;
	  position: relative;
	}
	.add_img {
		display: inline-block;
	}
	.add_img>img {
		height: 18px;
		margin-left: 8px;
	}
	.choose_collect {
	  position: absolute;
	  border: 1px solid #bababa;
	  width: 70px;
	  background: #fff;
	  z-index: 5;
	  left: 10px;
	  top: 30px;
	}
	.choose_collect>ul>li {
		height: 25px;
		font-size: 14px;
		line-height: 25px;
		text-align: center;
	}
	.choose_collect>ul>li:nth-child(odd) {
		background: #f5f5f5;
	}
	.center_music_list>li>label {
	  width: 100%;
	  height: 100%;
	  display: inline-block;
	  font-size: 14px;
	  cursor: pointer;
	}
	.music_box {
	  width: 37%;
	}
	.m_singer {
	  width: 24%;
	}
	.m_special {
	  width: 39%;
	}
	.m_special>span:nth-child(1) { 
	  width: 70%;
	}
	.m_special>span:nth-child(2) {
	  width: 30%;
	}
	.m_special>span>img {
	  height: 18px;
	  margin-top: 10px;
	  margin-left: 8px;
	}
	.play_btn {
		display: none;
	}
	.play_btn>img {
		margin-top: 7px;
		height: 26px;
	}
	.music_box>span.m_check,.opration_btn>div.btn_check {
	  border: 1px solid #bababa;
	  height: 15px;
	  width: 15px;
	  border-radius: 3px;
	  position: relative;
	}
	.music_box>span.m_check {
	  margin-left: 8px;
	  margin-top: 13px;
	}
	.music_box>span>input[type=checkbox],.opration_btn>div.btn_check>input[type=checkbox] {
	  position: absolute;
	  left: 0px;
	  top: 0px;
	  height: 100%;
	  width: 100%;
	  z-index: 2;
	  cursor: pointer;
	  opacity: 0;
	  filter:alpha(opacity=0);
	}
	.music_box>span>input[type=checkbox]:checked +img,.opration_btn>div.btn_check>input[type=checkbox]:checked +img {
	  display: block;
	}
	.music_box>span.m_check>img,.opration_btn>div.btn_check>img {
	  position: absolute;
	  width: 18px;
	  left: 0px;
	  top: -3px;
	  display: none;
	}
	.music_box>.m_num {
	  width: 40px;
	  text-align: center;
	}
	.music_box>.m_num>i {
		font-style: normal;
	}
	.music_box>.m_name {
	  width: 175px;
	}
	.opration_btn {
	  border-top: 1px solid #d9d9d9;
	  height: 10%;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  -webkit-box-align: center;
	  -ms-flex-align: center;
	  align-items: center;
	}
	.opration_btn>div {
	  cursor: pointer;
	  margin-left: 20px;
	}
	.opration_btn>div.btn_button {
	  margin-left: 10px;
	}
	.opration_btn>div.btn_button>span {
	  padding: 5px;
	  background: #f0f0f0;
	  border-radius: 5px;
	  position: relative;
	  padding-left: 30px;
	  font-size: 14px;
	}
	.opration_btn>div.btn_button>span>img {
	  height: 18px;
	  position: absolute;
	  left: 8px;
	  top: 7px;
	}

	/*media*/
	@media screen and (max-width: 1024px) {
	  .center_title,.center_music_list>li>label {font-size: 18px;}
	  .list_center {width: 70%;}
	  .music_box>span.m_check,.opration_btn>div.btn_check {height: 20px; width: 20px;}
	  .music_box>span.m_check>img,.opration_btn>div.btn_check>img {width: 22px;}
	  .opration_btn>div.btn_button>span {font-size: 20px;padding-left: 35px;}
	  .opration_btn>div.btn_button>span>img {height: 22px;}
	  .title_name {width: 60%;}
	  .title_singer {width: 40%;}
	  .title_special {display: none;}
	  .music_box {width: 53%;}
	  .m_singer {width: 35%;}
	  .m_special {display: none;}
	  .center_music_list {font-size: 20px;}
	  .center_title {font-size: 20px;}
	  .play_btn {display: inline-block;height: 100%;}
	}
	@media screen and (max-width: 414px) {
	  .title_singer {display: none;}
	  .music_box>.m_name {width: 190px;}
	  .m_singer{display: none;}
	  .center_title,.center_music_list>li>label {font-size: 14px;}
	  .music_box>span.m_check,.opration_btn>div.btn_check {height: 15px; width: 15px;}
	  .music_box>span.m_check>img,.opration_btn>div.btn_check>img {width: 18px;}
	  .opration_btn>div.btn_button>span {font-size: 14px;padding-left: 30px;}
	  .opration_btn>div.btn_button>span>img {height: 18px;}
	  .title_name {width: 100%;}
	  .music_box {width: 85%;}
	}
</style>