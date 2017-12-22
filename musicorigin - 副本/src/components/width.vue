<!-- 
  ***没用到*** 
-->
<template>
  <div class="width">
    <div :style='{width: pw}' :id='pw'></div>
    <button @click='smallClick'>small click</button>
  </div>
</template>

<script>
import range from './range'
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  props: ['pw'],
  methods: {
    smallClick() {
      this.$emit('update:pw', '100%')
      this.$emit('smallClick')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.width>div {
  height: 10px;
  background: red;
}
</style>
