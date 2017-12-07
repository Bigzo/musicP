import Vue from 'vue'
import Vuex from 'vuex'
import async from 'async'

Vue.use(Vuex)

const state = {
	l: '',		//margin-left
	o: '',		//overflow-x
	nowurl: 'url(../static/img/default_bg.jpg)',	//背景图
	nowpic: '../../static/img/default_bg.jpg',		//歌词图
	nowType: 1,		//当前歌曲分类
	nowSongId: 566310948,	//当前歌曲id,
  	imusic: 0,	//当前歌曲index
  	imusicDataList: [],	//当前列表
	mySortList: [	// 我的歌曲列表
		{mname: '纯音乐', dataList: [{title: '1'}]},
		{mname: '我的音乐', dataList: [{title: '2'}]},
		{mname: '喜欢的音乐', dataList: [{title: '3'}]}
	],
	myIndex: -1,	//我的音乐下标
	nowMusicSrc: '',
  	playnum: true,	//播放音乐
  	ifloop: false,	//是否循环
  	musicMsg: {sname: 'music name', sauthor: 'music author', sduration: '0:00'},
  	runRange: true
}
const getters = {
	
}
const mutations = {
	// 改变歌曲分类
	changeNowType(state, index) {
		state.nowType = index
	},
	// 改变我的音乐
	changeMyIndex(state, index) {
		state.myIndex = index
	},
	// 添加我的音乐分类
	addMySortList(state, name) {
		state.mySortList.push({mname: name, dataList: []})
	},
	// 添加音乐到分类
	pushMymusic(state, item) {
		state.mySortList[1].dataList.push(item)
	},
	// 更改 l o
	changeLO(state) {
		state.l = '0px'
		state.o = 'scroll'
	},
	// 改变当前歌曲id
	changeNowSongId(state, item) {
		state.imusic = item.i
		state.imusicDataList = item.data
		mutations.changeNowurl(state)
		mutations.playnumFun(state)
		mutations.noLoopMusic(state)
	},
	// 改变背景图
	changeNowurl(state) {
		state.nowSongId = state.imusicDataList[state.imusic].song_id
		Vue.http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=' + state.imusicDataList[state.imusic].song_id).then((response) => {
			if(response.body.songinfo.pic_big === ''){
				state.nowurl = "url(../static/img/allpic.png)"
				state.nowpic = '../../static/img/allpic.png'
			}else {
				if(response.body.songinfo.pic_huge === '') {
					state.nowurl = "url(" + response.body.songinfo.pic_big + ")"
					state.nowpic = response.body.songinfo.pic_big
				}else {
					state.nowurl = "url(" + response.body.songinfo.pic_huge + ")"
					state.nowpic = response.body.songinfo.pic_big
				}
			}
			state.nowMusicSrc = response.body.bitrate.show_link
			state.musicMsg = {sname: response.body.songinfo.title, sauthor: response.body.songinfo.author, sduration: response.body.bitrate.file_duration}
			console.log(response)
		}).catch((response) => {
			console.log(response)
		})
	},
	// 播放音乐
	playnumFun(state) {
		state.playnum = false
		state.runRange = false
	},
	// 暂停播放
	stopnumFun(state) {
		state.playnum = true
	},
	// 循环
	loopMusic(state) {
		state.ifloop = true
	},
	//不循环
	noLoopMusic(state) {
		state.ifloop = false
	},
	// 自动下一曲
	selfNextMusic(state) {
		if(state.imusic > state.imusicDataList.length) {
			state.imusic = state.imusicDataList.length
		}else {
			state.imusic = state.imusic + 1
		}
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
