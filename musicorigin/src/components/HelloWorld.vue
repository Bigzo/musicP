<!-- 
  ***没用到*** 
-->
<template>
  <div class="hello">
    <v-touch class="box" v-on:swipeleft="Swipeleft" v-on:swiperight="Swiperight" v-on:swipeup="Swipeup" :style='{marginLeft: l}'>
      <div></div>
    </v-touch>
    <div class="dv" @click.capture='dvClick'>
      <div class="ch" @click='chClick'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      lefthe: 0
    }
  },
  computed: {
    l: function() {
      return this.lefthe + 'px'
    }
  },
  methods :{
    Swipeleft:function(data){
       this.lefthe = -50
    },
    Swiperight:function(data){
        this.lefthe = 50
    },
    Swipeup:function(data){
       console.log('Swipeup')
    },
    dvClick:function() {
      alert('dv')
    },
    chClick:function() {
      alert('ch')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  height: 100px;
  width: 100px;
}
.box>div {
  height: 100%;
  width: 100%;
  border: 1px solid red;
}
.dv {
  height: 200px;
  width: 200px;
  background: #000;
}
.ch {
  height: 50px;
  width: 50px;
  background: red;
}
</style>
