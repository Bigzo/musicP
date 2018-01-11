import Vue from 'vue'
import Vuex from 'vuex'
import async from 'async'

Vue.use(Vuex)

const state = {
	nowMusicType: 1,		//当前歌曲类型
	nowMyMusicIndex: -1,	//当前我的音乐下标
	ifSortList: true,		//控制音乐分类和我的音乐 导航的样式
	musicDataList: [], 		//歌曲列表
	mySortList: [	// 我的歌曲分类列表
		{mname: '喜欢的音乐', dataList: []},
		{mname: '我的音乐', dataList: []},
		{mname: '纯音乐', dataList: []}
	],
	dbType: 1,		//当前歌曲分类赋值
	dbIndex: -1,
  	imusic: -1,	//当前歌曲index
  	ifimusic: false,	//控制音乐分类和我的音乐 正在播放歌曲的样式
	nowSongId: 566310948,	//当前歌曲id,
	currentBgPic: 'url(./static/img/default_bg.jpg)',	//当前歌曲背景图
	currentMusicPic: './static/img/default_bg.jpg',		//当前歌曲歌词图
  	musicMessage: {ssrc: 'http://zhangmenshiting.qianqian.com/data2/music/3423b48bd35de901b3512fc1f28cd2e3/567299874/567299874.mp3?xcode=c78f533f817747316b73a0f684021956', sname: 'music name', sauthor: 'music author', sduration: '0:00'},	//当前歌曲信息
  	
	mobileMarginLeft: '',		//移动端 margin-left
	mobileOverflowX: '',		//移动端 overflow-x
  	playnum: true,	//播放音乐
  	ifloop: false,	//是否循环
  	runRange: true,		//进度条开始
  	totalWord: 0,	//总共多少行歌词
  	wordSetTimeout: '',	//歌词定时器
  	currentTime: 0,	//播放时间
  	currentIndex: 0,	//播放时间下标
  	scrollT: 0,		//歌曲滚动scrollTop
}
const getters = {
	
}
const mutations = {
	// 改变音乐分类
	getNowMusicType(state, index) {
		state.nowMusicType = index
	},
	// 改变我的音乐
	getNowMyMusicIndex(state, index) {
		state.nowMyMusicIndex = index
	},
	// 控制音乐分类和我的音乐 导航的样式
	ifSortListFun(state, str) {
		state.ifSortList = str
	},
	// 建立歌曲列表
	haveMusicDataList(state, arr) {
		state.musicDataList = arr
	},
	// 添加我的音乐分类
	getMySortList(state, name) {
		state.mySortList.push({mname: name, dataList: []})
	},
	// 播放歌曲所在类别
	changeDbTypeIndex(state) {
		state.dbType = state.nowMusicType
		state.dbIndex = state.nowMyMusicIndex
	},
	// 获得当前播放歌曲的index
	getIMusic(state, i) {
		state.imusic = i
	},
	// 控制音乐分类和我的音乐 正在播放歌曲的样式
	ifimusicFun(state, str) {
		state.ifimusic = str
	},
	// 添加我的音乐
	pushMymusic(state, item) {
		state.mySortList[1].dataList.push(item)
	},
	// 更改 移动端 margin-left 移动端 overflow-x
	changeLeftOverflow(state) {
		state.mobileMarginLeft = '0px'
		state.mobileOverflowX = 'scroll'
	},
	/*swipeLeft(state) {
		var browserWidth = document.body.clientWidth;
		if(browserWidth < 415) {
			state.mobileMarginLeft = '-200px'
		}else {
			state.mobileMarginLeft = '0px'
		}
	},
	swipeRight(state) {
		state.mobileMarginLeft = '0px'
	},*/
	// 获取歌曲id
	getNowSongId(state, i) {
		state.nowSongId = i
	},
	// 改变图片
	changeCurrentBgPic(state, str) {
		state.currentBgPic = "url(" + str +")"
	},
	changeCurrentMusicPic(state, str) {
		state.currentMusicPic = str
	},
	// 获取歌曲信息
	getMusicMessage(state, obj) {
		state.musicMessage = obj
	},
	// 改变当前歌曲
	changeNowSong(state, index) {
		mutations.getIMusic(state, index)
		mutations.playnumFun(state, false)
		mutations.loopMusic(state, false)
	},
	// 播放
	playnumFun(state, str) {
		state.playnum = str
		if(str === false) {
			state.runRange = false
		}
	},
	// 是否循环
	loopMusic(state, str) {
		state.ifloop = str
	},

	// 自动下一曲
	selfNextMusic(state) {
		if(state.imusic < state.musicDataList.length - 1) {
			state.imusic = state.imusic + 1
		}else {
			state.imusic = 0
		}
	},
	// 下一曲
	nextMusic(state) {
		if(state.imusic < state.musicDataList.length - 1) {
			state.imusic = state.imusic + 1
		}else {
			state.imusic = 0
		}
	},
	// 上一曲
	prevMusic(state) {
		if(state.imusic > 0) {
			state.imusic = state.imusic - 1
		}else {
			state.imusic = 0
		}
	},
	// 获取歌词行数
	haveTotalWord(state, i) {
		state.totalWord = i
	},
	// 歌词行滚动
	setWordSetTimeout(state, t) {
		state.wordSetTimeout = setTimeout(() => {
			state.scrollT = (state.currentIndex -3) * 30
			if(state.scrollT > (state.totalWord - 6) * 30) {
				state.scrollT = (state.totalWord - 6) * 30
			}
		}, t)
	},
	// 改变当前时间
	changeCurrentTime(state, i) {
		state.currentTime = i
	},
	setcurrentIndex(state, i) {
		state.currentIndex = i
	},
	// 歌词滚动
	setScrollT(state, i) {
		state.scrollT = i
	}
}
const actions = {
	/*changeNowSong(context, index) {
		context.commit('getIMusic', index)
		context.commit('playnumFun', false)
		context.commit('loopMusic', false)
	}*/
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
