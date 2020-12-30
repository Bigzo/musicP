 <template>
  <div class="musicList" id="mlist">
      <left-content @clickMusicSortList='clickMusicSortListFun' @clickMySortList='clickMySortListFun'></left-content>
      <center-content @scrollSlice='scrollSliceFun'></center-content>
      <right-conetnt></right-conetnt>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import leftContent from './leftContent'
import centerContent from './centerContent'
import rightConetnt from './rightContent'
export default {
  name: 'musicList',
  data() {
    return {
      musicNum: 20    //初始加载20条
    }
  },
  computed: {
    ...mapState(['nowMusicType', 'musicDataList', 'mySortList', 'nowMyMusicIndex', 'nowSongId'])
  },
  components: {
    leftContent,
    centerContent,
    rightConetnt
  },
  methods: {
    ...mapMutations(['getNowMusicType', 'haveMusicDataList', 'getNowMyMusicIndex', 'haveTotalWord', 'buildTimeArray', 'pushTimeArray']),
    // 点击音乐分类
    clickMusicSortListFun(data) {
      this.musicNum = 20
      this.getNowMyMusicIndex(-1)
      this.getNowMusicType(data)
      this.getMusicDataList(this.nowMusicType, this.musicNum)
    },
    // 点击我的歌单
    clickMySortListFun(data) {
      this.musicNum = 20
      this.getNowMusicType(0)
      this.getNowMyMusicIndex(data)
      this.$emit('clickMySortListFun', data)
    },
    // 获取歌曲列表
    getMusicDataList(t, n) {
      this.$http.get('https://api.mling.cc/sortmusic?t=' + t + '&n=' + n + '&offset=0').then((response) => {
        this.haveMusicDataList(response.body.song_list)
      }).catch((response) => {
        console.log('error!')
      })
    },
    // 滚动加载歌曲
    scrollSliceFun(data) {
      var r = this.musicNum * 40 - data.h
      if(r > 0) {
        if(data.eTop >= r) {
          console.log(1)
          this.musicNum += 20
          this.getMusicDataList(this.nowMusicType, this.musicNum)
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getMusicDataList(this.nowMusicType, this.musicNum)
    })
  }
}
</script>

<style scoped>
.musicList {
  height: 83%;
  background: #fff;
  overflow: hidden;
}
</style>
