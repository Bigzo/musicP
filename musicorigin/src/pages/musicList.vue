 <template>
  <div class="musicList" id="mlist">
      <left-content></left-content>
      <center-content></center-content>
      <right-conetnt></right-conetnt>
  </div>
</template>

<script>
import leftContent from './leftContent'
import centerContent from './centerContent'
import rightConetnt from './rightContent'
export default {
  name: 'musicList',
  data() {
    return {
      ifcontorl: false
    }
  },
  components: {
    leftContent,
    centerContent,
    rightConetnt
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
