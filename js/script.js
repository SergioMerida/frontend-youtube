$(document).ready(function() {
	$('.dropdown-toggle').dropdown()
});

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		width: '682',
		height: '383',
		videoId: 'l-gQLqv9f4o',
		playerVars: {
			'controls' : 0,
			'modestbranding' : 1,
			'rel' : 0,
			'showinfo' : 0
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
var ready = false;
function onPlayerReady(event) {
	ready = true;

	$('.button-play').click(function() {

		var pst = player.getPlayerState();
		if(pst == 0 || pst == 2 || pst == 5) {
			player.playVideo();

		} else if (pst == 1) {
			player.pauseVideo();
		}

	});

	$('.button-volume').click(function() {
		if(player.isMuted()) {
			player.unMute();
			$('.glyphicon-volume-down').hide();
			$('.glyphicon-volume-up').show();
		} else {
			player.mute();
			$('.glyphicon-volume-up').hide();
			$('.glyphicon-volume-down').show();
		}

	});

	var query = document.querySelector.bind(document);

// Once the user clicks a custom fullscreen button
	query('#fullsize').addEventListener('click', function(){
// Play video and go fullscreen
		player.playVideo();

		var playerElement = query("#player");
		var requestFullScreen = playerElement.requestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen;
		if (requestFullScreen) {
			requestFullScreen.bind(playerElement)();
		}
	});

	$('#slider').on("slide", function(event, ui) {
		player.pauseVideo();
	});
	$('#slider').on("slidestop", function(event, ui) {
		var timeVideo = player.getDuration();
		var seekTo = (ui.value*timeVideo)/100;
		player.seekTo(seekTo, true);
		player.playVideo();
	});

}
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		$('.glyphicon-play').hide();
		$('.glyphicon-pause').show();

		var timeVideo = player.getDuration();
		mytimer = setInterval(function() {

			timeElapsed = player.getCurrentTime();
			currentTime = ( timeElapsed / timeVideo ) * 100;
			if(currentTime > 100) {
				$('#slider').slider('value', 0);
			} else {
				$('#slider').slider('value', currentTime);
			}

		}, 100);



	} else {
		clearTimeout(mytimer);
		$('.glyphicon-pause').hide();
		$('.glyphicon-play').show();
	}
}
function stopVideo() {
	player.stopVideo();
}
function playVideo() {
	if(ready) player.playVideo();
	else setTimeout(function(){ playVideo() },1000);
};
