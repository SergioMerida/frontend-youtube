$(document).ready(function() {
	$('.dropdown-toggle').dropdown()
});

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player('player', {
		height: '315',
		width: '560',
		videoId: 'M62YNijuBb8',
	});
	document.getElementById('resume').onclick = function() {
		player.playVideo();
	};
	document.getElementById('pause').onclick = function() {
		player.pauseVideo();
	};
}