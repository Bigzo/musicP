 <template>
  <div class="music_foot" id="mfoot">
    <div class="left_play lf">
    	<img class="prev_img" src="../../static/img/prev.png">
    	<img class="play_img" @click='playnum = !playnum' v-if='playnum' src="../../static/img/stop.png">
    	<img class="play_img" @click='playnum = !playnum' v-else src="../../static/img/play.png">
    	<img class="next_img" src="../../static/img/next.png">
    	<img class="loop_img" @click='picnum = !picnum' v-if='picnum' src="../../static/img/list.png">
    	<img class="loop_img" @click='picnum = !picnum' v-else src="../../static/img/one.png">
    </div>
    <div class="media_dv rt">
    	<div class="media_cen">
    		<div class="m_text">
    			<span>拥抱你</span>
    			<span>群星</span>
    		</div>
    		<div class="m_img">
    			<img src="../../static/img/default_bg.jpg">
    		</div>
    	</div>
    </div>
    <div class="center_plan lf">
    	<div class="center_plan_box">
    		<div class="playing_music white hidden-text"><span>拥抱你</span> - <span>王佳；关晓彤；易烊千玺；吴牧野</span></div>
    		<div class="playing_bar lightgray">
    			<div class="start_time lf">00:37</div>
    			<div class="music_bar lf">
    				<range w='100%' dw='90%' pw='50%' ifload='true'></range>
    			</div>
    			<div class="end_time lf">04:00</div>
    		</div>
    	</div>
    </div>
    <div class="right_control lf">
    	<div class="open_btn lf"><span class="on_span" v-if='ifopen'>ON</span><span class="btn_dv" :class='{btn_open: ifopen}' @click='openQuality'>高品质</span><span class="off_span" v-if='!ifopen'>OFF</span></div>
    	<div class="sounds_bar_box lf">
    		<img class="lf" v-if='ifsounds' @click='soundsContorl' src="../../static/img/sounds.png">
    		<img class="lf" v-else @click='soundsContorl' src="../../static/img/closesounds.png">
    		<div class="sounds_bar lf">
    			<range w='100%' pw='30%' ifload='' v-if='ifsounds' key='sounds_open'></range>
    			<range w='100%' pw='0%' ifload='' v-else key='sounds_close'></range>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import range from './range'
export default {
  name: 'musicFoot',
  install: function(Vue) {
  	Vue.component('musicFoot', this)
  },
  data() {
  	return {
  		ifopen: false,
  		picnum: false,
  		playnum: false,
  		ifsounds: true
  	}
  },
  components: {
  	range
  },
  methods: {
  	openQuality() {
  		this.ifopen = !this.ifopen
  	},	
  	soundsContorl() {
  		this.ifsounds = !this.ifsounds
  	}
  },
  created() {
  }
}
</script>

<style scoped>
.music_foot {
	height: 10%;
	background: rgba(204, 204, 204, 0.3);
}
.left_play {
	height: 100%;
	width: 20%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}
.left_play>img {
	margin-left: 30px;
	vertical-align: middle;
	cursor: pointer;
}
.left_play>img.prev_img,.left_play>img.next_img {
	height: 25px;
}
.left_play>img.play_img {
	height: 30px;
}
.left_play>img.loop_img {
	width:20px; 
}
.media_dv {
	display: none;
	height: 100%;
	margin-right: 20px;
}
.media_cen {
	height: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}
.m_text {
	margin-right: 5px;
}
.media_cen>div>span{
	display: block;
	font-size: 14px;
	line-height: 26px;
}
.m_img {
	font-size: 0px;
}
.media_cen>div>img {
	width: 60px;
}
.center_plan {
	width: 60%;
	height: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}
.right_control {
	height: 100%;
	width: 20%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}
.center_plan_box {
	padding-top: 10px;
	width: 88%;
	margin: auto;
}
.music_bar {
	width: 85%;
	height: 4px;
	margin-left: 1%;
	margin-right: 1%;
	margin-top: 8px;
}
.playing_bar {
	overflow: hidden;
	margin-top: 5px;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	-khtml-user-select: none;
	user-select: none;
}
.open_btn {
	height: 25px;
	width: 75px;
	border-radius: 15px;
	background: rgba(255, 255, 255, 0.3);
	font-size: 12px;
	color: #fff;
}
.on_span {
	margin-left: 3px;
}
.open_btn>span.btn_dv {
	display: inline-block;
	padding: 0px 5px 0px 5px;
	line-height: 25px;
	color: #bababa;
	height: 100%;
	border-radius: 15px;
	background: #fff;
	margin-right: 2px;
	cursor: pointer;
}
.open_btn>span.btn_open {
	margin-left: 4px;
}
.sounds_bar_box {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	-khtml-user-select: none;
	user-select: none;
}
.sounds_bar_box>img {
	margin-left: 12px;
	width: 20px;
	cursor: pointer;
}
.sounds_bar {
	margin-top: 9px;
	width: 80px;
	height: 3px;
	background: #bababa;
	margin-left: 5px;
}
@media screen and (max-width: 1024px) {
	.left_play {width: 30%;}
	.left_play>img.prev_img,.left_play>img.next_img {
		height: 35px;
	}
	.left_play>img.play_img {
		height: 40px;
	}
	.left_play>img.loop_img {
		width: 30px; 
	}
	.left_play>img {margin-left: 25px;}
	.center_plan {width: 70%;}
	.right_control {display: none;}
	.music_bar {width: 80%;}
	.center_plan_box {font-size: 16px;}
}
@media screen and (max-width: 414px) {
  .center_plan {display: none;}
  .left_play {margin-left: 220px;}
  .loop_img {display: none;}
  .media_dv {display: block;}
}
@media screen and (max-width: 360px) {
  .left_play>img.prev_img,.left_play>img.next_img {
  		height: 30px;
  	}
  	.left_play>img.play_img {
  		height: 35px;
  	}
  	.left_play>img {margin-left: 15px;}

  	.media_cen>div>span{
  		font-size: 12px;
  		line-height: 20px;
  	}
  	.media_cen>div>img {
  		width: 45px;
  	}
}
</style>
