<!-- 
  ***没用到*** 
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click='clickFun'>click</button>
    <div class="box">
      <width :pw.sync='pp' @smallClick='smallClickFun'></width>
    </div>
  </div>
</template>

<script>
import width from './width'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pp: '10%',
      p: 10,
      inter: ''
    }
  },
  components: {
    width
  },
  methods :{
    clickFun() {
      this.inter = setInterval(() => {
         this.p++
         this.pp = this.p + "%"
       }, 100)
     
    },
    smallClickFun() {
      clearInterval(this.inter)
      this.p = 100
      this.clickFun()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  height: 20px;
  background: #ccc;
  padding: 5px;
}
</style>
