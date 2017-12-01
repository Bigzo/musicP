 <template>
  <div class="contain">
       <div class="music_context">
           <music-head></music-head>
           <router-view></router-view>
           <music-foot></music-foot>
       </div>
       <div class="music_bg mask-layer"></div>
  </div>
</template>

<script>
import musicHead from './components/musicHead'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    musicHead
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
@media screen and (max-width: 414px) {
  .music_context {overflow-x: scroll;}
  ::-webkit-scrollbar {display: none;}
}
</style>
