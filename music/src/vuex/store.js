import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	musicData: []
}

const getters = {
	musicData: () => {

	}
}

const mutations = {
	
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})

