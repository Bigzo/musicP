(function() {
	window.onresize = function() {
		var browserWidth = document.body.clientWidth;
		if(browserWidth < 415) {
			document.getElementById('mhead').style.width = browserWidth + 200 + 'px'
			document.getElementById('mlist').style.width = browserWidth + 200 + 'px'
			document.getElementById('mfoot').style.width = browserWidth + 200 + 'px'
			document.getElementById('mcenter').style.width = browserWidth + 'px'
			alert(browserWidth)
		}
	}
})();