import Vue from 'vue'
import Vuex from 'vuex'
import async from 'async'

Vue.use(Vuex)

const state = {
	nowType: 1,	//当前歌曲分类
	nowSongId: 566310948,	//当前歌曲id
	mySortList: [	// 我的歌曲列表
		{mname: '纯音乐', dataList: [{title: '1'}]},
		{mname: '我的音乐', dataList: [{title: '2'}]},
		{mname: '喜欢的音乐', dataList: [{title: '3'}]}
	],
	myIndex: -1
}
const getters = {
	
}
const mutations = {
	// 改变歌曲分类
	changeNowType(state, index) {
		state.nowType = index
	},
	// 点击我的音乐 改变nowType
	makeNowType(state) {
		state.nowType = 0
	},
	// 改变当前歌曲id
	changeNowSongId(state, id) {
		state.nowSongId = id
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
