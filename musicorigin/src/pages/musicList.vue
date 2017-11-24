 <template>
  <div class="musicList" id="mlist">
     <div class="list_left lf">
       <div class="music_classify">
         <div class="music_title lightgray">歌曲分类</div>
         <ul>
           <li><span class="darkgray">新</span><span>新歌榜</span></li>
           <li><span class="darkgray">热</span><span>热歌榜</span></li>
           <li><span class="darkgray">摇</span><span>摇滚榜</span></li>
           <li><span class="darkgray">爵</span><span>爵士</span></li>
           <li><span class="darkgray">流</span><span>流行</span></li>
           <li><span class="darkgray">欧</span><span>欧美金曲榜</span></li>
           <li><span class="darkgray">经</span><span>经典老歌榜</span></li>
           <li><span class="darkgray">情</span><span>情歌对唱榜</span></li>
           <li><span class="darkgray">影</span><span>影视金曲榜</span></li>
           <li><span class="darkgray">网</span><span>网络歌曲榜</span></li>
         </ul>
       </div>
       <div class="music_my">
         <div class="music_title lightgray">我的歌单<span class="build_classify rt darkgray">+</span></div>
         <ul>
           <li class="active"><span class="darkgray">纯</span><span>纯音乐</span></li>
           <li><span class="darkgray">我</span><span>我的音乐</span></li>
         </ul>
       </div>
     </div>
     <div class="list_center lf" id="mcenter">
       <div class="center_title lightgray">
         <div class="title_name">歌曲<span>（22）</span></div>
         <div class="title_singer">演唱者</div>
         <div class="title_special">专辑</div>
       </div>
       <ul class="center_music_list">
         <li>
          <label>
            <div class="music_box lf">
              <span class="m_check lf"><input type="checkbox" name=""><img src="../../static/img/choose.png"></span>
              <span class="m_num lightgray lf">1</span>
              <span class="m_name hidden-text lf">小幸运</span>
            </div>
            <div class="m_singer lf hidden-text">田馥甄</div>
            <div class="m_special lf hidden-text"><span class="hidden-text lf">我的少女时代 电影歌曲原声带</span><span class="lf contorl_img"><img src="../../static/img/l_b.png"><img src="../../static/img/l_j.png"><img src="../../static/img/l_x.png"></span></div>
          </label>
        </li>
        <li>
          <label>
            <div class="music_box lf">
              <span class="m_check lf"><input type="checkbox" name=""><img src="../../static/img/choose.png"></span>
              <span class="m_num lightgray lf">1</span>
              <span class="m_name hidden-text lf">小幸运</span>
            </div>
            <div class="m_singer lf hidden-text">田馥甄</div>
            <div class="m_special lf hidden-text"><span class="hidden-text lf">我的少女时代 电影歌曲原声带</span><span class="lf contorl_img"><img src="../../static/img/l_b.png"><img src="../../static/img/l_j.png"><img src="../../static/img/l_x.png"></span></div>
          </label>
        </li>
        <li>
          <label>
            <div class="music_box lf">
              <span class="m_check lf"><input type="checkbox" name=""><img src="../../static/img/choose.png"></span>
              <span class="m_num lightgray lf">1</span>
              <span class="m_name hidden-text lf">小幸运</span>
            </div>
            <div class="m_singer lf hidden-text">田馥甄</div>
            <div class="m_special lf hidden-text"><span class="hidden-text lf">我的少女时代 电影歌曲原声带</span><span class="lf contorl_img"><img src="../../static/img/l_b.png"><img src="../../static/img/l_j.png"><img src="../../static/img/l_x.png"></span></div>
          </label>
        </li> 
       </ul>
       <div class="opration_btn">
         <div class="btn_check"><input type="checkbox" name=""><img src="../../static/img/choose.png"></div>
         <div class="btn_button"><span><img src="../../static/img/btn_x.png">删除</span></div>
         <div class="btn_button"><span><img src="../../static/img/btn_j.png">添加到歌单</span></div>
       </div>
     </div>
     <div class="list_right lf">
       <div class="music_img">
         <img src="../../static/img/default_bg.jpg">
       </div>
       <div class="music_text">
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p class="orange">过渡拥挤的思绪怎么安排顺序</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
         <p>我叫什么名 该往哪里去</p>
         <p>有没有人能带我离开这伤心地</p>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'musicList',
  data() {
    return {
      ifcontorl: false
    }
  }
}
</script>

