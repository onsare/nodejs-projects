'use strict'
var btn = document.getElementById('scrollTop');

window.onscroll = function(){
	
	if(window.scrollY > 20 ){
		btn.style.display = "block";
	}else{
		btn.style.display = "none";
	}
}

var scrollTop = function(){
	window.scrollY = 0;
}