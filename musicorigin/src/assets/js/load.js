// loading
// 没用到******
class ScrollSlice {
	constructor(defaultopt) {
		var defaultopt = {
			start: 0,
			end: 20,
			step: 10,
			current: 0
		}
		this.opt = this.extend(defaultopt, opt ? opt : {});
	}

	init() {
		var _this = this;
	}

	el(element) {
		return document.querySelector(element)
	}

	extend(o, n) {
		for(var p in n) {
			if(n.hasOwnProperty(p) && (o.hasOwnProperty(p))) {
				o[p] = n[p]
			}
		}
		return o
	}


}







