import Vue from 'vue'

Vue.filter('firstWord',function(value){
	return value.substr(0, 1)
})

/*Vue.directive('focus',{
	inserted:function(el){
		el.focus()
	}
})*/



