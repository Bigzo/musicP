<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="box">
      <range w='80%' dw='90%' pw='50%' ifload='true'></range>
    </div>
  </div>
</template>

<script>
import range from './range'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    range
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
