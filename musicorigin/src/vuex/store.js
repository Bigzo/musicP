import Vue from 'vue'
import Vuex from 'vuex'
import async from 'async'

Vue.use(Vuex)

const state = {
	nowType: 1,
	// 我的歌曲列表
	mySortList: [
		{mname: '纯音乐', dataList: []},
		{mname: '我的音乐', dataList: []}
	],
	ifmusiclist: true,	
	nowIndex: 0,	//歌曲分类
	myIndex: 1,
	nowSongId: 566310948,	//当前歌曲id
	nowSongContent: ''	//当前歌曲歌词
}
const getters = {
	
}
const mutations = {
	changeNowType(state, index) {
		state.nowType = index
	},
	ifmusiclistTure(state) {
		state.ifmusiclist = true
	},
	ifmusiclistFalse(state) {
		state.ifmusiclist = false
	},
	getMusicWords(state) {
		Vue.http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.lry&songid=' + state.nowSongId).then((response) => {
			state.nowSongContent = response.body.lrcContent
		}).catch((response) => {
			console.log('error!')
		})
	},
	playMusic(state, id) {
		state.nowSongId = id
	},
	pushMymusic(state, arr) {
		state.mySortList[1].dataList = arr
	},
	addMySortList(state, name) {
		state.mySortList.push({mname: name, dataList: []})
	}
}
const actions = {
	/*getMusicList({commit}, type) {
		commit('getMusicLi', parseInt(type))
	}*/
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
