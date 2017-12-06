<template>
  <div class="range_len" :style='{width: w,height: h}' ref='range' @click='clickRange($event)' @mousedown='downLenght($event)' @mousemove='moveLenght($event)' @mouseup='upLenght($event)'>
      <div class="download_len" v-if="ifload" :style='{width: dw}'></div>
      <div class="progress_len" :style='{width: pwlen}' ref='pro'>
          <i class="len_spot" ref='spot' v-clickoutside='handleClickOutside'></i>
      </div>
  </div>
</template>
<script>
import clickoutside from '../assets/js/clickoutside'
export default {
  name: 'range',
  props: {
    h: {type: String, default: '3px'},
    w: {type: String, default: '100%'},
    dw: {type: String, default: '0%'},
    pw: {type: String, default: '0%'},
    ifload: {default: ''},
    clobtn: {type: Boolean, default: true}
  },
  data () {
    return {
      pwlen: '',
      can: 0,
      prolen: 0,
      proInterval: '',
      olen: 0,
      b: 0
    }
  },
  directives: {
    clickoutside
  },
  methods: {
    // 点击
    clickRange(e) {
      var len = this.$refs.range.offsetWidth
      if(e.target === this.$refs.spot) {
      }else {
        if(e.offsetX > (len - 4)) {
            this.pwlen = '100%';
        }else if(e.offsetX < 4) {
            this.pwlen = '0%';
        }else{
            this.pwlen = (e.offsetX/len) * 100 +'%';
        }
      }
    },
    // 鼠标按下
    downLenght(e) {
      if(e.target === this.$refs.spot) {
        this.can = 1
      }
      this.b = e.pageX
      this.olen = e.pageX
      this.proInterval = setInterval(() => {
        this.olen = this.b
      }, 5)
    },
    // 移动
    moveLenght(e) {
      var len = this.$refs.range.offsetWidth
      if(this.can === 1) {
        this.b = e.pageX
        this.prolen = this.$refs.pro.offsetWidth
        var num = this.prolen + (this.b - this.olen)
        if(num > len) {
          this.pwlen = '100%'
        }else if(num < 0) {
          this.pwlen = '0%'
        }else {
          this.pwlen = num / len * 100 + '%'
        }
      }
    },
    // 鼠标松开
    upLenght(e) {
      this.can = 0
      clearInterval(this.proInterval)
    },
    // 进度条之外点击
    handleClickOutside(e) {
      this.can = 0
    }
  },
  created() {
    this.pwlen = this.pw
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.range_len {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  background: #bababa;
  position: relative;
  border-radius: 3px;
}
.download_len,.progress_len {
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 3px;
}
.download_len {
  background: rgba(255, 255, 255, 0.6);
  z-index: 1;
}
.progress_len {
  background: #fff;
  z-index: 2;
}
.len_spot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  right: -4px;
  top: -2.5px;
  cursor: pointer;
  z-index: 3;
}
</style>
