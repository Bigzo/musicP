import Vue from 'vue'

Vue.filter('firstWord',function(value){
	return value.substr(0, 1)
})
Vue.filter('timeWord',function(value){
	var x = Math.floor(value / 60)
	var w = value - ( x * 60)
	var nword
	if(value === '0:00' || value === 0) {
		nword = '0:00'
	}else{
		if(w < 10) {
			nword = x + ':0' +w
		}else {
			nword = x + ':' + w
		}
	}
	return nword
})

// Vue.directive('scrollTop',{
// 	update:function(el, binding){
// 		console.log(binding.value + "xx")
// 		el.scrollTop = binding.value
// 	}
// })



