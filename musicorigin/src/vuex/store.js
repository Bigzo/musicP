import Vue from 'vue'
import Vuex from 'vuex'
import async from 'async'

Vue.use(Vuex)

const state = {
	mobileMarginLeft: '',		//移动端 margin-left
	mobileOverflowX: '',		//移动端 overflow-x
	currentBgPic: 'url(../static/img/default_bg.jpg)',	//当前歌曲背景图
	currentMusicPic: '../../static/img/default_bg.jpg',		//当前歌曲歌词图
	nowType: 1,		//当前歌曲分类
	dbType: 1,		//当前歌曲分类赋值
	nowSongId: 566310948,	//当前歌曲id,
  	imusic: -1,	//当前歌曲index
  	ifimusic: false,	//控制音乐分类和我的音乐 正在播放歌曲的样式
  	ifmusiclist: true,		//控制音乐分类和我的音乐 导航的样式
  	imusicDataList: [],	//当前列表
	mySortList: [	// 我的歌曲列表
		{mname: '喜欢的音乐', dataList: []},
		{mname: '我的音乐', dataList: []},
		{mname: '纯音乐', dataList: []}
	],
	myIndex: -1,	//当前我的音乐下标
	dbIndex: -1,	//当前我的音乐下标赋值
	nowMusicSrc: '',	//音频文件
  	playnum: true,	//播放音乐
  	ifloop: false,	//是否循环
  	musicMsg: {sname: 'music name', sauthor: 'music author', sduration: '0:00'},	//当前歌曲信息
  	runRange: true,		//进度条开始
  	totalWord: 0,	//总共多少行歌词
  	wordSetTimeout: '',	//歌词定时器
  	currentTime: 0,	//播放时间
  	currentIndex: 0,	//播放时间下标
  	scrollT: 0,		//歌曲滚动scrollTop
  	num: 20		//加载音乐20条
}
const getters = {
	
}
const mutations = {
	// 改变音乐分类
	changeNowType(state, index) {
		state.nowType = index
	},
	changeDbType(state) {
		state.dbType = state.nowType	
	},
	// 改变我的音乐
	changeMyIndex(state, index) {
		state.myIndex = index
	},
	changeDbIndex(state) {
		state.dbIndex = state.myIndex 
	},
	// 添加我的音乐分类
	addMySortList(state, name) {
		state.mySortList.push({mname: name, dataList: []})
	},
	// 添加音乐到分类
	pushMymusic(state, item) {
		state.mySortList[1].dataList.push(item)
	},
	// 控制音乐分类和我的音乐 导航的样式
	ifmusiclistFun(state, str) {
		state.ifmusiclist = str
	},
	// 更改 移动端 margin-left 移动端 overflow-x
	changeLO(state) {
		state.mobileMarginLeft = '0px'
		state.mobileOverflowX = 'scroll'
	},
	// 改变当前歌曲id
	changeNowSongId(state, item) {
		state.imusic = item.i
		state.imusicDataList = item.data
		mutations.changeNowurl(state)
		mutations.playnumFun(state, false)
		mutations.loopMusic(state, false)
	},
	// 改变背景图 音频文件 歌曲信息
	changeNowurl(state) {
		if(state.imusicDataList[state.imusic].song_id === undefined) {
			state.nowSongId = state.imusicDataList[state.imusic].songid
		}else {
			state.nowSongId = state.imusicDataList[state.imusic].song_id
		}
		Vue.http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=' + state.nowSongId).then((response) => {
			if(response.body.songinfo.pic_big === ''){
				state.currentBgPic = "url(../static/img/allpic.png)"
				state.currentMusicPic = '../../static/img/allpic.png'
			}else {
				if(response.body.songinfo.pic_huge === '') {
					state.currentBgPic = "url(" + response.body.songinfo.pic_big + ")"
					state.currentMusicPic = response.body.songinfo.pic_big
				}else {
					state.currentBgPic = "url(" + response.body.songinfo.pic_huge + ")"
					state.currentMusicPic = response.body.songinfo.pic_big
				}
			}
			state.nowMusicSrc = response.body.bitrate.show_link
			state.musicMsg = {sname: response.body.songinfo.title, sauthor: response.body.songinfo.author, sduration: response.body.bitrate.file_duration}
		}).catch((response) => {
			console.log(response)
		})
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
		if(state.imusic < state.imusicDataList.length - 1) {
			state.imusic = state.imusic + 1
		}else {
			state.imusic = 0
		}
	},
	// 下一曲
	nextMusic(state) {
		if(state.imusic < state.imusicDataList.length - 1) {
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
	// 当前这曲
	nowMusic(state, i) {
		state.imusic = i
	},
	// 控制音乐分类和我的音乐 正在播放歌曲的样式
	ifimusicFun(state, str) {
		state.ifimusic = str
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
	},
	// 改变加载音乐条
	changeNum(state, n) {
		state.num = n
	},
	addNum(state, n) {
		state.num += n
	}

}
const actions = {
	
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
