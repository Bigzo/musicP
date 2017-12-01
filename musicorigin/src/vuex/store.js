import Vue from 'vue'
import Vuex from 'vuex'
import async from 'async'

Vue.use(Vuex)

const state = {
	// 歌曲列表
	musicSortList: [
		{mname: '新歌榜', type: 1, dataList: []},
		{mname: '热歌榜', type: 2, dataList: []},
		{mname: '摇滚榜', type: 11, dataList: []},
		{mname: '爵士', type: 12, dataList: []},
		{mname: '流行', type: 16, dataList: []},
		{mname: '欧美金曲榜', type: 21, dataList: []},
		{mname: '经典老歌榜', type: 22, dataList: []},
		{mname: '情歌对唱榜', type: 23, dataList: []},
		{mname: '影视金曲榜', type: 24, dataList: []},
		{mname: '网络歌曲榜', type: 25, dataList: []}
	],
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
	changeNowIndex(state, index) {
		state.nowIndex = index
	},
	changeMyIndex(state, index) {
		state.myIndex = index
	},
	ifmusiclistTure(state) {
		state.ifmusiclist = true
	},
	ifmusiclistFalse(state) {
		state.ifmusiclist = false
	},
	getMusicDataList(state) {
		async.each(state.musicSortList, (item, callback) => {
			Vue.http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=' + item.type + '&size=15&offset=0').then((response) => {
				item.dataList = response.body.song_list
				callback()
			}).catch((response) => {
				callback(response)
			})
		}, (err) => {
			if(err) {
				console.log('error!')
			}else {
				console.log('success!')
			}
		})
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
