<template>
	<div class="list_left lf">
	  <div class="music_classify">
	    <div class="music_title lightgray">歌曲分类</div>
	    <ul>
	      <li v-for='(msort, index) in musicSortList' :class="[(index === numli && ifmusiclist === true) ? 'active' : '']" @click='musicLi(index)'><span class="darkgray">{{msort.mname | firstWord}}</span><span>{{msort.mname}}</span></li>
	    </ul>
	  </div>
	  <div class="music_my">
	    <div class="music_title lightgray">我的歌单<span class="build_classify rt darkgray" @click='ifinput = !ifinput'>+</span></div>
	    <input type="text" name="" class="addInput" v-if='ifinput' @keyup.enter='addMyList' v-model='myName'>
	    <ul>
	      <li v-for='(mli, index) in mySortList' :class="[(index === myli && ifmusiclist === false) ? 'active' : '']" @click='myMusicLi(index)'><span class="darkgray">{{mli.mname | firstWord}}</span><span>{{mli.mname}}</span></li>
	    </ul>
	  </div>
	</div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
	name: 'leftContent',
	data() {
		return {
			numli: 0,
			myli: -1,
			ifinput: false,
			myName: ''
		}
	},
	computed: {
		...mapState(['musicSortList', 'mySortList', 'ifmusiclist'])
	},
	methods: {
		...mapMutations(['changeNowIndex', 'ifmusiclistFalse', 'ifmusiclistTure', 'addMySortList', 'changeMyIndex']),
		musicLi(i) {
			this.numli = i
			this.ifmusiclistTure()
			this.changeNowIndex(i)
		},
		myMusicLi(i) {
			this.myli = i
			this.ifmusiclistFalse()
			this.changeMyIndex(i)
		},
		addMyList() {
			this.addMySortList(this.myName)
			this.myName = ''
			this.ifinput = false
		}
	}
}
</script>
<style scoped>
	/*left*/
	.list_left {
	  height: 100%;
	  width: 15%;
	  padding-left: 8px;
	  padding-right: 30px;
	}
	.music_classify {
	  height: 50%;
	  width: 100%;
	  border-bottom:2px solid #dadada;
	}
	.music_classify>ul {
	  height: 87%;
	  overflow-y: scroll;
	}
	.music_my {
	  height: 50%;
	}
	.music_my>ul {
	  height: 87%;
	  overflow-y: scroll;
	}
	.music_title {
	  height: 13%;
	  font-size: 14px;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  -webkit-box-align: center;
	  -ms-flex-align: center;
	  align-items: center;
	  -webkit-box-pack: justify;
	  -ms-flex-pack: justify;
	  justify-content: space-between;
	}
	.build_classify {
	  font-size: 18px;
	  cursor: pointer;
	}
	.music_classify>ul>li,.music_my>ul>li {
	  width: 100%;
	  height: 32px;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  -webkit-box-align: center;
	  -ms-flex-align: center;
	  align-items: center;
	  border-radius: 5px;
	  padding-left: 5px;
	  font-size: 14px;
	  cursor: pointer;
	}
	.music_classify>ul>li.active,.music_my>ul>li.active {
	  background: #f0f0f0;
	}
	.music_classify>ul>li>span:nth-child(1),.music_my>ul>li>span:nth-child(1) {
	  border: 2px solid #a1a1a1;
	  height: 22px;
	  width: 22px;
	  border-radius: 50%;
	  display: inline-block;
	  font-size: 12px;
	  text-align: center;
	  line-height: 18px;
	}
	.music_classify>ul>li>span:nth-child(2),.music_my>ul>li>span:nth-child(2) {
	  margin-left: 8px;
	}
	.addInput {
		border: 1px solid #ccc;
		height: 25px;
		padding-left: 5px;
		width: 95%;
	}
	/*media*/
	@media screen and (max-width: 1024px) {
	  .music_title {font-size: 22px;}
	  .music_classify>ul>li,.music_my>ul>li {font-size: 20px;height: 40px;}
	  .build_classify {font-size: 20px;}
	  .music_classify>ul>li>span:nth-child(1),.music_my>ul>li>span:nth-child(1) {font-size: 18px;height: 24px;width: 24px;}
	  .list_left {width: 30%;border-right: 1px solid #ccc;box-shadow: 1px 1px 2px #ccc;padding-right: 20px;}
	}
	@media screen and (max-width: 414px) {
	  .list_left {width: 200px;}
	  .build_classify {font-size: 14px;}
	  .music_title {font-size: 16px; height: 10%;}
	  .music_classify>ul>li,.music_my>ul>li {font-size: 14px;height: 30px;}
	  .music_classify>ul>li>span:nth-child(1),.music_my>ul>li>span:nth-child(1) {font-size: 12px;height: 18px;width: 18px;line-height: 14px;}
	}
	@media screen and (max-width: 360px) {
	  .music_title {font-size: 14px; height: 10%;}
	}
</style>