'use strict'
var btn = document.getElementById('scrollTop');

window.onscroll = function(){
	
	if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ){
		btn.style.display = "block";
	}else{
		btn.style.display = "none";
	}
}

var Top = function(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}