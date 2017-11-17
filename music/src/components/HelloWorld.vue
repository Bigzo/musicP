<template>
  <div class="hello">
    <ul>
      <li v-for='music in musicData'>
        {{music.song_id}}
        <img :src="music.pic_big" @click="listenMusic(music.song_id)">
        <audio :src="musicLink" controls="controls">you browser does not support!</audio>
        <p>{{musicText}}</p>
        <button @click='recommendMusic(music.song_id)'>推荐</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      musicData: [],
      musicText: '',
      musicLink: '',
      num: 3
    }
  },
  methods: {
    getData () {
      this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=2&offset=0').then(function (response) {
        console.log(1)
        console.log(response.body.song_list)
        this.musicData = response.body.song_list
      }, function (response) {
        console.log(2)
      })
    },
    listenMusic (id) {
      this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.lry&songid=' + id).then(function (response) {
        console.log(1)
        this.musicText = response.body.lrcContent
      }, function (response) {
        console.log(2)
      })
      this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=' + id).then(function (response) {
        console.log(1)
        console.log(response.body.bitrate)
        this.musicLink = response.body.bitrate.file_link
      }, function (response) {
        console.log(2)
      })
    },
    recommendMusic (id) {
      this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.getRecommandSongList&song_id=' + id + '&num=' + this.num).then(function (response) {
        console.log(1)
        console.log(response)
      }, function (response) {
        console.log(2)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