<style scoped>
.musicList {
  height: 83%;
  background: #fff;
  overflow: hidden;
}
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
.center_music_list {
  height: 83%;
  overflow-y: scroll;
}
.center_music_list>li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #efefef;
}
.center_music_list>li:last-child {
  border: none;
}
.center_music_list>li:hover {
  background: #f0f0f0;
}
.contorl_img {
  display: none;
}
.center_music_list>li:hover .contorl_img {
  display: block;
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
/*right*/
.list_right {
  width: 25%;
  height: 100%;
}
.list_right>div.music_img {
  text-align: center;
}
.list_right>div.music_img>img {
  margin-top: 20px;
  width: 172px;
}
.list_right>div.music_text {
  text-align: center;
  width: 225px;
  margin: auto;
  line-height: 30px;
  font-size: 14px;
  height: 400px;
  overflow-y: scroll;
}

/*media*/
@media screen and (max-width: 1024px) {
  .music_title {font-size: 22px;}
  .music_classify>ul>li,.music_my>ul>li {font-size: 20px;height: 40px;}
  .build_classify,.center_title,.list_right>div.music_text,.center_music_list>li>label {font-size: 20px;}
  .music_classify>ul>li>span:nth-child(1),.music_my>ul>li>span:nth-child(1) {font-size: 18px;height: 24px;width: 24px;}
  .list_left {width: 30%;border-right: 1px solid #ccc;box-shadow: 1px 1px 2px #ccc;padding-right: 20px;}
  .list_center {width: 70%;}
  .music_box>span.m_check,.opration_btn>div.btn_check {height: 20px; width: 20px;}
  .music_box>span.m_check>img,.opration_btn>div.btn_check>img {width: 22px;}
  .opration_btn>div.btn_button>span {font-size: 20px;padding-left: 35px;}
  .opration_btn>div.btn_button>span>img {height: 22px;}
  .list_right {display: none;}
  .title_name {width: 60%;}
  .title_singer {width: 40%;}
  .title_special {display: none;}
  .music_box {width: 60%;}
  .m_singer {width: 40%;}
  .m_special {display: none;}
  .center_music_list {font-size: 20px;}
  .center_title {font-size: 20px;}
}
@media screen and (max-width: 414px) {
  .list_left {width: 200px;}
  .title_singer {display: none;}
  .m_singer{display: none;}
  .music_title {font-size: 16px; height: 10%;}
  .music_classify>ul>li,.music_my>ul>li {font-size: 14px;height: 30px;}
  .build_classify,.center_title,.list_right>div.music_text,.center_music_list>li>label {font-size: 14px;}
  .music_classify>ul>li>span:nth-child(1),.music_my>ul>li>span:nth-child(1) {font-size: 12px;height: 18px;width: 18px;line-height: 14px;}
  .music_box>span.m_check,.opration_btn>div.btn_check {height: 15px; width: 15px;}
  .music_box>span.m_check>img,.opration_btn>div.btn_check>img {width: 18px;}
  .opration_btn>div.btn_button>span {font-size: 14px;padding-left: 30px;}
  .opration_btn>div.btn_button>span>img {height: 18px;}
  .title_name {width: 100%;}
  .music_box {width: 100%;}
}
@media screen and (max-width: 360px) {
  .music_title {font-size: 14px; height: 10%;}
}
</style>
