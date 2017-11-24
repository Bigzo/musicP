 <template>
  <div class="contain">
       <div class="music_context">
           <div class="music_head" id="mhead">
               <div class="my_music_box">
                 <div class="my_music">
                   <img src="../static/img/music.png">
                   <span>我的音乐</span>
                 </div>
               </div>
               <div class="search_music">
                   <img src="../static/img/search_music.png">
                   <input type="text" name="smusic">
                   <div class="search_result" v-if='ifresult'>
                       <div class="my_search_result">
                           <div class="result_title">列表</div>
                           <ul>
                             <li><span>拥抱你</span> - <span>刘思涵</span><img class="rt" src="../static/img/l_b.png"></li>
                             <li><span>拥抱你</span> - <span>刘思涵</span><img class="rt" src="../static/img/l_b.png"></li>
                             <li><span>拥抱你</span> - <span>刘思涵</span><img class="rt" src="../static/img/l_b.png"></li>
                           </ul>
                       </div>
                       <div class="my_search_music">
                           <div class="result_title">音乐库</div>
                           <ul>
                             <li>
                               <img class="lf" src="../static/img/default_bg.jpg">
                               <div class="lf"><p>拥抱你</p><p>刘思涵</p></div>
                               <img class="rt m_img" src="../static/img/l_b.png">
                             </li>
                             <li>
                               <img class="lf" src="../static/img/default_bg.jpg">
                               <div class="lf"><p>拥抱你</p><p>刘思涵</p></div>
                               <img class="rt m_img" src="../static/img/l_b.png">
                             </li>
                             <li>
                               <img class="lf" src="../static/img/default_bg.jpg">
                               <div class="lf"><p>拥抱你</p><p>刘思涵</p></div>
                               <img class="rt m_img" src="../static/img/l_b.png">
                             </li>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
           <router-view></router-view>
           <music-foot></music-foot>
       </div>
       <div class="music_bg mask-layer"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      ifresult: false
    }
  }
}
</script>

<style scoped>
.contain {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(204,204,204,0.8);
  border-radius: 3px;
}
.music_context {
  height: 100%;
  width: 100%;
}
.music_bg {
  z-index: -1;
  background: url(../static/img/default_bg.jpg) no-repeat center center;
  background-size: cover;
  -webkit-filter: blur(15px);
     -moz-filter: blur(15px);
       -o-filter: blur(15px);
      -ms-filter: blur(15px);
          filter: blur(15px);
}
.music_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 7%;
  background: rgba(204, 204, 204, 0.3);
}
.my_music_box {
  height: 100%;
  display: none;
}
.my_music {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.my_music>img {
  width: 30px;
}
.my_music>span {
  font-size: 16px;
  margin-left: 5px;
  color: #fff;
}
.search_music {
  height: 30px;
  margin-left: 220px;
  position: relative;
}
.search_music>img {
  height: 20px;
  position: absolute;
  left: 10px;
  top: 5px;
}
.search_music>input[type=text] {
  height: 30px;
  width: 215px;
  padding-left: 35px;
  border-radius: 15px;
  background: rgba(0,0,0,0.15);
}
.search_result {
  width: 280px;
  background: #fff;
  position: absolute;
  border: 1px solid #bababa;
  z-index: 10;
  left: 0px;
  top: 33px;
  border-radius: 3px;
}
.result_title {
  background: #f0f0f0;
  color: #aaaaaa;
  height: 30px;
  text-indent: 20px;
  line-height: 30px;
}
.my_search_result>ul {
  padding: 10px 0px 10px 0px;
}
.my_search_music>ul {
  padding: 15px 0px 25px 0px;
}
.my_search_result>ul>li, .my_search_music>ul>li {
  height: 30px;
  padding: 0px 20px 0px 20px;
  margin-bottom: 10px;
}
.my_search_music>ul>li>div {
  margin-left: 8px;
}
.my_search_music>ul>li>div>p {
  font-size: 12px;
  line-height: 14px;
}
.my_search_music>ul>li>img {
  height: 30px;
}
.my_search_result>ul>li>img, .my_search_music>ul>li>img.m_img {
  height: 20px;
  margin-top: 5px;
}
@media screen and (max-width: 1024px) {
  .search_result {top: 33px;}
  .search_music {height: 40px;}
  .search_music>img {height: 30px;}
  .search_music>input[type=text] {height: 40px;width: 300px;border-radius: 20px;padding-left: 45px;font-size: 20px;}
}
@media screen and (max-width: 414px) {
  .music_context {overflow-x: scroll;}
  ::-webkit-scrollbar {display: none;}
  .search_music {height: 30px;}
  .search_music>img {height: 20px;}
  .search_music>input[type=text] {height: 30px;width: 200px;border-radius: 20px;padding-left: 35px;font-size: 14px;}
  .search_music {margin-left: 50px;}
  .my_music_box {display: block;margin-left: 220px;}
}
@media screen and (max-width: 360px) {
  .search_music {height: 26px;}
  .search_music>img {height: 18px;}
  .search_music>input[type=text] {height: 26px;width: 180px;border-radius: 20px;padding-left: 35px;font-size: 14px;}
  .search_music {margin-left: 20px;}
  .my_music_box {display: block;margin-left: 220px;}
  .my_music>img {
    width: 23px;
  }
  .my_music>span {
    font-size: 14px;
  }
}
</style>
